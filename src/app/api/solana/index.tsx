import { NextApiRequest, NextApiResponse } from "next";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  createSetAuthorityInstruction,
  AuthorityType,
} from "@solana/spl-token";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import * as bs58 from "bs58";
import rateLimit from "express-rate-limit";
import nacl from "tweetnacl";

const SOLANA_RPC_URL =
  process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
const SERVICE_FEE_WALLET = new PublicKey(process.env.SERVICE_FEE_WALLET!);
const SERVICE_FEE = 0.1 * LAMPORTS_PER_SOL; // 0.1 SOL in lamports

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

interface TokenCreationRequest {
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  uri?: string;
  immutable: boolean;
  revokeMint: boolean;
  revokeFreeze: boolean;
  walletPublicKey: string;
  signature: string;
}

function validateInput(body): TokenCreationRequest {
  if (!body.name || typeof body.name !== "string" || body.name.length > 32)
    throw new Error("Invalid name");
  if (
    !body.symbol ||
    typeof body.symbol !== "string" ||
    body.symbol.length > 10
  )
    throw new Error("Invalid symbol");
  if (
    !body.decimals ||
    typeof body.decimals !== "number" ||
    body.decimals < 0 ||
    body.decimals > 9
  )
    throw new Error("Invalid decimals");
  if (!body.supply || typeof body.supply !== "number" || body.supply <= 0)
    throw new Error("Invalid supply");
  if (!body.walletPublicKey || typeof body.walletPublicKey !== "string")
    throw new Error("Invalid wallet public key");
  if (!body.signature || typeof body.signature !== "string")
    throw new Error("Invalid signature");
  if (body.uri && typeof body.uri !== "string") throw new Error("Invalid URI");
  if (typeof body.immutable !== "boolean")
    throw new Error("Invalid immutable flag");
  if (typeof body.revokeMint !== "boolean")
    throw new Error("Invalid revokeMint flag");
  if (typeof body.revokeFreeze !== "boolean")
    throw new Error("Invalid revokeFreeze flag");

  return body as TokenCreationRequest;
}

async function verifySignature(
  message: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  return nacl.sign.detached.verify(
    new TextEncoder().encode(message),
    bs58.decode(signature),
    bs58.decode(publicKey)
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await limiter(req, res);

  try {
    const validatedInput = validateInput(req.body);
    const {
      name,
      symbol,
      decimals,
      supply,
      uri,
      immutable,
      revokeMint,
      revokeFreeze,
      walletPublicKey,
      signature,
    } = validatedInput;

    // Verify the signature
    const message = `Create token: ${name} (${symbol}) with 0.1 SOL fee`;
    const isValidSignature = await verifySignature(
      message,
      signature,
      walletPublicKey
    );
    if (!isValidSignature) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const connection = new Connection(SOLANA_RPC_URL, "confirmed");
    const userPublicKey = new PublicKey(walletPublicKey);

    // Create a new transaction
    const transaction = new Transaction();

    // Add instruction to transfer 0.1 SOL to the service fee wallet
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: userPublicKey,
        toPubkey: SERVICE_FEE_WALLET,
        lamports: SERVICE_FEE,
      })
    );

    // Create the token mint
    const mint = await createMint(
      connection,
      { publicKey: userPublicKey, secretKey: new Uint8Array(0) },
      userPublicKey,
      userPublicKey,
      decimals
    );

    // Get or create associated token account
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      { publicKey: userPublicKey, secretKey: new Uint8Array(0) },
      mint,
      userPublicKey
    );

    // Add instruction to mint tokens
    transaction.add(
      mintTo(mint, fromTokenAccount.address, userPublicKey, supply)
    );

    // Handle additional settings
    if (immutable) {
      transaction.add(
        createSetAuthorityInstruction(
          mint,
          userPublicKey,
          AuthorityType.MintTokens,
          null
        )
      );
    }

    if (revokeMint) {
      transaction.add(
        createSetAuthorityInstruction(
          mint,
          userPublicKey,
          AuthorityType.MintTokens,
          null
        )
      );
    }

    if (revokeFreeze) {
      transaction.add(
        createSetAuthorityInstruction(
          mint,
          userPublicKey,
          AuthorityType.FreezeAccount,
          null
        )
      );
    }

    // Create metadata
    const metadataAccount = await Metadata.getPDA(mint);
    const metadataInstruction = await Metadata.createInstruction(
      {
        metadata: metadataAccount,
        mint,
        mintAuthority: userPublicKey,
        payer: userPublicKey,
        updateAuthority: userPublicKey,
      },
      {
        createMetadataAccountArgsV2: {
          data: {
            name,
            symbol,
            uri: uri || "",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: true,
        },
      }
    );

    transaction.add(metadataInstruction);

    // Serialize the transaction
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    return res.status(200).json({
      success: true,
      tokenAddress: mint.toBase58(),
      tokenAccount: fromTokenAccount.address.toBase58(),
      metadataAccount: metadataAccount.toBase58(),
      transaction: bs58.encode(serializedTransaction),
      fee: SERVICE_FEE / LAMPORTS_PER_SOL,
    });
  } catch (error) {
    console.error("Error creating token:", error);
    return res
      .status(500)
      .json({ error: "Error creating token", details: error.message });
  }
}
