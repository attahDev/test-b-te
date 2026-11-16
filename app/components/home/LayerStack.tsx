type LayerStackProps = { count: number; active: number };

export default function LayerStack({ count, active }: LayerStackProps) {
  const gap = 52;
  const height = 150 + gap * (count - 1);
  return (
    <svg viewBox={`0 0 340 ${height + 40}`} aria-hidden="true" className="h-auto w-full max-w-[340px] overflow-visible">
      {Array.from({ length: count }, (_, index) => {
        const lifted = index === active;
        const y = 20 + (count - 1 - index) * gap + (lifted ? -14 : 0);
        return (
          <g key={index} style={{ transform: `translateY(${y}px)`, transition: "transform 600ms cubic-bezier(.22,1,.36,1)" }}>
            <polygon
              points="170,0 330,75 170,150 10,75"
              fill={lifted ? "rgb(233 120 104 / 0.22)" : "rgb(120 150 220 / 0.07)"}
              stroke={lifted ? "#E97868" : "rgb(150 175 235 / 0.35)"}
              strokeWidth={lifted ? 1.6 : 1}
              style={{ transition: "fill 500ms, stroke 500ms" }}
            />
          </g>
        );
      })}
    </svg>
  );
}
