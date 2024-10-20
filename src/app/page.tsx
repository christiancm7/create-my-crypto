/* eslint-disable @next/next/next-script-for-ga */
"use client";
import Faq from "../components/faq";
import Collections from "../components/collections";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="description"
          content="Create your own crypto currency on Solana"
        />
        <title>Create My Crypto</title>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16523832540"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <main>
        <section className=" bg-white dark:bg-gray-900">
          <div className="mt-6 sm:mt-0 h-3/5 md:h-auto grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="px-1  max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                Create your crypto token with no code
              </h1>
              <p className="p-4 text-lg max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                From concept to launch, creators and entrepreneurs worldwide use
                our platform to effortlessly create and deploy custom crypto
                tokens without any coding knowledge.
              </p>
              <a
                href="#"
                className="hidden sm:inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 text-gray-800 dark:text-white dark:focus:ring-primary-900"
              >
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="/solana"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Create Solana Token
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <Image
                src="/images/solana-hero.png"
                alt="mockup"
                width={500}
                height={300}
              />
            </div>
          </div>
        </section>
        <div className="relative">
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 sm:pb-0 lg:px-8">
            <div className="relative pb-2">
              <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300">
                Pick a template
              </p>
            </div>
          </div>

          <Collections />
          {/* <Steps /> */}
          <Faq />
        </div>
      </main>
    </div>
  );
}
