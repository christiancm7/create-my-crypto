import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What is cryptocurrency?",
    answer:
      "Cryptocurrency is a digital or virtual currency that uses cryptography for security. It operates independently of a central bank and can be transferred directly between individuals without intermediaries.",
  },
  {
    question: "How do cryptocurrencies work?",
    answer:
      "Cryptocurrencies work using a technology called blockchain. This is a decentralized technology spread across many computers that manages and records transactions. Part of the appeal of this technology is its security.",
  },
  {
    question: "What is Bitcoin?",
    answer:
      "Bitcoin is the first and most well-known cryptocurrency. It was created in 2009 by an unknown person using the alias Satoshi Nakamoto. Like other cryptocurrencies, Bitcoin allows for secure peer-to-peer transactions on the internet.",
  },
  {
    question: "What is blockchain technology?",
    answer:
      "Blockchain is a distributed ledger technology that allows data to be stored globally on thousands of servers. It's the underlying technology that enables cryptocurrencies to function in a decentralized manner.",
  },
  {
    question: "How do I buy cryptocurrency?",
    answer:
      "You can buy cryptocurrencies through crypto exchanges, some traditional brokers, and even payment services like PayPal. You'll need to set up and fund an account, place an order, and securely store your purchased cryptocurrency.",
  },
  {
    question: "What is a crypto wallet?",
    answer:
      "A crypto wallet is a software program or physical device that stores your private and public keys and interacts with various blockchain to enable users to send and receive digital currency and monitor their balance.",
  },
  {
    question: "Are cryptocurrencies legal?",
    answer:
      "The legality of cryptocurrencies varies by country. Some have embraced them, while others have imposed restrictions or bans. It's important to check the regulations in your jurisdiction before engaging with cryptocurrencies.",
  },
  {
    question: "What are the risks of investing in cryptocurrencies?",
    answer:
      "Cryptocurrencies are known for their volatility, which can lead to significant gains or losses. Other risks include regulatory changes, security vulnerabilities, and the potential for scams or fraud in the crypto space.",
  },
  {
    question: "What is mining in cryptocurrency?",
    answer:
      "Mining is the process by which new coins are created and transactions are added to the blockchain. Miners use powerful computers to solve complex mathematical problems, and are rewarded with new coins for their efforts.",
  },
  {
    question: "What is a smart contract?",
    answer:
      "A smart contract is a self-executing contract with the terms of the agreement directly written into code. They automatically execute actions when predetermined conditions are met, without the need for intermediaries.",
  },
];

export default function Faq() {
  return (
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
  );
}
