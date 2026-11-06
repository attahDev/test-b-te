import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#121212] pt-14 pb-8 md:pt-20">
      {/* Background wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-0 opacity-10">
        <Image src="/homepage/Image.svg" alt="" fill className="object-cover object-bottom" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-8">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-[2.2fr_0.9fr_1.4fr_1.3fr] md:gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col gap-6">
            <Image
              src="/homepage/BTE Logo.png"
              alt="Black Tech Expo"
              width={80}
              height={80}
              className="h-14 w-auto"
            />
            <p className="text-[10px] leading-tight text-[#FAFAF9]/80">
              Empowering Innovation,
              <br />
              Uniting Communities
            </p>
            <p className="mt-1 text-sm italic text-[#FAFAF9]/70">
              ...Leave no one behind
            </p>
          </div>

          {/* Site links */}
          <div>
            <h4 className="text-[#FAFAF9] font-semibold mb-4">Site</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  Our Ecosystem
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  Work With BTE
                </Link>
              </li>
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="text-[#FAFAF9] font-semibold mb-4">Programmes</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  Greater Manchester Black Tech Expo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  South Yorkshire Black Tech Expo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  BTE Academy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  Black Tech Expo Hall of Fame
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#FAFAF9] font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors text-sm"
                >
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#FAFAF9]/10 pt-6 flex items-center justify-between">
          <p className="text-[#FAFAF9]/40 text-sm">© BTE 2026</p>
          <div className="flex items-center gap-2 text-[#FAFAF9]/40 text-sm">
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
