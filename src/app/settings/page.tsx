"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = ["Solana", "Ethereum", "Base"];

export default function SettingsScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {theme === "dark" ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-white"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white"
            >
              <h2 className="text-2xl font-bold mb-4">{tab} Settings</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor={`${tab.toLowerCase()}-network`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Network
                  </label>
                  <select
                    id={`${tab.toLowerCase()}-network`}
                    name="network"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option>Mainnet</option>
                    <option>Testnet</option>
                    <option>Devnet</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor={`${tab.toLowerCase()}-rpc`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    RPC URL
                  </label>
                  <input
                    type="text"
                    name="rpc"
                    id={`${tab.toLowerCase()}-rpc`}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter RPC URL"
                  />
                </div>
                {/* Add more blockchain-specific settings here */}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
