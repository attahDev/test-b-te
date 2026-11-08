import Link from "next/link";
import type { ReactNode } from "react";
import type { LinkProps } from "next/link";

type ButtonProps = {
  href: LinkProps["href"];
  variant?: "primary" | "secondary" | "secondarySubtle";
  size?: "small" | "medium" | "large";
  className?: string;
  children: ReactNode;
};

const variants = {
  primary: "bg-[#B04333] text-white hover:bg-[#923327]",
  secondary: "border border-[#FAFAF9]/50 text-[#FAFAF9] hover:bg-[#FAFAF9]/10",
  secondarySubtle:
    "border border-[#FAFAF9]/30 text-[#FAFAF9] hover:bg-[#FAFAF9]/10",
};

const sizes = {
  small: "px-4 py-2 text-xs",
  medium: "px-5 py-2.5 text-xs",
  large: "px-5 py-3.5 text-sm",
};

export default function Button({
  href,
  variant = "primary",
  size = "medium",
  className = "",
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`site-button inline-flex items-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
