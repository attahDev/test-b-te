import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#121212] pb-12 pt-16 text-[#FAFAF9] md:min-h-[633px] md:pb-[120px] md:pt-[109px]">
      {/* Background wave at bottom */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 bottom-0 z-0 h-[240px] w-[926px] max-w-none select-none">
        <Image src="/homepage/footer-wave.svg" alt="" fill sizes="926px" className="object-contain object-bottom" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-16 grid grid-cols-2 gap-x-8 gap-y-10 md:mb-[104px] md:grid-cols-[2.05fr_0.95fr_1.45fr_1.45fr] md:gap-x-8">
          {/* Logo and tagline */}
          <div className="col-span-2 flex flex-col items-start md:col-span-1">
            <Image
              src="/homepage/bte-logo.png"
              alt="Black Tech Expo"
              width={92}
              height={53}
              className="h-auto w-[92px]"
            />
            <p className="mt-1.5 text-[8px] font-medium leading-[1.2] text-[#FAFAF9]">
              Empowering Innovation,
              <br />
              Uniting Communities
            </p>
            <p className="mt-[50px] whitespace-nowrap text-xl italic leading-tight tracking-[-0.04em] text-[#FAFAF9]">
              ...Leave no one behind
            </p>
          </div>

          {/* Site links */}
          <div>
            <h4 className="mb-3 text-lg font-semibold leading-6 text-[#FAFAF9]">Site</h4>
            <ul className="max-w-[220px] space-y-3">
              <li>
                <Link
                  href="/#who-we-are"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/ecosystem"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  Our Ecosystem
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  Work With BTE
                </Link>
              </li>
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="mb-3 text-lg font-semibold leading-6 text-[#FAFAF9]">Programmes</h4>
            <ul className="max-w-[220px] space-y-3">
              <li>
                <Link
                  href="#"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  Greater Manchester Black Tech Expo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  South Yorkshire Black Tech Expo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  BTE Academy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  Black Tech Expo Hall of Fame
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-lg font-semibold leading-6 text-[#FAFAF9]">Legal</h4>
            <ul className="max-w-[220px] space-y-3">
              <li>
                <Link
                  href="#"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-block text-base font-medium leading-[1.4] text-[#a3a3a3] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
                >
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-between gap-6 border-t border-white/45 pt-9">
          <p className="text-sm text-[#FAFAF9]">© BTE 2026</p>
          <div className="flex items-center gap-2 text-sm text-[#FAFAF9]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            LinkedIn
          </div>
        </div>
      </div>
    </footer>
  );
}
