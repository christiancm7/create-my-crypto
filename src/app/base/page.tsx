"use client";

import { useForm } from "react-hook-form";
import Faq from "@/components/faq";

export default function BaseTokenCreator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
    // Handle token creation logic here
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Base Token Creator
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
                htmlFor="tax"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Tax
              </label>
              <div className="mt-2">
                <input
                  id="tax"
                  type="number"
                  {...register("tax")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                  placeholder="Enter tax percentage"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-full md:w-auto inline-flex justify-center items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
          >
            Create Token
          </button>
        </form>

        <div className="space-y-8">
          <div className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              How to use Base Token Creator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>Connect your Base wallet</li>
              <li>Write the name you want for your Token</li>
              <li>Indicate the symbol</li>
              <li>Put the Supply of your Token</li>
              <li>
                Click on create, accept the transaction and wait until your
                token is ready
              </li>
            </ol>
          </div>

          <div className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Token Creation Details
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                The token creation currently costs 0.01 ETH, covering all fees
                necessary for Token Creation on the Base mainnet.
              </p>
              <p>
                Once you initiate the creation process, it only takes a few
                moments to complete. After creation, the total supply of your
                new token will be sent directly to your wallet.
              </p>
              <p>
                Our user-friendly platform makes token management simple and
                cost-effective. Using your connected wallet, you can easily
                create tokens, manage their supply, and set token parameters as
                needed. Experience the simplicity of Base Token creation with
                us!
              </p>
            </div>
          </div>
        </div>

        {/* FAQ section - now full width */}
      </div>
      <div className="mt-12 border-gray-200 dark:border-gray-700 pt-8">
        <Faq />
      </div>
    </div>
  );
}
