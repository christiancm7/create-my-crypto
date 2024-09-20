"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <a href="/" className="flex items-center justify-between mr-4">
            <Image
              priority
              src="https://flowbite.s3.amazonaws.com/logo.svg"
              alt="Flowbite Logo"
              width={32}
              height={32}
              className="mr-3"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
        </div>
        <div className=" flex items-center lg:order-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden sm:block p-2 mr-4 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            {theme === "dark" ? (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </button>
          <div className={theme === "dark" ? "dark" : ""}>
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Connect
                          </button>
                        );
                      }

                      return (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={openChainModal}
                            className="flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            {chain.hasIcon && chain.iconUrl && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 19,
                                  height: 19,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  marginRight: 4,
                                }}
                              >
                                <Image
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  width={19}
                                  height={19}
                                />
                              </div>
                            )}
                            <span className="hidden sm:inline">
                              {chain.name}
                            </span>
                          </button>

                          <button
                            onClick={openAccountModal}
                            type="button"
                            className="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            <span className="hidden sm:inline">
                              {account.displayName}
                            </span>
                            <span className="sm:hidden">
                              {account.displayName.slice(0, 4)}...
                            </span>
                            {account.displayBalance && (
                              <span className="hidden sm:inline">
                                {" "}
                                ({account.displayBalance})
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </nav>
  );
}
