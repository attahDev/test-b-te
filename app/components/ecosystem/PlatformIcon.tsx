const shapes: Record<string, string> = {
  users: "M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 14.2c2.4 0 4 1.8 4 4.3M9 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM17 6.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z",
  calendar: "M5.5 5h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3.5 10h17M8 3v4M16 3v4",
  cap: "M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5",
  trophy: "M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8M9.5 18h5",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 10 18.7l1-1",
  briefcase: "M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18",
  talent: "M10 5a3.2 3.2 0 1 0 0 6.4A3.2 3.2 0 0 0 10 5zM3.5 20c0-3.6 2.9-6 6.5-6M17 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.2 18.2l2.3 2.3",
  leaf: "M5 19c0-9 5-14 15-14 0 10-5 15-14 15M5 19c2-4 5-7 9-9",
  chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6",
  search: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM20 20l-4.2-4.2",
  video: "M5 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM15 10.5l6-3v9l-6-3",
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z",
  star: "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9L3.5 9.7l5.9-.8z",
  rocket: "M12 3c3.5 2 5 5.5 5 9l-2.5 3h-5L7 12c0-3.5 1.5-7 5-9zM12 8.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM9.5 15L8 19l3-1.5M14.5 15l1.5 4-3-1.5",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.7.6 1 1.3 1 2.1h5c0-.8.3-1.5 1-2.1A6 6 0 0 0 12 3z",
  pen: "M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19zM14.5 6.5l3 3",
  deck: "M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM12 16v4M8 20h8M8 12l3-3 2 2 3-4",
  list: "M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01",
  chat: "M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8 9h8M8 12.5h5",
  mail: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3.5 7.5L12 13l8.5-5.5",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
};

type PlatformIconProps = { name: string; className?: string };

export default function PlatformIcon({ name, className = "h-6 w-6" }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={shapes[name] ?? shapes.grid} />
    </svg>
  );
}
