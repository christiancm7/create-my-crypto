import React from "react";
import { Zap, FileText, Wallet, Rocket } from "lucide-react";

const perks = [
  {
    name: "Choose your chain",
    Icon: Zap,
    description:
      "Select from multiple blockchain networks to deploy your token.",
  },
  {
    name: "Fill out some basic info",
    Icon: FileText,
    description:
      "Provide essential details about your token, such as name, symbol, and supply.",
  },
  {
    name: "Fund your wallet",
    Icon: Wallet,
    description:
      "Ensure you have enough cryptocurrency in your wallet to cover deployment costs.",
  },
  {
    name: "You're almost rich",
    Icon: Rocket,
    description:
      "Deploy your token and take the first step towards your crypto journey!",
  },
];

export default function Steps() {
  return (
    <div>
      <h2 className="sr-only">How it works</h2>
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          How it works
        </h2>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 px-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {perks.map((perk) => (
            <div key={perk.name} className="sm:flex">
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 text-white">
                    <perk.Icon size={24} />
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:ml-3 sm:mt-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {perk.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
