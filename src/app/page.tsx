"use client";
import Perks from "../components/perks";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        {/* Hero section */}
        <div className="relative">
          {/* Background image and overlap */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden sm:flex sm:flex-col"
          >
            <div className="h-32 w-full md:h-40 lg:h-48" />
          </div>

          <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
            {/* Background image and overlap */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col sm:hidden"
            >
              <div className="h-48 w-full " />
            </div>
            <div className="relative pb-10 pt-4">
              <h1 className="text-2xl sm:text-6xl md:text-5xl font-extrabold bg-clip-text text-gray-900 dark:text-white">
                Choose your blockchain
              </h1>
              <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300">
                Then create your coin
              </p>
            </div>
          </div>

          <section
            aria-labelledby="collection-heading"
            className="relative -mt-96 sm:mt-0"
          >
            <h2 id="collection-heading" className="sr-only">
              Collections
            </h2>
            <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
              {collections.map((collection) => (
                <div
                  key={collection.name}
                  className="group relative flex flex-col justify-between items-center sm:h-auto rounded-lg border-2 border-blue-300 shadow-xl hover:border-blue-500 transition-colors duration-300 p-6"
                >
                  <h3 className="font-semibold text-xl mb-2 text-center">
                    <a
                      href={collection.href}
                      className="text-black dark:text-white hover:underline"
                    >
                      <span className="absolute inset-0" />
                      {collection.name}
                    </a>
                  </h3>
                  <div className="flex-grow flex items-center justify-center">
                    <Image
                      alt={collection.imageAlt}
                      src={collection.imageSrc}
                      width={collection.name === "Ethereum" ? 80 : 120}
                      height={collection.name === "Ethereum" ? 80 : 120}
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Perks />

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 py-4">
              <div className="mx-auto max-w-4xl divide-y divide-gray-200 dark:divide-gray-700">
                <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">
                  Frequently asked questions
                </h2>
                <dl className="mt-10 space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
                  {faqs.map((faq) => (
                    <Disclosure as="div" key={faq.question} className="pt-6">
                      {({ open }) => (
                        <>
                          <dt>
                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                              <span className="text-base font-semibold leading-7">
                                {faq.question}
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                {open ? (
                                  <MinusSmallIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmallIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </dt>
                          <Disclosure.Panel as="dd" className="mt-2 pr-12">
                            <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                              {faq.answer}
                            </p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const collections = [
  {
    name: "Solana",
    href: "/solana",
    imageSrc: "/images/solana-logo.svg", // Updated path
    imageAlt: "Solana logo",
  },
  {
    name: "Base",
    href: "/base",
    imageSrc: "/images/base-logo.svg", // Updated path
    imageAlt: "Base logo",
  },
  {
    name: "Ethereum",
    href: "/ethereum",
    imageSrc: "/images/eth-logo.svg", // Updated path
    imageAlt: "Ethereum logo",
  },
];

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];
