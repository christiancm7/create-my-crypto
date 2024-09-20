"use client";

export default function SettingsScreen() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Solana Section */}
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Solana Settings
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Configure your Solana network settings.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="solana-network"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Network
                </label>
                <div className="mt-2">
                  <select
                    id="solana-network"
                    name="solana-network"
                    className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:focus:ring-indigo-500"
                  >
                    <option>Mainnet</option>
                    <option>Testnet</option>
                    <option>Devnet</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="solana-rpc"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  RPC URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="solana-rpc"
                    id="solana-rpc"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                    placeholder="Enter Solana RPC URL"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Save Solana Settings
              </button>
            </div>
          </form>
        </div>

        {/* Base Section */}
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Base Settings
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Configure your Base network settings.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="base-network"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Network
                </label>
                <div className="mt-2">
                  <select
                    id="base-network"
                    name="base-network"
                    className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:focus:ring-indigo-500"
                  >
                    <option>Mainnet</option>
                    <option>Testnet</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="base-rpc"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  RPC URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="base-rpc"
                    id="base-rpc"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                    placeholder="Enter Base RPC URL"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Save Base Settings
              </button>
            </div>
          </form>
        </div>

        {/* Ethereum Section */}
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Ethereum Settings
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Configure your Ethereum network settings.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="ethereum-network"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Network
                </label>
                <div className="mt-2">
                  <select
                    id="ethereum-network"
                    name="ethereum-network"
                    className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:focus:ring-indigo-500"
                  >
                    <option>Mainnet</option>
                    <option>Goerli</option>
                    <option>Sepolia</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="ethereum-rpc"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  RPC URL
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ethereum-rpc"
                    id="ethereum-rpc"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                    placeholder="Enter Ethereum RPC URL"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Save Ethereum Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
