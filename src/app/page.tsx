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
    <section className="container flex flex-col items-center ">
      <div className="  min-h-screen space-y-8 ">
        <div className=" mt-16 flex flex-col items-center">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 ">
            features
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tighter duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-3 sm:text-5xl">
            Convert your video into a markdown file, easily
          </h2>
        </div>

        <p className="mx-auto max-w-[600px] text-center text-gray-500 ease-in-out animate-in fade-in slide-in-from-bottom-4 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Add chapters to your video to make it easy for viewers to navigate.
          Our AI model can even enhance your markdown document to make it more
          readable.
        </p>

        <UrlInputForm />
      </div>

      <div className="mt-8">
        <h2 className=" text-center text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
          Workflow
        </h2>

        <p className="mx-auto max-w-[600px] text-center text-gray-500 ease-in-out animate-in fade-in slide-in-from-bottom-4 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Input youtube url, we will help parse the content and add chapters,
          then we will transform into Markdown file
        </p>
        <img className="" src="/flow.svg" alt="flow" />
      </div>

      <div className="mt-16">
        <HowItWork />
      </div>

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
