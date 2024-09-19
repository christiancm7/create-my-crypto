import React from "react";

const perks = [
  {
    name: "Choose your chain",
    imageUrl: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 28 28"
        stroke="currentColor"
        className="-my-1 mx-auto h-24 w-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    description:
      "Select from multiple blockchain networks to deploy your token.",
  },
  {
    name: "Fill out some basic info",
    imageUrl: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 28 28"
        stroke="currentColor"
        className="-my-1 mx-auto h-24 w-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    description:
      "Provide essential details about your token, such as name, symbol, and supply.",
  },
  {
    name: "Fund your wallet",
    imageUrl: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 28 28"
        stroke="currentColor"
        className="-my-1 mx-auto h-24 w-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    description:
      "Ensure you have enough cryptocurrency in your wallet to cover deployment costs.",
  },
  {
    name: "You're almost rich",
    imageUrl: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 28 28"
        stroke="currentColor"
        className="-my-1 mx-auto h-24 w-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    description:
      "Deploy your token and take the first step towards your crypto journey!",
  },
];

export default function Perks() {
  return (
    <section aria-labelledby="perks-heading">
      <h2 id="perks-heading" className="sr-only">
        Our perks
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div className="md:flex-shrink-0">
                <div className="flow-root">{perk.imageUrl}</div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
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
