"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CogIcon, LifebuoyIcon } from "@heroicons/react/24/outline";
import { Home } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  // Utility function to check if the link is active
  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-52 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/"
              className={`flex items-center p-2 rounded-lg group ${
                isActive("/")
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Home
                className={`w-5 h-5 transition duration-75 ${
                  isActive("/")
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                }`}
              />
              <span className="ml-3">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/solana"
              className={`flex items-center p-2 rounded-lg group ${
                isActive("/solana")
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                viewBox="0 0 397.7 311.7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <linearGradient
                  id="a"
                  gradientUnits="userSpaceOnUse"
                  x1="360.879"
                  y1="-37.455"
                  x2="141.213"
                  y2="383.294"
                  gradientTransform="matrix(1 0 0 -1 0 314)"
                >
                  <stop offset="0" stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <path
                  fill="url(#a)"
                  d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
                />
                <linearGradient
                  id="b"
                  gradientUnits="userSpaceOnUse"
                  x1="264.829"
                  y1="-87.601"
                  x2="45.163"
                  y2="333.147"
                  gradientTransform="matrix(1 0 0 -1 0 314)"
                >
                  <stop offset="0" stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <path
                  fill="url(#b)"
                  d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
                />
                <linearGradient
                  id="c"
                  gradientUnits="userSpaceOnUse"
                  x1="312.548"
                  y1="-62.688"
                  x2="92.882"
                  y2="358.061"
                  gradientTransform="matrix(1 0 0 -1 0 314)"
                >
                  <stop offset="0" stopColor="#00FFA3" />
                  <stop offset="1" stopColor="#DC1FFF" />
                </linearGradient>
                <path
                  fill="url(#c)"
                  d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
                />
              </svg>
              <span className="ml-3">Solana</span>
            </Link>
          </li>
          <li>
            <Link
              href="/base"
              className={`flex items-center p-2 rounded-lg group ${
                isActive("/base")
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                width="111"
                height="111"
                viewBox="0 0 111 111"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.6319 85.359 0 54.921 0C26.0432 0 2.35281 22.1714 0 50.3923H72.8467V59.6416H3.9565e-07C2.35281 87.8625 26.0432 110.034 54.921 110.034Z"
                  fill="#0052FF"
                />
              </svg>
              <span className="ml-3">Base</span>
            </Link>
          </li>
          <li>
            <Link
              href="/ethereum"
              className={`flex items-center p-2 rounded-lg group ${
                isActive("/ethereum")
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 784.37 1277.39"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <polygon
                    fill="#343434"
                    fillRule="nonzero"
                    points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                  />
                  <polygon
                    fill="#3C3C3B"
                    fillRule="nonzero"
                    points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,1277.38 392.07,956.52 -0,724.89 "
                  />
                  <polygon
                    fill="#141414"
                    fillRule="nonzero"
                    points="392.07,882.29 784.13,650.54 392.07,472.33 "
                  />
                  <polygon
                    fill="#393939"
                    fillRule="nonzero"
                    points="0,650.54 392.07,882.29 392.07,472.33 "
                  />
                </g>
              </svg>
              <span className="ml-3">Ethereum</span>
            </Link>
          </li>
        </ul>

        <ul className="space-y-2 font-medium pt-4 border-t border-gray-200 dark:border-gray-700">
          <li>
            <Link
              href="/settings"
              className={`flex items-center p-2 rounded-lg group ${
                isActive("/settings")
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <CogIcon className="w-5 h-5 transition duration-75 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Settings</span>
            </Link>
          </li>
          <li>
            <Link
              href="/support"
              className={`flex items-center p-2 rounded-lg group ${
                isActive("/support")
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <LifebuoyIcon className="w-5 h-5 transition duration-75 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Support</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
