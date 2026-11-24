import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../components/contact/ContactForm";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import Button from "../components/ui/Button";
import SectionLabel from "../components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Contact - Black Tech Expo",
  description: "Get in touch with Black Tech Expo to partner, fund, build or join the network.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col text-white">
      <Navbar />

      <section aria-labelledby="connect-title" className="relative isolate flex min-h-[70svh] items-end overflow-hidden px-6 pb-16 pt-36 sm:px-10 md:pb-24 lg:px-14">
        <Image src="/homepage/architectural-background.png" alt="" aria-hidden="true" fill priority sizes="100vw" className="-z-10 object-cover object-center opacity-[0.12] mix-blend-screen" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b090d] via-transparent to-transparent" />
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionLabel className="mb-5">Connect</SectionLabel>
          <h1 id="connect-title" className="max-w-[760px] text-3xl font-extralight uppercase leading-[1.15] tracking-[0.1em] md:text-5xl">Work with BTE</h1>
          <p className="mt-6 max-w-[520px] text-base leading-relaxed text-white/75 md:text-lg">
            Partner with us, fund the work, build alongside us or join the network.
          </p>
          <div className="mt-8">
            <Button href="#message" variant="primary" size="large">
              Send a message <span aria-hidden="true">↓</span>
            </Button>
          </div>
        </div>
      </section>

      <section id="message" aria-labelledby="message-title" className="border-t border-white/10 px-6 py-16 sm:px-10 md:py-24 lg:px-14">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
          <div>
            <h2 id="message-title" className="text-2xl font-extralight uppercase leading-[1.15] tracking-[0.1em] md:text-3xl">Tell us what you have in mind</h2>
            <p className="mt-4 max-w-[360px] text-base leading-relaxed text-white/70">
              Share a few details and the team will reply by email.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
