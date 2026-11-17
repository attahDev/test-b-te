import Button from "../ui/Button";

export default function BuildWithUsSection() {
  return (
    <section aria-labelledby="build-with-us-title" className="border-t border-white/10 px-6 py-24 text-center md:py-32">
      <h2 id="build-with-us-title" className="text-3xl font-extralight uppercase leading-[1.15] tracking-[0.1em] md:text-5xl">
        Build with us
      </h2>
      <p className="mx-auto mt-8 max-w-[44ch] text-base font-light leading-relaxed text-[#FAFAF9]/70 md:text-lg">
        Whether you are a government, university, technology company, investor, founder or community organisation: let us build the infrastructure for a more inclusive digital economy.
      </p>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Button href="/contact" variant="primary" size="large">
          Work with BTE <span aria-hidden="true">↗</span>
        </Button>
        <Button href="/ecosystem#technology-model-title" variant="secondary" size="large">
          Explore the ecosystem <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </section>
  );
}
