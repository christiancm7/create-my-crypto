import Image from "next/image";

export const collections = [
  {
    name: "Solana",
    href: "/solana",
    imageSrc: "/images/solana-logo.svg",
    imageAlt: "Solana logo",
  },
  {
    name: "Base",
    href: "/base",
    imageSrc: "/images/base-logo.svg",
    imageAlt: "Base logo",
  },
  {
    name: "Ethereum",
    href: "/ethereum",
    imageSrc: "/images/eth-logo.svg",
    imageAlt: "Ethereum logo",
  },
];

export default function Collections() {
  return (
    <section
      aria-labelledby="collection-heading"
      className="relative -mt-96 sm:mt-0"
    >
      <h2 id="collection-heading" className="sr-only">
        Collections
      </h2>
      <div className="pt-4 mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-5xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
        {collections.map((collection) => (
          <div
            key={collection.name}
            className="group relative flex flex-col justify-between items-center sm:h-auto rounded-lg border-2 border-blue-300 shadow-xl hover:border-blue-500 transition-colors duration-300 p-6 max-w-xs mx-auto w-full"
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
  );
}
