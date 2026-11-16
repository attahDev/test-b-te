import SectionLabel from "../ui/SectionLabel";
import WakeList from "../ui/WakeList";

const items = [
  {
    key: "registration",
    title: "Business registration and compliance",
    text: "Navigate UK business registration, tax requirements and legal compliance with expert guidance tailored to your needs.",
  },
  {
    key: "mentorship",
    title: "Mentorship and community support",
    text: "Connect with experienced entrepreneurs and industry leaders who understand your journey and are committed to your success.",
  },
  {
    key: "setup",
    title: "UK and international business setup",
    text: "Expand your reach locally and globally with support for multi-market business structures and international trade opportunities.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto grid w-full max-w-[1300px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>What we do</SectionLabel>
        </div>
        <WakeList items={items} />
      </div>
    </section>
  );
}
