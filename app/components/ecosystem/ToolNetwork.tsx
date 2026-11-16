type ToolNetworkProps = { count: number; active: number };

const SIZE = 320;
const CENTER = SIZE / 2;

export default function ToolNetwork({ count, active }: ToolNetworkProps) {
  const radius = 118;
  const nodes = Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    const wobble = index % 2 === 0 ? 0 : 14;
    return {
      x: CENTER + Math.cos(angle) * (radius - wobble),
      y: CENTER + Math.sin(angle) * (radius - wobble),
    };
  });

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true" className="h-auto w-full max-w-[340px] overflow-visible">
      <defs>
        <radialGradient id="tool-glow">
          <stop offset="0%" stopColor="#E97868" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E97868" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={CENTER} cy={CENTER} r={radius + 18} fill="none" stroke="rgb(255 255 255 / 0.06)" />
      {nodes.map((node, index) => (
        <line
          key={`line-${index}`}
          x1={CENTER}
          y1={CENTER}
          x2={node.x}
          y2={node.y}
          stroke={index === active ? "#E97868" : "rgb(120 150 220 / 0.25)"}
          strokeWidth={index === active ? 1.5 : 1}
          style={{ transition: "stroke 500ms, stroke-width 500ms" }}
        />
      ))}
      {nodes.map((node, index) => {
        const next = nodes[(index + 1) % count];
        return <line key={`ring-${index}`} x1={node.x} y1={node.y} x2={next.x} y2={next.y} stroke="rgb(120 150 220 / 0.12)" />;
      })}
      <circle cx={CENTER} cy={CENTER} r="5" fill="#FAFAF9" />
      {nodes.map((node, index) => {
        const on = index === active;
        return (
          <g key={`node-${index}`}>
            {on && <circle cx={node.x} cy={node.y} r="34" fill="url(#tool-glow)" />}
            <circle
              cx={node.x}
              cy={node.y}
              r={on ? 6 : 3.5}
              fill={on ? "#FAFAF9" : "rgb(150 175 235 / 0.7)"}
              style={{ transition: "r 400ms, fill 400ms" }}
            />
          </g>
        );
      })}
    </svg>
  );
}
