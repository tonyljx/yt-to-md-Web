import Header from "@/components/header";
import Loading from "@/components/loading";
import Note from "@/components/note";
import UrlInputForm from "@/components/url-input";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center p-10 md:p-24 md:pt-10">
      <Header />
      {/* <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
      /> */}
      <div className="flex flex-col items-center justify-center py-[10vh] sm:py-[15vh]">
        <h1 className="mb-3 text-4xl font-medium text-black duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-3">
          VNote
        </h1>

        <p className="duration-1200 mb-12 text-base text-gray-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">
          convert youtube video to markdown content
        </p>

        <UrlInputForm />

        {/* <div className="duration-1200 w-full max-w-md space-y-4 ease-in-out animate-in fade-in slide-in-from-bottom-4">
          hi
        </div> */}
      </div>

      <Suspense fallback={<Loading />}>
        <Note />
      </Suspense>
    </main>
  );
}
