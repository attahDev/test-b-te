import type { Metadata } from "next";
import Aurora from "../components/contact/Aurora";
import ContactForm from "../components/contact/ContactForm";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import SectionLabel from "../components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Contact - Black Tech Expo",
  description: "Get in touch with Black Tech Expo to partner, fund, build or join the network.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#08090d] text-white">
      <Navbar />
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-32 sm:px-10 md:pb-28 md:pt-40 lg:px-14">
        <div className="absolute inset-0 -z-10">
          <Aurora tone="warm" />
        </div>
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <div>
            <SectionLabel className="mb-5">Contact</SectionLabel>
            <h1 className="text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">Work with BTE</h1>
            <p className="mt-5 max-w-[400px] text-base leading-relaxed text-white/70 md:text-lg">
              Partner with us, fund the work, build alongside us or join the network. Tell us what you have in mind and the team will reply by email.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
