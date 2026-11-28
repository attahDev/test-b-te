import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p className={`flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-[#E97868] ${className}`}>
      <span aria-hidden="true" className="h-px w-10 bg-[#E97868]/70" />
      {children}
    </p>
  );
}
