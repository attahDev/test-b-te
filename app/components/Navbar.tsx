import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5">
      <div className="flex items-center gap-2">
        <Image
          src="/homepage/BTE Logo.png"
          alt="Black Tech Expo Logo"
          width={40}
          height={40}
          className="h-10 w-auto"
        />
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm text-[#FAFAF9]/80">
        <Link href="#" className="hover:text-[#FAFAF9] transition-colors">
          Our Expo
        </Link>
        <Link href="#" className="hover:text-[#FAFAF9] transition-colors">
          Ecosystem
        </Link>
        <Link href="#" className="hover:text-[#FAFAF9] transition-colors">
          Get Involved
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="hidden md:inline-flex items-center gap-1 rounded-full border border-[#FAFAF9]/20 px-5 py-2 text-sm text-[#FAFAF9] hover:bg-[#FAFAF9]/10 transition-colors"
        >
          Our Ecosystem ↗
        </Link>
        <Link
          href="#"
          className="inline-flex items-center gap-1 rounded-full bg-[#B04333] px-5 py-2 text-sm text-white hover:bg-[#923327] transition-colors"
        >
          Work with BTE ↗
        </Link>
      </div>
    </nav>
  );
}
