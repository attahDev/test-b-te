import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionLabel({
  children,
  className = "",
}: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span
        aria-hidden="true"
        className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E97868] text-xs text-[#E97868]"
      >
        ✳
      </span>
      <span className="inline-flex h-6 items-center rounded-full bg-[#E97868] px-3 text-xs font-medium text-[#161415]">
        {children}
      </span>
    </div>
  );
}
