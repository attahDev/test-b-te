const paths: Record<string, string> = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4",
  chart: "M4 20V10m6 10V4m6 16v-8m4 8H3",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  bulb: "M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.5.4.5 1.1.5 1.6V16h6v-.5c0-.5 0-1.2.5-1.6A6 6 0 0 0 12 3z",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 9a8 8 0 0 1 16 0",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm-7 9a7 7 0 0 1 14 0m1-9a3 3 0 1 0 0-6m2 6a6 6 0 0 1 4 6",
  briefcase: "M4 8h16v11H4zM9 8V5h6v3M4 13h16",
  chat: "M4 5h16v11H9l-5 4z",
  coin: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4v10m-3-7c0-1 1.3-1.5 3-1.5s3 .5 3 1.5-1.3 1.5-3 1.5-3 .5-3 1.5 1.3 1.5 3 1.5 3-.5 3-1.5",
  leaf: "M5 19c0-9 5-14 15-14 0 10-5 15-14 15m-1 0 7-8",
  cap: "m2 9 10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5",
  pin: "M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4m8-4v4",
  mail: "M3 6h18v12H3zm0 0 9 7 9-7",
  video: "M3 7h12v10H3zm12 3 6-3v10l-6-3",
  network: "M12 5a2 2 0 1 0 0 .01M5 18a2 2 0 1 0 0 .01M19 18a2 2 0 1 0 0 .01M12 7v5m0 0-6 4m6-4 6 4",
};

const keywords: [string, string][] = [
  ["market", "search"], ["pitch", "chart"], ["proposal", "doc"], ["idea", "bulb"], ["brand", "star"],
  ["cv", "user"], ["planner", "briefcase"], ["mentor ai", "chat"], ["grant", "coin"], ["green", "leaf"],
  ["fame", "star"], ["chatbot", "chat"], ["intelligence", "chart"], ["academy", "cap"], ["paths", "pin"],
  ["portfolio", "briefcase"], ["mobility", "chart"], ["opportunit", "search"], ["mentors", "users"],
  ["community", "users"], ["network", "network"], ["events", "calendar"], ["newsletter", "mail"], ["video", "video"],
];

export function toolIconPath(name: string) {
  const lower = name.toLowerCase();
  const match = keywords.find(([word]) => lower.includes(word));
  return paths[match ? match[1] : "bulb"];
}
