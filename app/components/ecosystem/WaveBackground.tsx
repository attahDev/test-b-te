import Image from "next/image";

export default function WaveBackground() {
  return (
    <Image
      src="/ecosystem/wave-background.png"
      alt=""
      aria-hidden="true"
      width={1440}
      height={900}
      sizes="(max-width: 1125px) 80vw, 900px"
      className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-[80%] max-w-[900px] select-none"
    />
  );
}
