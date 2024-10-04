"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
  Connection,
  clusterApiUrl,
  SendTransactionError,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

interface FormData {
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  image: FileList;
  description: string;
  immutable: boolean;
  revokeMint: boolean;
  revokeFreeze: boolean;
}

const RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl("devnet");

export default function SolanaTokenCreator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [totalFee, setTotalFee] = useState(0.1);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionSignatures, setTransactionSignatures] = useState<{
    feeSignature: string;
    mintSignature: string;
  } | null>(null);
  const [mintAddress, setMintAddress] = useState<string | null>(null);

  const wallet = useWallet();
  const [connection, setConnection] = useState<Connection | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [feeRecipient, setFeeRecipient] = useState<PublicKey | null>(null);

  useEffect(() => {
    const newConnection = new Connection(RPC_ENDPOINT, "confirmed");
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    const feeWalletAddress = process.env.NEXT_PUBLIC_FEE_WALLET_ADDRESS;
    if (feeWalletAddress) {
      try {
        const pubKey = new PublicKey(feeWalletAddress);
        setFeeRecipient(pubKey);
      } catch (err) {
        console.error("Invalid fee wallet address:", err);
        setError("Invalid configuration. Please contact support.");
      }
    } else {
      setError("Missing fee wallet configuration. Please contact support.");
    }
  }, []);

  const updateTotalFee = useCallback((name: string, isChecked: boolean) => {
    setTotalFee((prevFee) => {
      const fee = 0.1;
      return isChecked ? prevFee + fee : prevFee - fee;
    });
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!wallet.connected || !wallet.publicKey) {
      setError("Please connect your wallet to create a token.");
      return;
    }

    if (!feeRecipient) {
      setError("Fee recipient not configured. Please contact support.");
      return;
    }

    if (!connection) {
      setError("RPC connection not established. Please try again later.");
      return;
    }

    setIsPending(true);
    setIsSuccess(false);
    setTransactionSignatures(null);
    setMintAddress(null);
    setError(null);

    try {
      // Check account balance
      const balance = await connection.getBalance(wallet.publicKey);
      const requiredBalance = (totalFee + 0.01) * LAMPORTS_PER_SOL; // 0.01 SOL buffer for transaction fees
      if (balance < requiredBalance) {
        setError(
          `Insufficient balance. You need at least ${(
            requiredBalance / LAMPORTS_PER_SOL
          ).toFixed(2)} SOL to create this token.`
        );
        setIsPending(false);
        return;
      }

      const feeTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: feeRecipient,
          lamports: totalFee * LAMPORTS_PER_SOL,
        })
      );

      const mintKeypair = Keypair.generate();
      const mintRent = await connection.getMinimumBalanceForRentExemption(82);

      const createMintAccountIx = SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        lamports: mintRent,
        space: 82,
        programId: TOKEN_PROGRAM_ID,
      });

      const initializeMintIx = createInitializeMintInstruction(
        mintKeypair.publicKey,
        data.decimals,
        wallet.publicKey,
        data.revokeFreeze ? null : wallet.publicKey,
        TOKEN_PROGRAM_ID
      );

      const userTokenAddress = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        wallet.publicKey
      );

      const createATAIx = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        userTokenAddress,
        wallet.publicKey,
        mintKeypair.publicKey
      );

      const mintToIx = createMintToInstruction(
        mintKeypair.publicKey,
        userTokenAddress,
        wallet.publicKey,
        data.supply
      );

      const mintTransaction = new Transaction().add(
        createMintAccountIx,
        initializeMintIx,
        createATAIx,
        mintToIx
      );

      const recentBlockhash = await connection.getLatestBlockhash();
      feeTransaction.recentBlockhash = recentBlockhash.blockhash;
      feeTransaction.feePayer = wallet.publicKey;
      mintTransaction.recentBlockhash = recentBlockhash.blockhash;
      mintTransaction.feePayer = wallet.publicKey;

      const signedFeeTransaction = await wallet.signTransaction(feeTransaction);
      const signedMintTransaction = await wallet.signTransaction(
        mintTransaction
      );

      signedMintTransaction.partialSign(mintKeypair);

      let feeSignature, mintSignature;
      try {
        feeSignature = await connection.sendRawTransaction(
          signedFeeTransaction.serialize()
        );
        mintSignature = await connection.sendRawTransaction(
          signedMintTransaction.serialize()
        );

        await connection.confirmTransaction(feeSignature);
        await connection.confirmTransaction(mintSignature);
      } catch (sendError) {
        if (sendError instanceof SendTransactionError) {
          console.error("Transaction error logs:", sendError.logs);
          setError(`Failed to send transaction. Error: ${sendError.message}`);
        } else {
          console.error("Error sending transaction:", sendError);
          setError("Failed to send transaction. Please try again later.");
        }
        setIsPending(false);
        return;
      }

      setTransactionSignatures({
        feeSignature,
        mintSignature,
      });
      setMintAddress(mintKeypair.publicKey.toString());
      setIsSuccess(true);
    } catch (error: unknown) {
      console.error("Token creation failed:", error);
      if (error instanceof Error) {
        setError(`An error occurred: ${error.message}`);
      } else {
        setError("An unknown error occurred during token creation");
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  return (
    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Solana Token Creator
      </h1>
      <p className="text-center mb-8 max-w-lg mx-auto text-gray-600 dark:text-gray-300">
        Create and mint your own SPL Token effortlessly, no coding required.
        Customize metadata, set supply, add a logo, and launch your token in
        minutes.
      </p>

      {isPending && (
        <p className="text-center text-blue-500 mb-4">Creating token...</p>
      )}
      {isSuccess && transactionSignatures && (
        <div className="text-center text-green-500 mb-4">
          <p>Token created successfully!</p>
          <p>Mint Address: {mintAddress}</p>
          <p>Fee Transaction Signature: {transactionSignatures.feeSignature}</p>
          <p>
            Mint Transaction Signature: {transactionSignatures.mintSignature}
          </p>
        </div>
      )}

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Token Information
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Token Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Token Name (Max 30)*
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Token name is required",
                    maxLength: 30,
                  })}
                  placeholder="My new token"
                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Token Symbol and Decimals */}
              <div className="grid grid-cols-2 gap-4">
                {/* Symbol */}
                <div>
                  <label
                    htmlFor="symbol"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Token Symbol (Max 10)*
                  </label>
                  <input
                    id="symbol"
                    type="text"
                    {...register("symbol", {
                      required: "Token symbol is required",
                      maxLength: 10,
                    })}
                    placeholder="SOL"
                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                  />
                  {errors.symbol && (
                    <p className="text-red-500 text-xs italic">
                      {errors.symbol.message}
                    </p>
                  )}
                </div>

                {/* Decimals */}
                <div>
                  <label
                    htmlFor="decimals"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Decimals*
                  </label>
                  <input
                    id="decimals"
                    type="number"
                    {...register("decimals", {
                      required: "Decimals are required",
                      min: 0,
                      max: 9,
                    })}
                    placeholder="9"
                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                  />
                  {errors.decimals && (
                    <p className="text-red-500 text-xs italic">
                      {errors.decimals.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Supply */}
              <div>
                <label
                  htmlFor="supply"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Supply*
                </label>
                <input
                  id="supply"
                  type="number"
                  {...register("supply", { required: "Supply is required" })}
                  placeholder="1000000000"
                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  The initial number of available tokens that will be created in
                  your wallet
                </p>
                {errors.supply && (
                  <p className="text-red-500 text-xs italic">
                    {errors.supply.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="col-span-full">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Image
                </label>
                <div className="flex items-center justify-center w-full mt-2">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Token preview"
                        width={200}
                        height={200}
                        className="object-contain h-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG up to 30MB
                        </p>
                      </div>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/png"
                    />
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Here you can briefly describe your token"
                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                  rows={3}
                ></textarea>
              </div>

              {/* Additional Settings */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Additional settings
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "immutable",
                      fee: 0.1,
                      description:
                        "Revoke Update Authority. This makes the token metadata immutable.",
                    },
                    {
                      name: "revokeMint",
                      fee: 0.1,
                      description:
                        "Revoke Mint Authority. This prevents minting more tokens, ensuring a fixed supply.",
                    },
                    {
                      name: "revokeFreeze",
                      fee: 0.1,
                      description:
                        "Revoke Freeze Authority. This removes the ability to freeze token accounts.",
                    },
                  ].map(({ name, fee, description }) => (
                    <div
                      key={name}
                      className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                      onClick={() => {
                        const currentValue = watch(name as keyof FormData);
                        setValue(name as keyof FormData, !currentValue);
                        updateTotalFee(name, !currentValue);
                      }}
                    >
                      <div
                        className="relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        style={{
                          backgroundColor: watch(name as keyof FormData)
                            ? "#4F46E5"
                            : "#E5E7EB",
                        }}
                      >
                        <span
                          className={`${
                            watch(name as keyof FormData)
                              ? "translate-x-4"
                              : "translate-x-0"
                          } pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        />
                      </div>
                      <div className="flex-grow">
                        <label
                          htmlFor={name}
                          className="font-medium text-gray-700 dark:text-gray-300"
                        >
                          {name === "immutable"
                            ? "Revoke Update (Immutable)"
                            : name.charAt(0).toUpperCase() +
                              name.slice(1).replace(/([A-Z])/g, " $1")}
                        </label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {description}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        +{fee} SOL
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Submit/Connect Button */}
              {wallet.connected ? (
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                  disabled={isPending}
                >
                  {isPending ? "Creating token..." : "Create token"}
                </button>
              ) : (
                <div className="flex justify-center items-center">
                  <WalletMultiButton className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200">
                    Connect Wallet
                  </WalletMultiButton>
                </div>
              )}
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Service fee: {totalFee.toFixed(1)} SOL
              </p>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              How to use Solana Token Creator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>Connect your Solana wallet</li>
              <li>Specify the desired name for your Token</li>
              <li>Indicate the symbol (max 8 characters)</li>
              <li>
                Select the decimals quantity (0 for Whitelist Token, 5 for
                utility Token, 9 for meme token).
              </li>
              <li>Provide a brief description for your SPL Token</li>
              <li>Upload the image for your token (PNG)</li>
              <li>Determine the Supply of your Token</li>
              <li>
                Click on create, accept the transaction and wait until your
                tokens are ready
              </li>
            </ol>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Additional Settings
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium mb-2 text-gray-600 dark:text-gray-400">
                  Revoke Update Authority (Immutable)
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Revoking update authority makes the token metadata immutable.
                  This means the token&apos;s information cannot be changed
                  after creation. The cost is 0.1 SOL.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-gray-600 dark:text-gray-400">
                  Revoke Freeze Authority
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  If you want to create a liquidity pool, you&apos;ll need to
                  &quot;Revoke Freeze Authority&quot; of the Token. The cost is
                  0.1 SOL.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-gray-600 dark:text-gray-400">
                  Revoke Mint Authority
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Revoking mint authority ensures that no more tokens can be
                  minted beyond the total supply. This provides security and
                  peace of mind to buyers. The cost is 0.1 SOL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
