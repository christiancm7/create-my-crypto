"use client";
import Steps from "../components/steps";
import Faq from "../components/faq";
import Collections from "../components/collections";

export default function Home() {
  return (
    <div>
      <main>
        <div className="relative">
          <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
            <div className="relative pb-10 pt-8">
              <h1 className="text-2xl sm:text-6xl md:text-5xl font-extrabold bg-clip-text text-gray-900 dark:text-white">
                Choose your blockchain
              </h1>
              <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300">
                Then create your coin
              </p>
            </div>
          </div>

          <Collections />
          <Steps />
          <Faq />
        </div>
      </main>
    </div>
  );
}
