import Link from "next/link";
import { HomeIcon, CogIcon } from "@heroicons/react/24/outline";

export function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HomeIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/solana"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 397.7 311.7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
                  fill="#00FFA3"
                />
                <path
                  d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
                  fill="#00FFA3"
                />
                <path
                  d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
                  fill="#00FFA3"
                />
              </svg>
              <span className="ml-3">Solana</span>
            </Link>
          </li>
          <li>
            <Link
              href="/base"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="1024" height="1024" fill="#0052FF" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M512 161C315.25 161 161 315.25 161 512C161 708.75 315.25 863 512 863C708.75 863 863 708.75 863 512C863 315.25 708.75 161 512 161ZM512 758C375.75 758 266 648.25 266 512C266 375.75 375.75 266 512 266C648.25 266 758 375.75 758 512C758 648.25 648.25 758 512 758Z"
                  fill="white"
                />
              </svg>
              <span className="ml-3">Base</span>
            </Link>
          </li>
          <li>
            <Link
              href="/ethereum"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <CogIcon className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
