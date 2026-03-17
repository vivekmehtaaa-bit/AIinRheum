import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ai-rheum-pathway-v3";

const PHASES = [
  {
    id: "foundation",
    phase: "Phase 1",
    title: "Consolidate & Submit",
    months: "Mar–May 2026",
    dateRange: "March 17 – May 31, 2026",
    icon: "🏗️",
    color: "#1a3a4a",
    accent: "#2e86ab",
    urgentNote: "EB-1A RFE deadline May 15 · ACR abstracts due ~mid-May · Harvard course wrap-up",
    description: "This phase is front-loaded with hard deadlines. Prioritize the EB-1A response, ACR abstract submissions, and finishing active coursework. Everything else is secondary until May 15.",
    tasks: [
      {
        id: "f1",
        text: "Submit EB-1A RFE response to USCIS",
        type: "milestone",
        deadline: "May 15, 2026",
        critical: true,
        pubOpp: null,
        detail: "Coordinate with Jason Crofts at Peak Immigration Law. Focus on Leading/Critical Role and Original Contributions criteria. Ensure rheumreferral.com, ACR committee work, and publications are documented as evidence.",
      },
      {
        id: "f2",
        text: "Submit 2 abstracts to ACR Convergence 2026",
        type: "publication",
        deadline: "~May 13, 2026 (est.)",
        critical: true,
        pubOpp: "Abstract 1: ARIA — locally adaptive CDS for rheumatology triage in frontier settings. Abstract 2: Referral optimization — impact of 220+ node decision tree on referral appropriateness. Both need results/data, not just concepts.",
        detail: "2025 deadline was May 13. 2026 TBD but historically mid-May. ACR Convergence 2026 is Nov 6–11 in Orlando. Late-breaking abstracts open ~October if you miss this window.",
      },
      {
        id: "f3",
        text: "Submit AI equity / Indigenous data governance manuscript to AC&R",
        type: "publication",
        deadline: "April 2026",
        critical: false,
        pubOpp: "Target: Arthritis Care & Research. Frame: CARE Principles, federated learning, algorithmic bias in underrepresented populations. This is your most unique manuscript — prioritize it.",
        detail: null,
      },
      {
        id: "f4",
        text: "Resubmit CTD-ILD manuscript (reframed for disparities)",
        type: "publication",
        deadline: "May 2026",
        critical: false,
        pubOpp: "Primary target: Journal of Clinical Rheumatology. Backup: Clinical Rheumatology. Reframe around Indigenous community partnership and health disparities lens.",
        detail: null,
      },
      {
        id: "f5",
        text: "Complete Harvard AI in Health Care course & capstone",
        type: "milestone",
        deadline: "Per course schedule",
        critical: false,
        pubOpp: "Adapt capstone (ARIA concept) into a commentary or perspective piece for a health informatics journal. Don't let this work die in a classroom — publish it.",
        detail: null,
      },
      {
        id: "f6",
        text: "Set up GitHub repos for all active projects",
        type: "build",
        deadline: "March 2026",
        critical: false,
        pubOpp: null,
        detail: "Create repos for: rheumreferral, rheumultrasound, ARIA, and this pathway tracker. Version control everything from day one.",
      },
      {
        id: "f7",
        text: "Migrate rheumreferral.com + family health site to Cloudflare Pages",
        type: "build",
        deadline: "After Netlify billing resets (~late March)",
        critical: false,
        pubOpp: null,
        detail: "Connect GitHub repos → Cloudflare Pages for auto-deployment pipeline.",
      },
      {
        id: "f-skill1",
        text: "🧠 SKILL: Complete Python basics (variables, loops, functions, pandas intro)",
        type: "skill",
        deadline: "End of April",
        critical: false,
        pubOpp: null,
        detail: "You don't need to become a developer — you need to read code, run Jupyter notebooks, and understand what data scientists are doing. Try: Codecademy Python course or Harvard CS50P (free). 2 hrs/week.",
      },
      {
        id: "f-skill2",
        text: "🧠 SKILL: Read FDA's Jan 2025 AI/ML SaMD draft guidance + GMLP 10 Principles",
        type: "skill",
        deadline: "End of May",
        critical: false,
        pubOpp: "Understanding the regulatory landscape makes your commentaries and grant applications much more credible. Reference these in everything you write about clinical AI.",
        detail: "Key docs: (1) 'AI-Enabled Device Software Functions: Lifecycle Management' (Jan 2025 draft), (2) IMDRF Good Machine Learning Practice 10 principles (Jan 2025 final), (3) Final PCCP guidance (Dec 2024). All free on FDA.gov.",
      },
    ],
  },
  {
    id: "build",
    phase: "Phase 2",
    title: "Build & Launch",
    months: "Jun–Aug 2026",
    dateRange: "June 1 – August 31, 2026",
    icon: "🔬",
    color: "#4a1942",
    accent: "#a855f7",
    urgentNote: "RheumUS launch · Grand rounds · Writing sprint for commentary pieces",
    description: "The hard deadlines have passed. Now build your portfolio. Launch rheumultrasound.com, present locally, and write the commentary/editorial pieces that establish your voice.",
    tasks: [
      {
        id: "b1",
        text: "Launch rheumultrasound.com MVP",
        type: "build",
        deadline: "July 2026",
        critical: false,
        pubOpp: "Write a MedEd paper: 'A Free, Open-Access MSKUS Curriculum for Rheumatology Trainees' → target RMD Open, JRheum, or Arthritis Care & Research Education section.",
        detail: "MVP = interactive atlas + grading metrics + quiz module. AI analyzer can come in Phase 3. Ship something usable first, then iterate.",
      },
      {
        id: "b2",
        text: "Write and pitch an editorial on AI + rheumatology workforce crisis",
        type: "publication",
        deadline: "June–July 2026",
        critical: false,
        pubOpp: "Pitch to: The Rheumatologist (most accessible), ACR Open Rheumatology, or RMD Open. Your Workforce Solutions Committee role gives you standing. 1500–2000 words.",
        detail: "Frame: 4,000+ rheumatologist shortage by 2030 + AI as force multiplier, not replacement. Reference ARIA, referral optimization, your Alaska context.",
      },
      {
        id: "b3",
        text: "Present grand rounds on AI in rheumatology",
        type: "milestone",
        deadline: "June–August 2026",
        critical: false,
        pubOpp: "UW, ANTHC, or Alaska WWAMI are natural venues. Record it — repurpose slides as a blog post or The Rheumatologist article.",
        detail: "This builds local visibility and can be listed on your CV. Invite feedback that sharpens your thinking for manuscripts.",
      },
      {
        id: "b4",
        text: "Pilot ARIA with real clinical data layer (RISE/CORRONA or local ANTHC data)",
        type: "build",
        deadline: "August 2026",
        critical: false,
        pubOpp: "This becomes the Methods paper: 'ARIA: An Adaptive CDS Framework for Rheumatology Access in Frontier Settings.' Target: JAMIA, JMIR, or Applied Clinical Informatics.",
        detail: "Even a small pilot (n=50-100 referrals evaluated against ARIA logic) generates publishable data. Talk to your IT team about de-identified referral data.",
      },
      {
        id: "b5",
        text: "Build personal academic portfolio website",
        type: "build",
        deadline: "July 2026",
        critical: false,
        pubOpp: null,
        detail: "Simple site: bio, CV/publications, projects (rheumreferral, rheumultrasound, ARIA), talks, contact. This is your digital business card for collaborators, journals, and grant reviewers.",
      },
      {
        id: "b6",
        text: "Update ACR position statement on MSKUS use (per committee work)",
        type: "milestone",
        deadline: "Per ACR timeline",
        critical: false,
        pubOpp: "Position statements are citable publications. Multi-author, national reach, high citation potential.",
        detail: null,
      },
      {
        id: "b-skill1",
        text: "🧠 SKILL: ML fundamentals — supervised vs unsupervised, train/val/test, overfitting, AUC/ROC",
        type: "skill",
        deadline: "End of July",
        critical: false,
        pubOpp: null,
        detail: "You need to speak this language fluently in papers and at conferences. Resources: Andrew Ng's Machine Learning Specialization (Coursera, first 2 courses), or Stanford's free CS229 lecture notes. Focus on concepts, not coding.",
      },
      {
        id: "b-skill2",
        text: "🧠 SKILL: Prompt engineering & AI tool fluency",
        type: "skill",
        deadline: "Ongoing",
        critical: false,
        pubOpp: "This becomes workshop material later. Document your workflows — 'How I use AI to draft manuscripts,' 'AI-assisted literature review,' etc.",
        detail: "You're already doing this intuitively. Formalize it: learn system prompts, structured output, chain-of-thought prompting. Read Anthropic's prompt engineering guide.",
      },
      {
        id: "b-skill3",
        text: "🧠 SKILL: Learn FHIR basics and CDS Hooks (health interoperability standards)",
        type: "skill",
        deadline: "End of August",
        critical: false,
        pubOpp: null,
        detail: "If you want ARIA or any tool to plug into EHRs, you need to understand FHIR (Fast Healthcare Interoperability Resources) and CDS Hooks. HL7's free FHIR overview + Logica Health sandbox. 1 hr/week.",
      },
    ],
  },
  {
    id: "amplify",
    phase: "Phase 3",
    title: "Amplify & Collaborate",
    months: "Sep–Nov 2026",
    dateRange: "September 1 – November 30, 2026",
    icon: "📡",
    color: "#0a4d3c",
    accent: "#10b981",
    urgentNote: "ACR Convergence Nov 6–11 Orlando · Late-breaking abstracts ~Oct · Collaboration season",
    description: "ACR Convergence is the main event. Present your work, network deliberately, and lock in collaborations. Start the transition from builder to visible thought leader.",
    tasks: [
      {
        id: "a1",
        text: "Present at ACR Convergence 2026 (poster or oral)",
        type: "milestone",
        deadline: "Nov 6–11, 2026 — Orlando, FL",
        critical: true,
        pubOpp: "Write a companion blog post or Rheumatologist piece summarizing your findings. Accepted abstracts publish in Arthritis & Rheumatology supplement.",
        detail: "If May abstracts accepted, prepare presentation. If not, submit late-breaking abstract (~October).",
      },
      {
        id: "a2",
        text: "Submit late-breaking abstract to ACR if needed",
        type: "publication",
        deadline: "~October 2026",
        critical: false,
        pubOpp: "Late-breaking abstracts are for high-impact research not available at the original deadline. If your ARIA pilot or rheumultrasound generated new data, this is perfect.",
        detail: "2023 deadline was noon ET Oct 3. Watch ACR announcements.",
      },
      {
        id: "a3",
        text: "Establish collaborative project with UW or CORRONA colleagues",
        type: "milestone",
        deadline: "September–October 2026",
        critical: false,
        pubOpp: "Multi-author paper using RISE/CORRONA registry data. Your ARIA framework + their data = strong manuscript with broader reach.",
        detail: "Reach out at ACR Convergence. Have a 1-pager describing ARIA and what data you need. Make it easy to say yes.",
      },
      {
        id: "a4",
        text: "Publish perspective piece on AI equity in Indigenous health",
        type: "publication",
        deadline: "October 2026",
        critical: false,
        pubOpp: "Target: NEJM Catalyst, Health Affairs, or Lancet Digital Health. Nobody else occupies this intersection — this is your single most differentiating piece.",
        detail: "Frame: AI trained on non-Indigenous data → algorithmic bias → federated learning and CARE Principles as solution. Cite your Alaska experience.",
      },
      {
        id: "a5",
        text: "Start LinkedIn thought leadership cadence (1 post/week)",
        type: "build",
        deadline: "Start September, maintain ongoing",
        critical: false,
        pubOpp: "Builds visibility → invited commentaries. Tag ACR, journals, collaborators.",
        detail: "Topics: AI tools tested, MSKUS education, referral wins, Alaska stories, reactions to AI papers. Authentic > polished.",
      },
      {
        id: "a6",
        text: "Peer review 3–5 AI manuscripts for rheumatology journals",
        type: "milestone",
        deadline: "Ongoing from September",
        critical: false,
        pubOpp: "Builds editorial relationships → invited reviewer → invited editorials. Volunteer through ACR reviewer programs.",
        detail: null,
      },
      {
        id: "a-skill1",
        text: "🧠 SKILL: NLP fundamentals — tokenization, embeddings, transformers",
        type: "skill",
        deadline: "End of October",
        critical: false,
        pubOpp: null,
        detail: "Most clinical AI involves NLP — extracting from notes, classifying referrals. Conceptual level. Try: Hugging Face NLP course (free) or Jay Alammar's 'Illustrated Transformer.'",
      },
      {
        id: "a-skill2",
        text: "🧠 SKILL: AI ethics frameworks — NIST AI RMF, WHO guidance, CARE/FAIR Principles",
        type: "skill",
        deadline: "End of November",
        critical: false,
        pubOpp: "Directly feeds your publications. Makes equity papers more rigorous.",
        detail: "Key reads: NIST AI Risk Management Framework (free), WHO 'Ethics & Governance of AI for Health' (2021), Global Indigenous Data Alliance CARE Principles.",
      },
    ],
  },
  {
    id: "lead",
    phase: "Phase 4",
    title: "Lead & Scale",
    months: "Dec 2026–Mar 2027",
    dateRange: "December 1, 2026 – March 16, 2027",
    icon: "🎯",
    color: "#5c3a11",
    accent: "#f59e0b",
    urgentNote: "Grant applications · Review article · Year 2 planning · ACR committee nominations",
    description: "Transition from building to leading. Submit grants, write the career-defining review article, position for advisory roles. Plan Year 2.",
    tasks: [
      {
        id: "l1",
        text: "Submit grant application (AHRQ, ACR REF, or institutional pilot)",
        type: "milestone",
        deadline: "January–February 2027",
        critical: false,
        pubOpp: "Grant writing IS scholarly output. AHRQ K-awards, ACR REF Innovative Research Award, or NIH R21 (digital health).",
        detail: "LOI first. Frame around ARIA validation or referral optimization in underserved settings. Leverage ANTHC institutional support and UW appointment.",
      },
      {
        id: "l2",
        text: "Submit ARIA methods/validation paper",
        type: "publication",
        deadline: "Dec 2026 – Jan 2027",
        critical: false,
        pubOpp: "Target: JAMIA (top health informatics), JMIR (open access, fast), or Applied Clinical Informatics.",
        detail: null,
      },
      {
        id: "l3",
        text: "Write the big review: 'AI in Rheumatology — State of the Art'",
        type: "publication",
        deadline: "February 2027",
        critical: false,
        pubOpp: "Pitch as invited review to Nature Reviews Rheumatology or Current Opinion in Rheumatology. If not invited, submit unsolicited. You'll have built 3 tools by now — cite your own work.",
        detail: "Scope: diagnostic AI, imaging AI, NLP for EHR, CDS tools, equity, regulatory landscape (cite FDA guidance you've read), future directions.",
      },
      {
        id: "l4",
        text: "Seek ACR AI/Digital Health task force or working group appointment",
        type: "milestone",
        deadline: "Express interest at Convergence + follow up",
        critical: false,
        pubOpp: "Committee → position statements → multi-author publications with national reach.",
        detail: null,
      },
      {
        id: "l5",
        text: "Develop workshop: 'AI Tools for the Practicing Rheumatologist'",
        type: "build",
        deadline: "March 2027",
        critical: false,
        pubOpp: "Submit as ACR Convergence 2027 workshop (session suggestions ~Dec). Also a MedEd paper for Academic Medicine or AC&R.",
        detail: "Content: hands-on with Claude/ChatGPT for clinical queries, AI-assisted lit review, understanding AI study design, MSKUS AI tools.",
      },
      {
        id: "l6",
        text: "12-month retrospective: catalog outputs, update CV, plan Year 2",
        type: "milestone",
        deadline: "March 2027",
        critical: false,
        pubOpp: null,
        detail: "Count everything: publications, presentations, tools launched, skills acquired, collaborations, grants submitted. Identify gaps.",
      },
      {
        id: "l-skill1",
        text: "🧠 SKILL: Grant writing for digital health (AHRQ, NIH, ACR REF)",
        type: "skill",
        deadline: "End of December",
        critical: false,
        pubOpp: null,
        detail: "Specific aims structure, significance/innovation/approach, budget justification. Resources: NIAID sample apps (free), NIH Grant Writing Academy. UW may offer workshops.",
      },
      {
        id: "l-skill2",
        text: "🧠 SKILL: Data visualization & storytelling with data",
        type: "skill",
        deadline: "End of January 2027",
        critical: false,
        pubOpp: null,
        detail: "For papers, presentations, grants. Read: Storytelling with Data (Knaflic). Learn matplotlib/seaborn basics or use Claude to generate figures from your data.",
      },
      {
        id: "l-skill3",
        text: "🧠 SKILL: Product thinking — scope, validate, ship clinical AI tools",
        type: "skill",
        deadline: "End of February 2027",
        critical: false,
        pubOpp: "Feeds your workshop and grants. Understanding build-measure-learn for clinical software.",
        detail: "You've been doing this intuitively. Formalize: read Lean Startup (Ries), Sprint (Knapp). Understand user research, MVP thinking, clinical validation design.",
      },
    ],
  },
];

const PUBLICATION_TRACKER = [
  { id: "p1", title: "AI Equity / Indigenous Data Governance", target: "Arthritis Care & Research", status: "drafting", type: "Original Research", phase: 1 },
  { id: "p2", title: "CTD-ILD Resubmission (disparities frame)", target: "J Clinical Rheumatology", status: "drafting", type: "Original Research", phase: 1 },
  { id: "p3", title: "ACR Abstract — ARIA Framework", target: "ACR Convergence 2026", status: "idea", type: "Abstract", phase: 1 },
  { id: "p4", title: "ACR Abstract — Referral Optimization", target: "ACR Convergence 2026", status: "idea", type: "Abstract", phase: 1 },
  { id: "p5", title: "Harvard Capstone → Commentary", target: "Health Informatics Journal", status: "idea", type: "Commentary", phase: 1 },
  { id: "p6", title: "AI + Workforce Crisis Editorial", target: "The Rheumatologist / ACR Open", status: "idea", type: "Editorial", phase: 2 },
  { id: "p7", title: "MSKUS Education Platform Paper", target: "RMD Open / J Rheumatology", status: "idea", type: "MedEd Paper", phase: 2 },
  { id: "p8", title: "RheumReferral Implementation Report", target: "TBD", status: "idea", type: "Short Report", phase: 2 },
  { id: "p9", title: "ACR MSKUS Position Statement Update", target: "ACR / A&R", status: "idea", type: "Position Statement", phase: 2 },
  { id: "p10", title: "AI Equity in Indigenous Health (Perspective)", target: "NEJM Catalyst / Lancet DH", status: "idea", type: "Perspective", phase: 3 },
  { id: "p11", title: "ACR Late-Breaking Abstract", target: "ACR Convergence 2026", status: "idea", type: "Abstract", phase: 3 },
  { id: "p12", title: "ARIA Methods & Validation Paper", target: "JAMIA / JMIR", status: "idea", type: "Methods Paper", phase: 4 },
  { id: "p13", title: "State-of-the-Art Review: AI in Rheumatology", target: "Nat Rev Rheumatol / Curr Opin", status: "idea", type: "Review Article", phase: 4 },
];

const STATUS_OPTIONS = ["idea", "outlining", "drafting", "submitted", "revision", "accepted", "published"];
const STATUS_META = {
  idea: { bg: "#f0f0f0", text: "#666", label: "Idea" },
  outlining: { bg: "#e8f4fd", text: "#0c5a8a", label: "Outlining" },
  drafting: { bg: "#fff3cd", text: "#856404", label: "Drafting" },
  submitted: { bg: "#cce5ff", text: "#004085", label: "Submitted" },
  revision: { bg: "#e2d5f1", text: "#5b2c8e", label: "In Revision" },
  accepted: { bg: "#d4edda", text: "#155724", label: "Accepted" },
  published: { bg: "#155724", text: "#fff", label: "Published ✓" },
};

const TYPE_ICONS = { milestone: "◆", publication: "✎", build: "⚙", skill: "🧠" };

const SKILL_TRACK = [
  { id: "s1", name: "Python Basics", phase: 1, resource: "Codecademy or Harvard CS50P (free)", hours: "2 hrs/week", why: "Read notebooks, understand data science code, run basic analyses" },
  { id: "s2", name: "FDA AI/ML Regulatory Landscape", phase: 1, resource: "FDA.gov guidance documents (free)", hours: "3–4 hrs total", why: "Credibility in commentaries and grant applications" },
  { id: "s3", name: "ML Fundamentals (concepts, not coding)", phase: 2, resource: "Andrew Ng's ML Specialization (Coursera)", hours: "2 hrs/week", why: "Speak the language of AI research fluently at conferences and in papers" },
  { id: "s4", name: "Prompt Engineering & AI Tool Fluency", phase: 2, resource: "Anthropic prompt guide + practice", hours: "Ongoing", why: "Formalize your intuition into a teachable, publishable skill" },
  { id: "s5", name: "FHIR & CDS Hooks (Health Interoperability)", phase: 2, resource: "HL7 FHIR overview + Logica sandbox", hours: "1 hr/week", why: "Needed if ARIA or any tool will plug into EHRs" },
  { id: "s6", name: "NLP Concepts (tokenization, embeddings, transformers)", phase: 3, resource: "Hugging Face NLP course (free)", hours: "2 hrs/week", why: "Most clinical AI involves text — notes, referrals, reports" },
  { id: "s7", name: "AI Ethics Frameworks", phase: 3, resource: "NIST AI RMF + WHO guidance + CARE Principles", hours: "4–5 hrs total", why: "Rigor and depth in your equity publications" },
  { id: "s8", name: "Grant Writing for Digital Health", phase: 4, resource: "NIAID samples + NIH workshops (free)", hours: "5–6 hrs total", why: "Unlock AHRQ, NIH, ACR REF funding for your projects" },
  { id: "s9", name: "Data Visualization & Storytelling", phase: 4, resource: "Storytelling with Data (book) + matplotlib", hours: "1 hr/week", why: "Better figures in papers, presentations, and grant applications" },
  { id: "s10", name: "Product & Deployment Thinking", phase: 4, resource: "Lean Startup + Sprint (books)", hours: "5–6 hrs total", why: "Ship clinical tools that get adopted, not just built" },
];

function getMonthLabel() { return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }); }
function getCurrentPhaseIndex() {
  const now = new Date();
  if (now < new Date("2026-06-01")) return 0;
  if (now < new Date("2026-09-01")) return 1;
  if (now < new Date("2026-12-01")) return 2;
  return 3;
}
function daysUntil(d) { return Math.max(0, Math.ceil((new Date(d) - new Date()) / 86400000)); }

export default function App() {
  const [completed, setCompleted] = useState({});
  const [pubStatuses, setPubStatuses] = useState({});
  const [activeTab, setActiveTab] = useState("now");
  const [expandedTask, setExpandedTask] = useState(null);
  const [notes, setNotes] = useState({});
  const [skillDone, setSkillDone] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) { const d = JSON.parse(raw); setCompleted(d.c || {}); setPubStatuses(d.p || {}); setNotes(d.n || {}); setSkillDone(d.s || {}); }
    } catch(e) {}
    setLoaded(true);
  }, []);

  const save = useCallback((c, p, n, s) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ c, p, n, s })); } catch(e) {}
  }, []);

  const toggle = id => { const x = { ...completed, [id]: !completed[id] }; setCompleted(x); save(x, pubStatuses, notes, skillDone); };
  const toggleSk = id => { const x = { ...skillDone, [id]: !skillDone[id] }; setSkillDone(x); save(completed, pubStatuses, notes, x); };
  const updatePub = (id, v) => { const x = { ...pubStatuses, [id]: v }; setPubStatuses(x); save(completed, x, notes, skillDone); };
  const updateNote = (id, v) => { const x = { ...notes, [id]: v }; setNotes(x); save(completed, pubStatuses, x, skillDone); };

  const cp = getCurrentPhaseIndex();
  const total = PHASES.reduce((a, p) => a + p.tasks.length, 0);
  const done = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);
  const pubsActive = PUBLICATION_TRACKER.filter(p => ["outlining","drafting","submitted","revision"].includes(pubStatuses[p.id] || p.status)).length;
  const pubsDone = PUBLICATION_TRACKER.filter(p => ["accepted","published"].includes(pubStatuses[p.id] || p.status)).length;
  const skDone = Object.values(skillDone).filter(Boolean).length;

  if (!loaded) return <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", fontFamily:"'DM Sans',sans-serif", color:"#999" }}>Loading...</div>;

  const T = t => ({
    padding:"9px 14px", border:"none", background:"transparent", fontSize:13,
    fontWeight: activeTab===t?700:400, color: activeTab===t?"var(--text-color,#1a1a1a)":"var(--text-color-secondary,#999)",
    cursor:"pointer", borderBottom: activeTab===t?"2px solid var(--text-color,#1a1a1a)":"2px solid transparent",
    marginBottom:-2, fontFamily:"'DM Sans',sans-serif"
  });

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", maxWidth:920, margin:"0 auto", padding:"24px 16px", minHeight:"100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Instrument+Serif&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={{ marginBottom:28, borderBottom:"3px solid var(--text-color,#1a1a1a)", paddingBottom:20 }}>
        <h1 style={{ fontFamily:"'Instrument Serif',serif", fontSize:36, margin:0, lineHeight:1.1, color:"var(--text-color,#1a1a1a)" }}>AI × Rheumatology</h1>
        <p style={{ fontSize:14, color:"var(--text-color-secondary,#666)", margin:"4px 0 0", letterSpacing:"0.02em" }}>12-Month Thought Leadership Pathway · Vivek Mehta, MD</p>
      </div>

      {/* Countdown Banners */}
      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        {daysUntil("2026-05-15") > 0 && daysUntil("2026-05-15") <= 90 && (
          <div style={{ flex:1, minWidth:170, background: daysUntil("2026-05-15")<=14?"#fef2f2":"#fffbeb", border: daysUntil("2026-05-15")<=14?"1px solid #fca5a5":"1px solid #fde68a", borderRadius:8, padding:"10px 14px" }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", color: daysUntil("2026-05-15")<=14?"#dc2626":"#d97706", letterSpacing:"0.05em" }}>EB-1A RFE</div>
            <div style={{ fontSize:22, fontWeight:700, color:"var(--text-color,#1a1a1a)" }}>{daysUntil("2026-05-15")}d</div>
            <div style={{ fontSize:10, color:"var(--text-color-secondary,#888)" }}>May 15, 2026</div>
          </div>
        )}
        {daysUntil("2026-05-13") > 0 && daysUntil("2026-05-13") <= 90 && (
          <div style={{ flex:1, minWidth:170, background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:8, padding:"10px 14px" }}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", color:"#0369a1", letterSpacing:"0.05em" }}>ACR Abstracts</div>
            <div style={{ fontSize:22, fontWeight:700, color:"var(--text-color,#1a1a1a)" }}>{daysUntil("2026-05-13")}d</div>
            <div style={{ fontSize:10, color:"var(--text-color-secondary,#888)" }}>~May 13 (est.)</div>
          </div>
        )}
        <div style={{ flex:1, minWidth:170, background:"var(--card-bg,#f8f7f4)", border:"1px solid var(--border-color,#e5e2db)", borderRadius:8, padding:"10px 14px" }}>
          <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", color:"var(--text-color-secondary,#999)", letterSpacing:"0.05em" }}>ACR Convergence</div>
          <div style={{ fontSize:22, fontWeight:700, color:"var(--text-color,#1a1a1a)" }}>{daysUntil("2026-11-06")}d</div>
          <div style={{ fontSize:10, color:"var(--text-color-secondary,#888)" }}>Nov 6–11, Orlando</div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:18 }}>
        {[
          { l:"Progress", v:`${pct}%`, s:`${done}/${total}` },
          { l:"Phase", v:PHASES[cp].phase, s:PHASES[cp].months },
          { l:"Pubs Active", v:pubsActive, s:"in pipeline" },
          { l:"Published", v:pubsDone, s:"articles" },
          { l:"Skills", v:`${skDone}/10`, s:"learned" },
        ].map((x,i)=>(
          <div key={i} style={{ background:"var(--card-bg,#f8f7f4)", borderRadius:8, padding:"10px 12px", border:"1px solid var(--border-color,#e5e2db)" }}>
            <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:"0.08em", color:"var(--text-color-secondary,#999)" }}>{x.l}</div>
            <div style={{ fontSize:22, fontWeight:700, color:"var(--text-color,#1a1a1a)", lineHeight:1.2 }}>{x.v}</div>
            <div style={{ fontSize:10, color:"var(--text-color-secondary,#888)" }}>{x.s}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ background:"var(--card-bg,#e8e5df)", borderRadius:20, height:7, marginBottom:22, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#2e86ab,#a855f7,#10b981,#f59e0b)", borderRadius:20, transition:"width 0.5s" }}/>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, marginBottom:20, borderBottom:"2px solid var(--border-color,#e5e2db)", flexWrap:"wrap" }}>
        <button style={T("now")} onClick={()=>setActiveTab("now")}>⏰ Now</button>
        <button style={T("pathway")} onClick={()=>setActiveTab("pathway")}>🗺️ Pathway</button>
        <button style={T("pubs")} onClick={()=>setActiveTab("pubs")}>📝 Pubs</button>
        <button style={T("skills")} onClick={()=>setActiveTab("skills")}>🧠 Skills</button>
        <button style={T("calendar")} onClick={()=>setActiveTab("calendar")}>📅 Dates</button>
      </div>

      {/* ===== DO NOW ===== */}
      {activeTab==="now" && (<div>
        <div style={{ background:PHASES[cp].color, color:"#fff", borderRadius:12, padding:22, marginBottom:18 }}>
          <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", opacity:0.7, marginBottom:3 }}>Current Focus — {PHASES[cp].months}</div>
          <h2 style={{ fontFamily:"'Instrument Serif',serif", fontSize:24, margin:"0 0 6px", fontWeight:400 }}>{PHASES[cp].phase}: {PHASES[cp].title}</h2>
          <p style={{ margin:0, fontSize:13, opacity:0.85, lineHeight:1.5 }}>{PHASES[cp].description}</p>
          {PHASES[cp].urgentNote && <div style={{ marginTop:10, padding:"7px 12px", background:"rgba(255,255,255,0.15)", borderRadius:8, fontSize:12, fontWeight:600 }}>🔥 {PHASES[cp].urgentNote}</div>}
        </div>

        <h3 style={{ fontFamily:"'Instrument Serif',serif", fontSize:18, margin:"0 0 10px", color:"var(--text-color,#1a1a1a)" }}>Remaining Tasks</h3>
        {PHASES[cp].tasks.filter(t=>!completed[t.id]).map(task=>(
          <div key={task.id} style={{ padding:"10px 14px", marginBottom:6, borderRadius:8, display:"flex", alignItems:"flex-start", gap:10,
            background: task.critical?`${PHASES[cp].accent}11`:"var(--card-bg,#fff)",
            border: task.critical?`2px solid ${PHASES[cp].accent}`:"1px solid var(--border-color,#e5e2db)" }}>
            <button onClick={()=>toggle(task.id)} style={{ width:18, height:18, minWidth:18, borderRadius:4, border:`2px solid ${PHASES[cp].accent}`, background:"transparent", cursor:"pointer", marginTop:2 }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, color:"var(--text-color,#333)", lineHeight:1.4 }}>
                <span style={{ marginRight:5, fontSize:11, opacity:0.5 }}>{TYPE_ICONS[task.type]}</span>{task.text}
                {task.critical && <span style={{ marginLeft:6, background:"#ef4444", color:"#fff", fontSize:9, padding:"1px 5px", borderRadius:10, fontWeight:700 }}>DEADLINE</span>}
              </div>
              {task.deadline && <div style={{ fontSize:11, color:"var(--text-color-secondary,#888)", marginTop:1 }}>📅 {task.deadline}</div>}
            </div>
          </div>
        ))}
        {PHASES[cp].tasks.filter(t=>!completed[t.id]).length===0 && <div style={{ padding:20, textAlign:"center", color:PHASES[cp].accent, fontSize:15, fontWeight:600 }}>🎉 Phase complete!</div>}

        <h3 style={{ fontFamily:"'Instrument Serif',serif", fontSize:18, margin:"24px 0 10px", color:"var(--text-color,#1a1a1a)" }}>Guiding Principles</h3>
        {[
          { e:"🔬", t:"Every tool you build is a paper you haven't written yet." },
          { e:"🏔️", t:"Your Alaska + Indigenous health lens is your moat. Lead with it." },
          { e:"✍️", t:"2 hrs/week protected writing. Block it like clinic." },
          { e:"🤝", t:"One collaboration > three solo projects." },
          { e:"📣", t:"If you built it but didn't publish it, it didn't happen." },
          { e:"🧠", t:"Concepts before syntax. Understanding ML > memorizing Python." },
        ].map((p,i)=>(
          <div key={i} style={{ padding:"8px 12px", background:"var(--card-bg,#f8f7f4)", borderRadius:7, fontSize:12, color:"var(--text-color,#444)", lineHeight:1.5, border:"1px solid var(--border-color,#e5e2db)", marginBottom:5 }}>
            <span style={{ marginRight:6 }}>{p.e}</span>{p.t}
          </div>
        ))}
      </div>)}

      {/* ===== PATHWAY ===== */}
      {activeTab==="pathway" && (<div>
        {PHASES.map((phase,pi)=>{
          const pD=phase.tasks.filter(t=>completed[t.id]).length;
          const pP=Math.round((pD/phase.tasks.length)*100);
          const cur=pi===cp;
          return (<div key={phase.id} style={{ marginBottom:18, border:cur?`2px solid ${phase.accent}`:"1px solid var(--border-color,#e5e2db)", borderRadius:12, overflow:"hidden", background:"var(--card-bg,#fff)" }}>
            <div style={{ padding:"12px 16px", background:cur?phase.color:"var(--card-bg,#f8f7f4)", color:cur?"#fff":"var(--text-color,#1a1a1a)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:6 }}>
              <div><span style={{ fontSize:16, marginRight:6 }}>{phase.icon}</span><span style={{ fontWeight:700, fontSize:14 }}>{phase.phase}: {phase.title}</span><span style={{ marginLeft:8, fontSize:11, opacity:0.8 }}>{phase.months}</span>
                {cur && <span style={{ marginLeft:8, background:"rgba(255,255,255,0.25)", padding:"2px 7px", borderRadius:20, fontSize:9, fontWeight:700, textTransform:"uppercase" }}>NOW</span>}
              </div>
              <span style={{ fontSize:12, fontWeight:600, opacity:0.9 }}>{pD}/{phase.tasks.length} ({pP}%)</span>
            </div>
            <div style={{ padding:"8px 16px", fontSize:12, color:"var(--text-color-secondary,#777)", borderBottom:"1px solid var(--border-color,#eee)" }}>{phase.description}</div>
            {phase.tasks.map(task=>{
              const exp=expandedTask===task.id;
              return (<div key={task.id} style={{ borderBottom:"1px solid var(--border-color,#f0ede8)", background:completed[task.id]?"var(--card-bg,#f9f9f6)":task.critical?`${phase.accent}06`:"transparent" }}>
                <div style={{ padding:"9px 16px", display:"flex", alignItems:"flex-start", gap:10, cursor:"pointer" }} onClick={()=>setExpandedTask(exp?null:task.id)}>
                  <button onClick={e=>{e.stopPropagation();toggle(task.id)}} style={{ width:18, height:18, minWidth:18, borderRadius:4, border:completed[task.id]?`2px solid ${phase.accent}`:"2px solid var(--border-color,#ccc)", background:completed[task.id]?phase.accent:"transparent", color:"#fff", fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginTop:1, fontFamily:"system-ui" }}>{completed[task.id]?"✓":""}</button>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12.5, color:completed[task.id]?"var(--text-color-secondary,#aaa)":"var(--text-color,#333)", textDecoration:completed[task.id]?"line-through":"none", lineHeight:1.4 }}>
                      <span style={{ marginRight:4, fontSize:10, opacity:0.5 }}>{TYPE_ICONS[task.type]}</span>{task.text}
                      {task.critical && <span style={{ marginLeft:5, background:"#ef4444", color:"#fff", fontSize:8, padding:"1px 4px", borderRadius:10, fontWeight:700 }}>!</span>}
                    </div>
                    {task.deadline && <div style={{ fontSize:10, color:"var(--text-color-secondary,#aaa)", marginTop:1 }}>📅 {task.deadline}</div>}
                  </div>
                </div>
                {exp && (<div style={{ padding:"0 16px 12px 44px" }}>
                  {task.pubOpp && <div style={{ background:`${phase.accent}11`, border:`1px solid ${phase.accent}33`, borderRadius:7, padding:"7px 11px", fontSize:11.5, color:"var(--text-color,#444)", lineHeight:1.5, marginBottom:6 }}><strong style={{ color:phase.accent }}>📄 Pub path:</strong> {task.pubOpp}</div>}
                  {task.detail && <div style={{ fontSize:11.5, color:"var(--text-color-secondary,#666)", lineHeight:1.5, marginBottom:6 }}>{task.detail}</div>}
                  <textarea placeholder="Notes..." value={notes[task.id]||""} onChange={e=>updateNote(task.id,e.target.value)} style={{ width:"100%", minHeight:44, border:"1px solid var(--border-color,#ddd)", borderRadius:6, padding:"5px 9px", fontSize:11, resize:"vertical", fontFamily:"'DM Sans',sans-serif", color:"var(--text-color,#333)", background:"var(--card-bg,#fff)", boxSizing:"border-box" }}/>
                </div>)}
              </div>);
            })}
          </div>);
        })}
      </div>)}

      {/* ===== PUBLICATIONS ===== */}
      {activeTab==="pubs" && (<div>
        <p style={{ fontSize:12, color:"var(--text-color-secondary,#777)", marginBottom:14, lineHeight:1.5 }}>13 publication targets mapped to your pathway. Track each from idea to published.</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:14 }}>
          {STATUS_OPTIONS.map(s=>{const c=PUBLICATION_TRACKER.filter(p=>(pubStatuses[p.id]||p.status)===s).length; return c>0?<span key={s} style={{ ...pill(s), fontSize:10, padding:"3px 8px" }}>{STATUS_META[s].label}: {c}</span>:null;})}
        </div>
        {[1,2,3,4].map(ph=>{
          const pubs=PUBLICATION_TRACKER.filter(p=>p.phase===ph);
          return (<div key={ph} style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:PHASES[ph-1].accent, marginBottom:6 }}>{PHASES[ph-1].icon} {PHASES[ph-1].phase}: {PHASES[ph-1].title}</div>
            {pubs.map(pub=>{const st=pubStatuses[pub.id]||pub.status; return (
              <div key={pub.id} style={{ border:"1px solid var(--border-color,#e5e2db)", borderRadius:8, padding:"10px 14px", marginBottom:6, background:"var(--card-bg,#fff)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:5 }}>
                <div style={{ flex:1, minWidth:160 }}>
                  <div style={{ fontWeight:600, fontSize:12.5, color:"var(--text-color,#333)", marginBottom:1 }}>{pub.title}</div>
                  <div style={{ fontSize:10.5, color:"var(--text-color-secondary,#888)" }}>{pub.type} · {pub.target}</div>
                </div>
                <select value={st} onChange={e=>updatePub(pub.id,e.target.value)} style={{ ...pill(st), border:"none", borderRadius:20, padding:"3px 10px", fontSize:10.5, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", appearance:"none", WebkitAppearance:"none", textAlign:"center", minWidth:85 }}>
                  {STATUS_OPTIONS.map(s=><option key={s} value={s}>{STATUS_META[s].label}</option>)}
                </select>
              </div>
            );})}
          </div>);
        })}
      </div>)}

      {/* ===== SKILLS ===== */}
      {activeTab==="skills" && (<div>
        <p style={{ fontSize:12, color:"var(--text-color-secondary,#777)", marginBottom:6, lineHeight:1.5 }}>
          You don't need to become an engineer. You need to be the rheumatologist who speaks AI fluently — in papers, at conferences, with collaborators and funders.
        </p>
        <div style={{ background:"var(--card-bg,#f8f7f4)", borderRadius:8, padding:"8px 12px", marginBottom:16, border:"1px solid var(--border-color,#e5e2db)", fontSize:12, color:"var(--text-color,#555)" }}>
          <strong>{skDone}/10</strong> skills completed · ~3–4 hrs/week total commitment
        </div>
        {[1,2,3,4].map(ph=>{const sks=SKILL_TRACK.filter(s=>s.phase===ph); return (
          <div key={ph} style={{ marginBottom:18 }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:PHASES[ph-1].accent, marginBottom:8 }}>{PHASES[ph-1].icon} {PHASES[ph-1].phase} · {PHASES[ph-1].months}</div>
            {sks.map(sk=>(
              <div key={sk.id} style={{ border:"1px solid var(--border-color,#e5e2db)", borderRadius:8, padding:"12px 14px", marginBottom:6, background:skillDone[sk.id]?"var(--card-bg,#f9f9f6)":"var(--card-bg,#fff)", display:"flex", gap:10, alignItems:"flex-start" }}>
                <button onClick={()=>toggleSk(sk.id)} style={{ width:20, height:20, minWidth:20, borderRadius:5, border:skillDone[sk.id]?`2px solid ${PHASES[ph-1].accent}`:"2px solid var(--border-color,#ccc)", background:skillDone[sk.id]?PHASES[ph-1].accent:"transparent", color:"#fff", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginTop:1, fontFamily:"system-ui" }}>{skillDone[sk.id]?"✓":""}</button>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:13, color:skillDone[sk.id]?"var(--text-color-secondary,#aaa)":"var(--text-color,#333)", textDecoration:skillDone[sk.id]?"line-through":"none" }}>{sk.name}</div>
                  <div style={{ fontSize:11, color:"var(--text-color-secondary,#888)", marginTop:2, lineHeight:1.4 }}><strong>Why:</strong> {sk.why}</div>
                  <div style={{ fontSize:11, color:"var(--text-color-secondary,#888)", marginTop:1 }}><strong>How:</strong> {sk.resource} · {sk.hours}</div>
                </div>
              </div>
            ))}
          </div>
        );})}
      </div>)}

      {/* ===== CALENDAR ===== */}
      {activeTab==="calendar" && (<div>
        <h3 style={{ fontFamily:"'Instrument Serif',serif", fontSize:18, margin:"0 0 12px", color:"var(--text-color,#1a1a1a)" }}>Hard Deadlines</h3>
        {[
          { date:"~May 13, 2026", item:"ACR Convergence abstract submission (est.)", urg:"critical", note:"Based on 2025 deadline of May 13. 2026 TBD — monitor rheumatology.org" },
          { date:"May 15, 2026", item:"EB-1A RFE response to USCIS", urg:"critical", note:"Case IOE0935418185 · Jason Crofts, Peak Immigration Law" },
          { date:"~October 2026", item:"ACR late-breaking abstract deadline", urg:"high", note:"Backup window if May submissions miss or new data emerges from ARIA pilot" },
          { date:"Nov 6–11, 2026", item:"ACR Convergence 2026 — Orlando, FL", urg:"high", note:"Present, network, lock in collaborations, attend AI-focused sessions" },
          { date:"~December 2026", item:"ACR 2027 session suggestions deadline", urg:"medium", note:"Submit your AI workshop proposal early" },
          { date:"Jan–Feb 2027", item:"Grant submission window (AHRQ / ACR REF / NIH R21)", urg:"medium", note:"Multiple cycles — check specific FOA deadlines" },
        ].map((d,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 12px", borderBottom:"1px solid var(--border-color,#f0ede8)" }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:d.urg==="critical"?"#ef4444":d.urg==="high"?"#f59e0b":"#94a3b8", minWidth:8, marginTop:4 }}/>
            <div><div style={{ fontWeight:700, fontSize:12, color:"var(--text-color,#333)" }}>{d.date}</div><div style={{ fontSize:13, color:"var(--text-color,#555)", marginTop:1 }}>{d.item}</div>{d.note&&<div style={{ fontSize:10, color:"var(--text-color-secondary,#999)", marginTop:1 }}>{d.note}</div>}</div>
          </div>
        ))}

        <h3 style={{ fontFamily:"'Instrument Serif',serif", fontSize:18, margin:"24px 0 12px", color:"var(--text-color,#1a1a1a)" }}>Recurring Rhythms</h3>
        {[
          { f:"Weekly", item:"2 hrs protected writing time (block like clinic)", c:"#2e86ab" },
          { f:"Weekly", item:"2–3 hrs AI skills learning", c:"#2e86ab" },
          { f:"Weekly", item:"1 LinkedIn post (start Phase 3)", c:"#2e86ab" },
          { f:"Biweekly", item:"Move 1+ publication forward in pipeline", c:"#a855f7" },
          { f:"Monthly", item:"Review this tracker & update statuses", c:"#10b981" },
          { f:"Monthly", item:"Read 2 recent AI-in-rheumatology papers", c:"#10b981" },
          { f:"Quarterly", item:"Reassess goals & seek new collaborations", c:"#f59e0b" },
        ].map((d,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderBottom:"1px solid var(--border-color,#f0ede8)" }}>
            <span style={{ fontSize:11, fontWeight:700, color:d.c, minWidth:70 }}>{d.f}</span>
            <span style={{ fontSize:12, color:"var(--text-color,#444)" }}>{d.item}</span>
          </div>
        ))}
      </div>)}

      <div style={{ marginTop:32, padding:"12px 0", borderTop:"1px solid var(--border-color,#e5e2db)", textAlign:"center", fontSize:9, color:"var(--text-color-secondary,#bbb)" }}>
        Saves across sessions · {total} tasks · {PUBLICATION_TRACKER.length} pubs · {SKILL_TRACK.length} skills · {getMonthLabel()}
      </div>
    </div>
  );
}

function pill(s) { const m=STATUS_META[s]||STATUS_META.idea; return { background:m.bg, color:m.text }; }
