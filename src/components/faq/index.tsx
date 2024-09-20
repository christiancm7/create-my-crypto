import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What is a token creator?",
    answer:
      "A token creator is a tool that allows you to create your own cryptocurrency tokens on a blockchain network, such as Ethereum or Base, without needing to write complex smart contract code yourself.",
  },
  {
    question: "How much does it cost to create a token?",
    answer:
      "The token creation currently costs 0.01 ETH, which covers all fees necessary for Token Creation on the chosen network (Ethereum or Base mainnet).",
  },
  {
    question: "How long does the token creation process take?",
    answer:
      "Once you initiate the creation process, it typically takes only a few moments to complete. After creation, the total supply of your new token will be sent directly to your connected wallet.",
  },
  {
    question: "What information do I need to create a token?",
    answer:
      "To create a token, you'll need to provide a token name, symbol (up to 8 characters), total supply, and optionally, a tax percentage.",
  },
  {
    question: "Can I create tokens on different networks?",
    answer:
      "Yes, our platform supports token creation on both Ethereum and Base networks. You can choose the network that best suits your needs.",
  },
  {
    question:
      "What's the difference between Ethereum and Base for token creation?",
    answer:
      "Ethereum is the original and most widely used network for token creation, while Base is a newer, more scalable network. Base typically offers lower transaction fees and faster confirmation times.",
  },
  {
    question: "Do I need technical knowledge to create a token?",
    answer:
      "No, our user-friendly platform is designed for both beginners and experienced users. You don't need any coding knowledge to create your token.",
  },
  {
    question: "What can I do with my created token?",
    answer:
      "Once created, you can use your token for various purposes such as creating a community currency, representing assets, or as part of a larger blockchain project.",
  },
  {
    question: "Is there a limit to how many tokens I can create?",
    answer:
      "There's no limit to the number of tokens you can create. However, each token creation requires a separate transaction and fee.",
  },
  {
    question: "How secure is the token creation process?",
    answer:
      "Our token creation process uses standard, audited smart contract templates to ensure security. However, always exercise caution and do your own research when dealing with cryptocurrencies.",
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
