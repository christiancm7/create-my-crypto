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

export default function Perks() {
  return (
    <section aria-labelledby="perks-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-32 lg:px-8">
        <h2
          id="perks-heading"
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          How it works
        </h2>
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="border-2 border-gray-200 dark:border-gray-700 relative p-2 xl:p-6  bg-white dark:bg-gray-700 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 text-white">
                <perk.Icon size={24} />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {perk.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
