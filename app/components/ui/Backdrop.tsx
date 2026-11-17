import ScrollVar from "./ScrollVar";

type BackdropProps = {
  name: string;
  strength?: number;
  fade?: "both" | "top" | "bottom";
  position?: string;
};

const masks = {
  both: "[mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]",
  top: "[mask-image:linear-gradient(to_bottom,transparent,#000_35%)]",
  bottom: "[mask-image:linear-gradient(to_bottom,#000_65%,transparent)]",
};

export default function Backdrop({ name, strength = 0.6, fade = "both", position = "center" }: BackdropProps) {
  return (
    <ScrollVar mode="pass" className={`backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden ${masks[fade]}`}>
      <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)]">
        <div
          aria-hidden="true"
          className="backdrop-image absolute inset-x-0 -inset-y-[14%] bg-cover"
          style={{ backgroundImage: `url(/art/${name}.webp)`, backgroundPosition: position, opacity: strength }}
        />
      </div>
    </ScrollVar>
  );
}
