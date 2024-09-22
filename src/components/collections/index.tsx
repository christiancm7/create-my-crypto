import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Token {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface Blockchain {
  name: string;
  standardToken: Token;
  logo: string;
  path: string;
}

const tokenTypes: Blockchain[] = [
  {
    name: "Solana",
    standardToken: {
      name: "SPL Token",
      price: "0.1 SOL",
      description:
        "Create Solana Program Library (SPL) tokens with ease. Includes features like metadata and associated token accounts.",
      features: ["spl-token", "metadata", "logo"],
    },
    logo: "/images/solana-logo.svg",
    path: "/solana",
  },
  {
    name: "Ethereum",
    standardToken: {
      name: "Standard ERC-20",
      price: "0.1 ETH",
      description:
        "Create standard ERC-20 tokens on Ethereum. Includes basic transfer and allowance functionalities.",
      features: ["erc-20", "transfer", "allowance"],
    },
    logo: "/images/eth-logo.svg",
    path: "/ethereum",
  },
  {
    name: "Base",
    standardToken: {
      name: "Standard ERC-20",
      price: "0.1 ETH",
      description:
        "Create tokens on Base with standard ERC-20 features, optimized for Base's L2 environment.",
      features: ["erc-20", "base-optimized"],
    },
    logo: "/images/base-logo.svg",
    path: "/base",
  },
];

interface TokenCardProps {
  token: Token;
  type: "standard" | "essential";
  isPopular: boolean;
  onCreateToken: () => void;
  blockchainName: string;
  logo?: string;
  path: string;
}

const TokenCard: React.FC<TokenCardProps> = ({
  token,
  logo,
  blockchainName,
  path,
}) => {
  return (
    <Link href={path}>
      <div className="bg-white rounded-lg p-4 flex flex-col shadow-md border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 h-[320px] cursor-pointer transition-all hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg dark:hover:shadow-blue-400/20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 relative mr-2">
              <Image
                src={logo as string}
                alt={`${blockchainName} logo`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="text-xl font-semibold">{blockchainName}</h2>
          </div>
          <div className="md:hidden lg:block text-right">
            <div className="font-bold">{token.price}</div>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2">{token.name}</h3>
        <p className="text-lg md:text-sm lg:text-lg mb-2 flex-grow">
          {token.description}
        </p>
        <div className="md:hidden lg:block flex flex-wrap gap-2 mb-4">
          {token.features.map((feature) => (
            <span
              key={feature}
              className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs font-semibold px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = path;
          }}
        >
          Create token
        </button>
      </div>
    </Link>
  );
};

const BlockchainTokens: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {tokenTypes.map((blockchain) => (
          <TokenCard
            key={blockchain.name}
            token={blockchain.standardToken}
            type="standard"
            isPopular={true}
            onCreateToken={() => {}} // Remove this prop if not needed
            logo={blockchain.logo}
            blockchainName={blockchain.name}
            path={blockchain.path}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockchainTokens;
