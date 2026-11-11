// Region and site content for the globe section; null or empty fields render as visible placeholders.

export type Site = {
  name: string;
  office: string | null;
  has: string[];
  done: string[];
  href: string | null;
};

export type Region = {
  id: string;
  name: string;
  status: "live" | "soon";
  lat: number;
  lon: number;
  zoom: number;
  labelSide: "left" | "right";
  line: string;
  stats: { number: string; label: string }[];
  sites: Site[];
};

export const regions: Region[] = [
  {
    id: "uk",
    name: "United Kingdom",
    status: "live",
    lat: 53.0,
    lon: -1.8,
    zoom: 1.3,
    labelSide: "right",
    line: "Home of the Greater Manchester and South Yorkshire programmes.",
    stats: [
      { number: "17+", label: "AI Agents" },
      { number: "15+", label: "Mentors" },
      { number: "6+", label: "Learning Areas" },
    ],
    sites: [
      {
        name: "Greater Manchester Black Tech Expo",
        office: null,
        has: ["The parent brand and intellectual property"],
        done: [],
        href: null,
      },
      {
        name: "South Yorkshire Black Tech Expo",
        office: null,
        has: [],
        done: [],
        href: null,
      },
    ],
  },
  {
    id: "nigeria",
    name: "Nigeria",
    status: "soon",
    lat: 9.1,
    lon: 8.7,
    zoom: 1.2,
    labelSide: "right",
    line: "Opening next.",
    stats: [],
    sites: [{ name: "Nigeria", office: null, has: [], done: [], href: null }],
  },
  {
    id: "ireland",
    name: "Ireland",
    status: "soon",
    lat: 53.3,
    lon: -8.0,
    zoom: 1.3,
    labelSide: "left",
    line: "Opening next.",
    stats: [],
    sites: [{ name: "Ireland", office: null, has: [], done: [], href: null }],
  },
];

export const hubId = "uk";
