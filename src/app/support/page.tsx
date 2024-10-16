import React from "react";
import { Mail } from "lucide-react";
import ContactForm from "@/components/forms/contact";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const CustomerSupportPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        How can we help you with token creation?
      </h1>
      {/* 
      <div className="mb-8">
        <input
          type="text"
          placeholder="Type keywords to find answers"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Token Creation</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                How to create a token
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Token pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Supported networks
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Token standards
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Management</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Create an account
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reset password
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Manage tokens
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Billing and invoices
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Technical Support</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                API documentation
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Troubleshooting
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Network status
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Integration guides
              </a>
            </li>
          </ul>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Points of contact
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="mr-4 text-gray-400" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <a
                    href="mailto:support@createmytoken.io"
                    className="hover:underline"
                  >
                    support@createmytoken.io
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <ChatBubbleLeftRightIcon className="mr-4 text-gray-400 h-6 w-6" />
              <div>
                <h3 className="font-semibold">Discord</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <a
                    href="https://discord.gg/r8csKhrt"
                    className="hover:underline"
                  >
                    Join our community
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Message us directly
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportPage;
