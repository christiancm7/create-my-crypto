"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Faq from "@/components/faq";

interface FormData {
  name: string;
  symbol: string;
  supply: number;
  hasTax: boolean;
  taxPercentage?: number;
  receiverWallet?: string;
}

export default function EthereumTokenCreator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();
  const hasTax = watch("hasTax");

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle token creation logic here
  };

  return (
    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Ethereum Token Creator
      </h1>
      <p className="text-center mb-8 max-w-lg mx-auto text-gray-600 dark:text-gray-300">
        Create and mint your own Ethereum Token effortlessly, no coding
        required. Set name, symbol, supply, and launch your token in minutes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Token Information
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Token Name*
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Token name is required",
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

              <div>
                <label
                  htmlFor="symbol"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Token Symbol*
                </label>
                <input
                  id="symbol"
                  type="text"
                  {...register("symbol", {
                    required: "Token symbol is required",
                  })}
                  placeholder="ETH"
                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                />
                {errors.symbol && (
                  <p className="text-red-500 text-xs italic">
                    {errors.symbol.message}
                  </p>
                )}
              </div>

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
                {errors.supply && (
                  <p className="text-red-500 text-xs italic">
                    {errors.supply.message}
                  </p>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Additional settings
                </h3>
                <div className="space-y-4">
                  <div
                    className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                    onClick={() => setValue("hasTax", !hasTax)}
                  >
                    <div
                      className="relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      style={{
                        backgroundColor: hasTax ? "#4F46E5" : "#E5E7EB",
                      }}
                    >
                      <span
                        className={`${
                          hasTax ? "translate-x-4" : "translate-x-0"
                        } pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      />
                    </div>
                    <div className="flex-grow">
                      <label
                        htmlFor="hasTax"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Enable Transaction Tax
                      </label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add a fee to each transaction of this token
                      </p>
                    </div>
                  </div>

                  {hasTax && (
                    <>
                      <div>
                        <label
                          htmlFor="taxPercentage"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Fee % (5 = 5% per transaction)
                        </label>
                        <input
                          id="taxPercentage"
                          type="number"
                          {...register("taxPercentage", {
                            required: hasTax,
                            min: 0,
                            max: 100,
                          })}
                          placeholder="5"
                          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="receiverWallet"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Receiver Wallet (wallet receiving fees)
                        </label>
                        <input
                          id="receiverWallet"
                          type="text"
                          {...register("receiverWallet", { required: hasTax })}
                          placeholder="0x..."
                          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                Create token
              </button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Total Tx Cost: 0.01 ETH + Gas
              </p>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              How to use Ethereum Token Creator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>Connect your Ethereum wallet</li>
              <li>Specify the desired name for your Token</li>
              <li>Indicate the symbol for your token</li>
              <li>Determine the Supply of your Token</li>
              <li>Choose whether to enable transaction tax</li>
              <li>
                If tax is enabled, set the fee percentage and receiver wallet
              </li>
              <li>
                Click on create, accept the transaction and wait until your
                tokens are ready
              </li>
            </ol>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Transaction Tax
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Enabling transaction tax allows you to set a fee on each
                transfer of your token. This can be useful for various
                tokenomics models, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>Generating revenue for project development</li>
                <li>Creating a deflationary token model</li>
                <li>Funding a treasury or DAO</li>
                <li>Rewarding long-term holders</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                When setting up the transaction tax, consider the following:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>
                  The fee percentage should be reasonable to encourage
                  transactions
                </li>
                <li>
                  Ensure the receiver wallet is correct and under your control
                </li>
                <li>
                  Be transparent with your community about the purpose of the
                  tax
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Faq />
    </div>
  );
}
