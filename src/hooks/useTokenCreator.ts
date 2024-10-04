import { useMutation } from "@tanstack/react-query";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  AuthorityType,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

interface TokenInfo {
  tokenName: string;
  symbol: string;
  amount: number;
  decimals: number;
  metadata: string;
}

interface MetadataInfo {
  name: string;
  symbol: string;
  description: string;
  extensions?: { website: string; twitter?: string; telegram?: string };
}

export const useSolanaTokenCreator = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const createToken = async (
    tokenInfo: TokenInfo,
    metaDataforToken: MetadataInfo,
    revokeMintBool: boolean,
    revokeFreezeBool: boolean
  ) => {
    if (!wallet.publicKey) {
      throw new Error("Wallet not connected");
    }

    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();

    const tokenATA = await getAssociatedTokenAddress(
      mintKeypair.publicKey,
      wallet.publicKey
    );

    const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
      {
        metadata: PublicKey.findProgramAddressSync(
          [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
          ],
          PROGRAM_ID
        )[0],
        mint: mintKeypair.publicKey,
        mintAuthority: wallet.publicKey,
        payer: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: tokenInfo.tokenName,
            symbol: tokenInfo.symbol,
            uri: tokenInfo.metadata,
            creators: [
              {
                address: new PublicKey(wallet.publicKey),
                share: 100,
                verified: true,
              },
            ],
            sellerFeeBasisPoints: 0,
            uses: null,
            collection: null,
          },
          isMutable: true,
          collectionDetails: null,
        },
      }
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports: lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        tokenInfo.decimals,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_PROGRAM_ID
      ),
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        tokenATA,
        wallet.publicKey,
        mintKeypair.publicKey
      ),
      createMintToInstruction(
        mintKeypair.publicKey,
        tokenATA,
        wallet.publicKey,
        tokenInfo.amount * Math.pow(10, tokenInfo.decimals)
      ),
      createMetadataInstruction
    );

    if (revokeMintBool) {
      const revokeMint = createSetAuthorityInstruction(
        mintKeypair.publicKey,
        wallet.publicKey,
        AuthorityType.MintTokens,
        null
      );
      transaction.add(revokeMint);
    }

    if (revokeFreezeBool) {
      const revokeFreeze = createSetAuthorityInstruction(
        mintKeypair.publicKey,
        wallet.publicKey,
        AuthorityType.FreezeAccount,
        null
      );
      transaction.add(revokeFreeze);
    }

    const { blockhash } = await connection.getLatestBlockhash("finalized");
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    // Sign the transaction with the mint account
    transaction.partialSign(mintKeypair);

    return { transaction, mintKeypair };
  };

  const mutation = useMutation<
    { mintAddress: string; signature: string },
    Error,
    {
      tokenInfo: TokenInfo;
      metaDataforToken: MetadataInfo;
      revokeMintBool: boolean;
      revokeFreezeBool: boolean;
    }
  >({
    mutationFn: async (params) => {
      const { transaction, mintKeypair } = await createToken(
        params.tokenInfo,
        params.metaDataforToken,
        params.revokeMintBool,
        params.revokeFreezeBool
      );

      if (!wallet.signTransaction) {
        throw new Error("Wallet does not support signing");
      }

      const signedTransaction = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(signature, "confirmed");

      return {
        mintAddress: mintKeypair.publicKey.toString(),
        signature,
      };
    },
    onError: (error) => {
      console.error("Token creation failed:", error);
    },
    onSuccess: (data) => {
      console.log("Token created successfully:", data);
    },
  });

  return mutation;
};
