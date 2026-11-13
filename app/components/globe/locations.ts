
export type Rgb = [number, number, number];

export type Stop = {
  id: string;
  label: string;
  name: string;
  country: "uk" | "ie" | "ng";
  status: "live" | "soon";
  lat: number;
  lon: number;
  zoom: number;
  alt: number;
  labelSide: "left" | "right";
  rgb: string;
  hex: string;
  bg: string;
  aurora: [Rgb, Rgb, Rgb];
  line: string;
  stats: { number: string; label: string }[];
  office: string | null;
  has: string[];
  done: string[];
  href: string | null;
};

export const introAurora: [Rgb, Rgb, Rgb] = [[40, 214, 170], [70, 128, 250], [150, 92, 240]];
export const introBg = "#08090B";

export const stops: Stop[] = [
  {
    id: "greater-manchester",
    label: "Greater Manchester",
    name: "Greater Manchester Black Tech Expo",
    country: "uk",
    status: "live",
    lat: 53.48,
    lon: -2.24,
    zoom: 2.7,
    alt: 0.7,
    labelSide: "left",
    rgb: "239,92,78",
    hex: "#EF5C4E",
    bg: "#1b0b0c",
    aurora: [[239, 84, 72], [210, 52, 104], [250, 150, 90]],
    line: "The home of Black Tech Expo and where the programme started.",
    stats: [
      { number: "17+", label: "AI Agents" },
      { number: "15+", label: "Mentors" },
      { number: "6+", label: "Learning Areas" },
    ],
    office: null,
    has: ["The parent brand and intellectual property"],
    done: [],
    href: null,
  },
  {
    id: "south-yorkshire",
    label: "South Yorkshire",
    name: "South Yorkshire Black Tech Expo",
    country: "uk",
    status: "live",
    lat: 53.38,
    lon: -1.47,
    zoom: 2.7,
    alt: 0.7,
    labelSide: "right",
    rgb: "74,144,255",
    hex: "#4A90FF",
    bg: "#08111f",
    aurora: [[66, 134, 252], [40, 200, 240], [124, 104, 250]],
    line: "The second UK programme, built with local universities and partners.",
    stats: [],
    office: null,
    has: [],
    done: [],
    href: null,
  },
  {
    id: "nigeria",
    label: "Nigeria",
    name: "Black Tech Expo Nigeria",
    country: "ng",
    status: "soon",
    lat: 9.1,
    lon: 8.7,
    zoom: 1.8,
    alt: 1.05,
    labelSide: "right",
    rgb: "52,211,120",
    hex: "#34D378",
    bg: "#07160f",
    aurora: [[44, 204, 112], [20, 172, 146], [176, 232, 84]],
    line: "Opening next, connecting the UK network to Africa's largest tech talent pool.",
    stats: [],
    office: null,
    has: [],
    done: [],
    href: null,
  },
  {
    id: "ireland",
    label: "Ireland",
    name: "Black Tech Expo Ireland",
    country: "ie",
    status: "soon",
    lat: 53.3,
    lon: -8.0,
    zoom: 3.6,
    alt: 0.5,
    labelSide: "left",
    rgb: "251,165,48",
    hex: "#FBA530",
    bg: "#1a1205",
    aurora: [[252, 170, 52], [238, 112, 48], [52, 192, 112]],
    line: "Opening next, extending the network across the Irish Sea.",
    stats: [],
    office: null,
    has: [],
    done: [],
    href: null,
  },
];

export const countryColors: Record<Stop["country"], string> = {
  uk: stops[0].rgb,
  ie: stops[3].rgb,
  ng: stops[2].rgb,
};
