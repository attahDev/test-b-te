import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const offices = [
  {
    name: "Greater Manchester",
    lines: ["Manchester, Greater Manchester"],
    email: "info@gmblacktechexpo.co.uk",
    phone: "+44 7405 230017",
    phoneHref: "tel:+447405230017",
  },
  {
    name: "South Yorkshire",
    lines: ["Sheffield, Barnsley, Doncaster and Rotherham"],
    email: "southyorkshire@blacktechexpo.co.uk",
  },
  { name: "Nigeria", soon: true },
  { name: "Ireland", soon: true },
];

const pages = [
  { label: "Who we are", href: "/#who-we-are" },
  { label: "Our ecosystem", href: "/ecosystem" },
  { label: "Work with BTE", href: "/contact" },
];

const linkClass =
  "inline-block py-1.5 text-sm text-[#FAFAF9]/60 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10 px-6 pb-10 pt-24 md:px-16 md:pt-32">
      <div className="mx-auto w-full max-w-[1300px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <Image src="/homepage/bte-logo.png" alt="Black Tech Expo" width={92} height={53} className="h-auto w-[84px]" />
            <p className="mt-10 max-w-[14ch] text-3xl font-extralight uppercase leading-[1.15] tracking-[0.1em] md:text-3xl">
              Leave no one behind
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {offices.map((office) => (
              <div key={office.name}>
                <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">{office.name}</h4>
                {office.soon ? (
                  <p className="mt-4 text-sm text-[#FAFAF9]/50">Coming soon</p>
                ) : (
                  <div className="mt-4 space-y-1 text-sm leading-relaxed text-[#FAFAF9]/75">
                    {office.lines?.map((line) => <p key={line}>{line}</p>)}
                    <p>
                      <a href={`mailto:${office.email}`} className="break-all transition-colors hover:text-white">{office.email}</a>
                    </p>
                    {office.phone && (
                      <p>
                        <a href={office.phoneHref} className="transition-colors hover:text-white">{office.phone}</a>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-8">
            {pages.map((page) => (
              <li key={page.label}>
                <Link href={page.href} className={linkClass}>{page.label}</Link>
              </li>
            ))}
            <li><Link href="#" className={linkClass}>Privacy</Link></li>
            <li><Link href="#" className={linkClass}>Cookies</Link></li>
            <li><Link href="#" className={linkClass}>Accessibility</Link></li>
          </ul>
          <p className="text-xs text-[#FAFAF9]/50">© BTE 2026</p>
        </div>
      </div>
    </footer>
  );
}
