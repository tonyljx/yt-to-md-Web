import Footer from "@/components/footer";
import Header from "@/components/header";
import Loading from "@/components/loading";
import MarkdownEditor from "@/components/markdown-editor";
import Note from "@/components/note";
import HowItWork from "@/components/page/how-it-work";
import UrlInputForm from "@/components/url-input";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="flex flex-col items-center">
      <Header />
      {/* <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
      /> */}
      <div className="flex flex-col  items-center justify-center gap-6   py-[5vh] sm:py-[10vh]">
        <h2 className="text-center text-3xl font-bold tracking-tighter duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-3 sm:text-5xl">
          Convert your video into an interactive experience
        </h2>
        <p className="mx-auto max-w-[600px] text-center text-gray-500 ease-in-out animate-in fade-in slide-in-from-bottom-4 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Add chapters to your video to make it easy for viewers to navigate.
          Our AI model can even enhance your markdown document to make it more
          readable.
        </p>

        <UrlInputForm />

        <div className="mt-28 inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 lg:mt-36">
          features
        </div>
        <img className="mt-6" src="/flow.svg" alt="flow" />
      </div>

      <HowItWork />

      {/* <Suspense fallback={<Loading />}>
        <Note />
      </Suspense> */}

      <Suspense fallback={<Loading />}>
        <MarkdownEditor />
      </Suspense>

      <Footer />
    </section>
  );
}
