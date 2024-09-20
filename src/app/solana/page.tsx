"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

export default function SolanaTokenCreator() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
    // Handle token creation logic here
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 mt-4 md:mt-0 sm:px-6 lg:px-8 min-h-screen">
      <div className="py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Solana Token Creator
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Token Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                  placeholder="Enter token name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.name?.message || "")}
                </p>
              )}
            </div>

            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="symbol"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Symbol
              </label>
              <div className="mt-2">
                <input
                  id="symbol"
                  type="text"
                  {...register("symbol", {
                    required: "Symbol is required",
                    maxLength: { value: 8, message: "Max 8 characters" },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                  placeholder="Enter symbol"
                />
              </div>
              {errors.symbol && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.symbol.message)}
                </p>
              )}
            </div>

            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="decimals"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Decimals
              </label>
              <div className="mt-2">
                <input
                  id="decimals"
                  type="number"
                  {...register("decimals", {
                    required: "Decimals are required",
                    min: { value: 0, message: "Minimum value is 0" },
                    max: { value: 9, message: "Maximum value is 9" },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                  placeholder="Enter decimals (0-9)"
                />
              </div>
              {errors.decimals && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.decimals.message)}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="supply"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Supply
              </label>
              <div className="mt-2">
                <input
                  id="supply"
                  type="number"
                  {...register("supply", { required: "Supply is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                  placeholder="Enter supply"
                />
              </div>
              {errors.supply && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.supply.message)}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description")}
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                  placeholder="Enter token description"
                ></textarea>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
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
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
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
                    {...register("image")}
                    onChange={handleImageChange}
                    accept="image/png"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
              Token Authorities
            </h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="revokeFreeze"
                    type="checkbox"
                    {...register("revokeFreeze")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="revokeFreeze"
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Revoke Freeze (0.1 SOL)
                  </label>
                </div>
              </li>
              <li className="w-full dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="revokeMint"
                    type="checkbox"
                    {...register("revokeMint")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="revokeMint"
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Revoke Mint (0.1 SOL)
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center w-full items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
          >
            Create Token
          </button>
        </form>

        <div className="space-y-8">
          <div className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              How to use Solana Token Creator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>Connect your Solana wallet</li>
              <li>Specify the desired name for your Token</li>
              <li>Indicate the symbol (max 8 characters)</li>
              <li>
                Select the decimals quantity:
                <ul className="list-disc list-inside ml-5 mt-1">
                  <li>0 for Whitelist Token</li>
                  <li>5 for utility Token</li>
                  <li>9 for meme token</li>
                </ul>
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

          <div className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Token Authorities
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
                  Revoke Freeze Authority
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  If you want to create a liquidity pool, you&apos;ll need to
                  &ldquo;`Revoke Freeze Authority&rdquo; of the Token. The cost
                  is 0.1 SOL.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
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

          <div className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Token Creation Details
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                The cost of Token creation is 0.5 SOL, covering all fees for SPL
                Token Creation.
              </p>
              <p>
                Once the creation process starts, it will only take a few
                seconds! Upon completion, you will receive the total supply of
                the token in your wallet.
              </p>
              <p>
                With our user-friendly platform, managing your tokens is simple
                and affordable. Using your wallet, you can easily create tokens,
                increase their supply, or freeze them as needed. Discover the
                ease of Solana Token creation with us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
