export type Tool = { name: string; note?: string; parts?: string[] };
export type ToolGroup = { id: string; title: string; upcoming?: boolean; tools: Tool[] };

export const toolGroups: ToolGroup[] = [
  {
    id: "ai",
    title: "AI and business tools",
    tools: [
      { name: "Market Research", note: "Industry and market findings for the idea, written for a founder rather than an analyst." },
      { name: "Pitch Deck", note: "Builds a themed investor deck from the idea and research, slide by slide." },
      { name: "Proposal Builder", note: "Drafts client and funding proposals from a short brief, ready to edit." },
      { name: "Idea Generator", note: "Turns a rough direction into a business concept you can look at, question and refine.", parts: ["Idea Engine"] },
      { name: "Brand Identity", note: "Logos and brand documents, exported as multi-page PDFs." },
      { name: "CV Builder", note: "AI-written CVs with ATS scoring and tailoring for each role, linked to the member's Skills Passport and matched opportunities." },
      { name: "Business Planner", note: "A structured plan with a roadmap to work through.", parts: ["Business Studio"] },
      { name: "Mentor AI" },
      { name: "Grant Writer" },
      { name: "Green Impact", parts: ["Green AI Advisor"] },
      { name: "Hall of Fame AI" },
      { name: "General Chatbot" },
      { name: "Career Intelligence", parts: ["Readiness", "Interview Prep", "Cover Letter"] },
    ],
  },
  {
    id: "learning",
    title: "Learning and careers",
    tools: [
      { name: "Academy and Courses", parts: ["Enrollment", "Azure Learn", "Certificates"] },
      { name: "Career Paths" },
      { name: "Career Portfolio" },
      { name: "Career Mobility Analytics" },
      { name: "Opportunities", parts: ["Assistant", "Opportunity Insights"] },
    ],
  },
  {
    id: "community",
    title: "Community and mentorship",
    tools: [
      { name: "Mentors", note: "Guidance from mentors, with sessions you can book.", parts: ["Find", "Groups", "Project Reviews", "Mentor Application"] },
      { name: "Community" },
      { name: "Network" },
      { name: "Events", note: "BTE events and programmes in one place.", parts: ["My Events", "Shareable event pages"] },
      { name: "Newsletter" },
      { name: "Video Conferencing" },
    ],
  },
];
