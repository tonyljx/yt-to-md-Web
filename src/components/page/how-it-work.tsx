/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BAfcidLxTI4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Icons } from "../icons";

export default function HowItWork() {
  return (
    <>
      <section className="w-full">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
                How It works
              </h2>

              <p className="mx-auto max-w-[600px] text-center text-gray-500 ease-in-out animate-in fade-in slide-in-from-bottom-4 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                upload your youtube video url, add some chapters to seperate,
                use ai model to rewrite,and that&apos;s it!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="xl:grid-cols-2xl grid gap-6 lg:grid-cols-3 lg:items-center lg:gap-12">
            {/* feature1 */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex-1 self-center">
                <Icons.youtube />
              </div>
              <div className="space-y-2">
                <h3 className="text-center text-xl font-medium tracking-tighter sm:text-3xl">
                  Upload the video ID
                </h3>
                <p className="text-center text-gray-500 dark:text-gray-400 md:text-sm/relaxed lg:text-base/relaxed xl:text-base/relaxed">
                  Enter the video ID of the YouTube video you want to add
                  chapters to, and click the submit button to upload the video
                </p>
              </div>
            </div>
            {/* feature2 */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex-1 self-center">
                <Icons.subtitle />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-medium tracking-tighter sm:text-3xl">
                  Add Chapters ( Optional )
                </h3>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  If users want to add chapters to their video, provide an
                  optional step to parse the video ID and extract chapters.
                </p>
              </div>
            </div>
            {/* feature3 */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex-1 self-center">
                <Icons.openai />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-medium tracking-tighter sm:text-3xl">
                  AI Model to Prettify MD
                </h3>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Utilize an AI model to enhance the original markdown document
                  associated with the video ID.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
