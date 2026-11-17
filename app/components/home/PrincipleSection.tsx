import Button from "../ui/Button";

export default function PrincipleSection() {
  return (
    <section className="px-6 py-24 text-center md:py-32">
      <p className="text-[11px] uppercase tracking-[0.32em] text-[#E97868]">Leave no one behind</p>
      <h2 className="mx-auto mt-8 max-w-[18ch] text-3xl font-extralight uppercase leading-[1.15] tracking-[0.1em] md:text-5xl">
        Principle: community ownership
      </h2>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Button href="/contact" size="medium">
          Work with BTE <span aria-hidden="true">↗</span>
        </Button>
        <Button href="/ecosystem" variant="secondary" size="medium">
          Our ecosystem <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </section>
  );
}
