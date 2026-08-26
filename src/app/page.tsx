import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import MiniDashboard from "@/components/mini-dashboard";

export default function Home() {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto] bg-background text-foreground">
      <Header />

      <main className="relative min-h-screen">
        {/* Hero */}
        <section className="relative w-full overflow-hidden">
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-130">
            <Image
              src="/landing.jpeg"
              alt="Landing page image"
              width={1000}
              height={1000}
              priority
              className="w-full h-full object-cover brightness-60 dark:brightness-50"
            />

            {/* Dark overlay: stronger in light, deeper in dark */}
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/70 dark:from-black/50 dark:via-black/60 dark:to-black/80" />

            {/* Bottom fade into page bg */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-linear-to-t from-background to-transparent" />

            {/* Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">

              <h1 className="mt-5 sm:mt-6 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-md animate-blurred-fade-in">
                Ship a landing page{" "}
                <span className="bg-linear-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                  in minutes
                </span>
              </h1>

              <p className="mt-4 sm:mt-5 max-w-xl text-base sm:text-lg font-medium tracking-wide text-white/85 animate-blurred-fade-in">
                Describe your product, pick a model, and watch Ar0 turn a
                prompt into a polished, ready-to-publish page.
              </p>
            </div>
          </div>

          <div id="preview" className="relative flex justify-center -mt-16 sm:-mt-20 md:-mt-24 px-4">
            <MiniDashboard />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
