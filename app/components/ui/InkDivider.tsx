import ScrollVar from "./ScrollVar";

type InkDividerProps = { variant?: "a" | "b"; className?: string };

export default function InkDivider({ variant = "a", className = "" }: InkDividerProps) {
  return (
    <ScrollVar mode="pass" className={`ink-divider pointer-events-none relative h-[70svh] overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        style={{ backgroundImage: `url(/art/ink-${variant}.webp)` }}
        className={`ink-layer absolute inset-[-20%_-10%] bg-cover bg-center ${variant === "b" ? "ink-reverse" : ""}`}
      />
    </ScrollVar>
  );
}
