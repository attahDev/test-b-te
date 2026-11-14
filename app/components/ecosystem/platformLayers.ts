export type Tool = { name: string; icon: string; note?: string; parts?: string[] };
export type ToolGroup = { id: string; title: string; upcoming?: boolean; columns: string; tools: Tool[] };

export const toolGroups: ToolGroup[] = [
  {
    id: "ai",
    title: "AI and business tools",
    columns: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    tools: [
      { name: "Market Research", icon: "search", note: "Industry and market findings for the idea, written for a founder rather than an analyst." },
      { name: "Pitch Deck", icon: "deck", note: "Builds a themed investor deck from the idea and research, slide by slide." },
      { name: "Proposal Builder", icon: "doc", note: "Drafts client and funding proposals from a short brief, ready to edit." },
      { name: "Idea Generator", icon: "bulb", note: "Turns a rough direction into a business concept you can look at, question and refine.", parts: ["Idea Engine"] },
      { name: "Brand Identity", icon: "pen", note: "Logos and brand documents, exported as multi-page PDFs." },
      { name: "CV Builder", icon: "talent", note: "AI-written CVs with ATS scoring and tailoring for each role, linked to the member's Skills Passport and matched opportunities." },
      { name: "Business Planner", icon: "list", note: "A structured plan with a roadmap to work through.", parts: ["Business Studio"] },
      { name: "Mentor AI", icon: "cap" },
      { name: "Grant Writer", icon: "pen" },
      { name: "Green Impact", icon: "leaf", parts: ["Green AI Advisor"] },
      { name: "Hall of Fame AI", icon: "trophy" },
      { name: "General Chatbot", icon: "chat" },
      { name: "Career Intelligence", icon: "compass", parts: ["Readiness", "Interview Prep", "Cover Letter"] },
    ],
  },
  {
    id: "learning",
    title: "Learning and careers",
    columns: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    tools: [
      { name: "Academy and Courses", icon: "cap", parts: ["Enrollment", "Azure Learn", "Certificates"] },
      { name: "Career Paths", icon: "compass" },
      { name: "Career Portfolio", icon: "briefcase" },
      { name: "Career Mobility Analytics", icon: "chart" },
      { name: "Opportunities", icon: "star", parts: ["Assistant", "Opportunity Insights"] },
    ],
  },
  {
    id: "community",
    title: "Community and mentorship",
    columns: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    tools: [
      { name: "Mentors", icon: "users", note: "Guidance from mentors, with sessions you can book.", parts: ["Find", "Groups", "Project Reviews", "Mentor Application"] },
      { name: "Community", icon: "users" },
      { name: "Network", icon: "link" },
      { name: "Events", icon: "calendar", note: "BTE events and programmes in one place.", parts: ["My Events", "Shareable event pages"] },
      { name: "Newsletter", icon: "mail" },
      { name: "Video Conferencing", icon: "video" },
    ],
  },
  {
    id: "upcoming",
    title: "Upcoming tools",
    upcoming: true,
    columns: "grid-cols-1 sm:grid-cols-3",
    tools: [
      { name: "Financial Forecast", icon: "chart" },
      { name: "Investor Readiness", icon: "rocket" },
      { name: "Business Model Canvas", icon: "grid" },
    ],
  },
];

export const toolTones = ["#7c6cf0", "#4a90ff", "#34d378", "#f08a3c", "#a86cf0", "#2cc4c4", "#e8b53c"];
