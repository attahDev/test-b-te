export type LayerItem = { name: string; icon: string; note?: string };

export const ecosystem: LayerItem[] = [
  { name: "Community", icon: "users" },
  { name: "Events", icon: "calendar" },
  { name: "Academy", icon: "cap" },
  { name: "Fellowship", icon: "medal" },
  { name: "Hall of Fame", icon: "trophy" },
  { name: "Partnerships", icon: "link" },
  { name: "Business Services", icon: "briefcase" },
  { name: "Careers & Talent", icon: "talent" },
  { name: "Green Impact", icon: "leaf" },
  { name: "Digital Trust", icon: "shield" },
  { name: "Research & Insights", icon: "chart" },
];

export const platformTools: LayerItem[] = [
  { name: "Research Tool", icon: "search", note: "Surveys, polls and research projects" },
  { name: "Translation Tool", icon: "translate", note: "Multi-language real-time translation" },
  { name: "Conference & Video Rooms", icon: "video", note: "Meetings, rooms and virtual events" },
  { name: "Marketplace & Freelance Hub", icon: "store", note: "Services, freelancers and project requests" },
  { name: "Promo Studio", icon: "megaphone", note: "Marketing, campaigns and content tools" },
  { name: "Tickets & Passes", icon: "ticket", note: "Ticket sales, barcodes and gift cards" },
  { name: "Carbon & Green Impact Tool", icon: "leaf", note: "Carbon tracking, ESG and reporting" },
  { name: "Change Maker Hub", icon: "star", note: "Recognition, impact projects and wall of fame" },
];

export const agents: LayerItem[] = [
  { name: "Ecosystem Guide AI", icon: "compass", note: "Navigate the platform and find what you need." },
  { name: "Career AI", icon: "briefcase", note: "Career guidance, skills, CVs and professional growth." },
  { name: "Jobs & Talent AI", icon: "talent", note: "Jobs, internships, sponsored roles and talent matching." },
  { name: "Founder AI", icon: "rocket", note: "Startup support, business growth and scaling." },
  { name: "Fellowship AI", icon: "medal", note: "Fellowship guidance, track progress and benefits." },
  { name: "Global Talent AI", icon: "globe", note: "Talent passport, achievements and evidence tracking." },
  { name: "Hall of Fame AI", icon: "trophy", note: "Legacy, nominations and historical archives." },
  { name: "Partnership AI", icon: "link", note: "Partnership opportunities and collaborations." },
  { name: "Opportunity AI", icon: "star", note: "Grants, funding, accelerators and competitions." },
  { name: "Research AI", icon: "search", note: "Research intelligence, reports and insights." },
  { name: "Green Impact AI", icon: "leaf", note: "Sustainability, carbon tracking and ESG advice." },
  { name: "Digital Trust AI", icon: "shield", note: "Privacy, security, compliance and responsible AI." },
  { name: "Community AI", icon: "users", note: "Community support, engagement and networking." },
  { name: "Mentorship AI", icon: "cap", note: "Mentor matching, mentee support and development." },
];

export const productivity: LayerItem[] = [
  { name: "Market Research AI", icon: "chart", note: "Industry research, market analysis, trends, stocks, crypto and reports." },
  { name: "Proposal Builder AI", icon: "doc", note: "Create winning proposals and business documents in minutes." },
  { name: "Business Plan Builder AI", icon: "bulb", note: "AI-powered business plans tailored to your business." },
  { name: "Grant Writer AI", icon: "pen", note: "Find grants and write strong grant applications with AI." },
  { name: "Investor Deck Builder AI", icon: "deck", note: "Create investor-ready decks that tell your story." },
];

export const controlCentre: LayerItem[] = [
  { name: "Governance", icon: "scale" },
  { name: "Security", icon: "lock" },
  { name: "GDPR", icon: "shield" },
  { name: "Digital Trust", icon: "shield" },
  { name: "Compliance", icon: "check" },
  { name: "Analytics", icon: "chart" },
  { name: "Users", icon: "user" },
  { name: "Partnerships", icon: "link" },
  { name: "Operations", icon: "gear" },
  { name: "Audit Logs", icon: "list" },
  { name: "System Health", icon: "pulse" },
];

export const agentTones = ["#7c6cf0", "#4a90ff", "#34d378", "#f08a3c", "#a86cf0", "#2cc4c4", "#e8b53c"];
