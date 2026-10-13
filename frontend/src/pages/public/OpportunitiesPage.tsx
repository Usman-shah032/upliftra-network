import { useMemo, useRef, useState, type FormEvent } from "react";

type Category =
  | "All"
  | "Jobs"
  | "Internships"
  | "Scholarships"
  | "Fellowships"
  | "Workshops"
  | "Competitions";

type Opportunity = {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  field: string;
  level: string;
  location: string;
  format: string;
  summary: string;
  description: string;
  eligibility: string;
  skills: string[];
  benefits: string[];
  deadline: string;
};

const categories: Category[] = [
  "All",
  "Jobs",
  "Internships",
  "Scholarships",
  "Fellowships",
  "Workshops",
  "Competitions",
];

const styles: Record<string, string> = {
  Jobs: "bg-blue-50 text-blue-700",
  Internships: "bg-violet-50 text-violet-700",
  Scholarships: "bg-emerald-50 text-emerald-700",
  Fellowships: "bg-amber-50 text-amber-800",
  Workshops: "bg-indigo-50 text-indigo-700",
  Competitions: "bg-rose-50 text-rose-700",
};

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Junior Software Developer",
    category: "Jobs",
    field: "Software Engineering",
    level: "Entry-Level Role",
    location: "Pakistan",
    format: "On-site / Hybrid",
    summary:
      "Start a career building, testing and maintaining software applications.",
    description:
      "Junior software developers implement features, fix bugs, test applications and collaborate with development teams.",
    eligibility:
      "Programming fundamentals, problem-solving skills and personal projects are useful. Employers may require a relevant degree or equivalent experience.",
    skills: ["JavaScript", "TypeScript", "React", "Git"],
    benefits: [
      "Professional development experience",
      "Team collaboration",
      "Portfolio projects",
    ],
    deadline: "Depends on employer",
  },
  {
    id: 2,
    title: "Frontend Developer Internship",
    category: "Internships",
    field: "Web Development",
    level: "Student / Graduate Internship",
    location: "Pakistan / Worldwide",
    format: "Remote / On-site",
    summary:
      "Gain experience creating responsive websites and interactive interfaces.",
    description:
      "Frontend interns work with HTML, CSS, JavaScript and frameworks to implement designs and integrate APIs.",
    eligibility:
      "Suitable for students and recent graduates with foundational web development knowledge. Requirements vary by provider.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    benefits: [
      "Practical coding experience",
      "Portfolio development",
      "Team workflows",
    ],
    deadline: "Depends on provider",
  },
  {
    id: 3,
    title: "Junior Data Analyst",
    category: "Jobs",
    field: "Data Analytics",
    level: "Entry-Level Role",
    location: "Pakistan / Worldwide",
    format: "Remote / Hybrid / On-site",
    summary:
      "Explore data analysis, reporting and business intelligence career opportunities.",
    description:
      "Data analysts clean data, identify trends, prepare reports and create dashboards to support business decisions.",
    eligibility:
      "Analytical thinking and spreadsheet skills are useful. SQL, visualization tools or a relevant degree may be required.",
    skills: ["Excel", "SQL", "Python", "Power BI"],
    benefits: [
      "Data analysis experience",
      "Dashboard projects",
      "Reporting skills",
    ],
    deadline: "Depends on employer",
  },
  {
    id: 4,
    title: "Cloud Engineering Internship",
    category: "Internships",
    field: "Cloud Computing",
    level: "Student / Graduate Internship",
    location: "Pakistan / Worldwide",
    format: "Remote / Hybrid",
    summary:
      "Learn cloud infrastructure, deployment, monitoring and automation.",
    description:
      "Cloud interns may assist with deploying applications, managing cloud resources and troubleshooting infrastructure.",
    eligibility:
      "Basic networking, Linux and operating-system knowledge is beneficial. Cloud requirements vary by provider.",
    skills: ["AWS", "Azure", "Linux", "Docker"],
    benefits: [
      "Cloud platform experience",
      "Deployment practice",
      "Infrastructure knowledge",
    ],
    deadline: "Depends on provider",
  },
  {
    id: 5,
    title: "Junior Cybersecurity Analyst",
    category: "Jobs",
    field: "Cybersecurity",
    level: "Entry-Level Security Role",
    location: "Pakistan / Worldwide",
    format: "On-site / Hybrid / Remote",
    summary:
      "Explore security monitoring, incident investigation and SOC career paths.",
    description:
      "Security analysts review alerts, investigate suspicious activity, document incidents and help protect systems.",
    eligibility:
      "Networking and operating-system fundamentals are useful. Employers may require security knowledge, certifications or shift availability.",
    skills: ["Networking", "Linux", "SIEM", "Incident Response"],
    benefits: [
      "Security investigation skills",
      "Monitoring experience",
      "Practical security labs",
    ],
    deadline: "Depends on employer",
  },
  {
    id: 6,
    title: "AI and Machine Learning Internship",
    category: "Internships",
    field: "Artificial Intelligence",
    level: "Student / Graduate Internship",
    location: "Pakistan / Worldwide",
    format: "Remote / Hybrid",
    summary:
      "Explore AI applications, machine learning experiments and data preparation.",
    description:
      "Interns may prepare datasets, test models, evaluate results and integrate AI capabilities into applications.",
    eligibility:
      "Python and analytical thinking are useful. Some programs require mathematics, statistics or machine learning fundamentals.",
    skills: ["Python", "Machine Learning", "Data Analysis", "APIs"],
    benefits: [
      "AI project experience",
      "Model evaluation",
      "Portfolio development",
    ],
    deadline: "Depends on provider",
  },
  {
    id: 7,
    title: "Undergraduate Scholarship Opportunities",
    category: "Scholarships",
    field: "Undergraduate Education",
    level: "Undergraduate Applicants",
    location: "Pakistan / International",
    format: "Application-Based",
    summary:
      "Find funding pathways for eligible students pursuing undergraduate education.",
    description:
      "Undergraduate scholarships may cover tuition, living expenses or other educational costs according to the award.",
    eligibility:
      "Requirements may include academic results, financial need, nationality and admission to an eligible institution.",
    skills: ["Academic Planning", "Research", "Documentation"],
    benefits: [
      "Explore education funding",
      "Understand eligibility",
      "Plan applications",
    ],
    deadline: "Varies by scholarship",
  },
  {
    id: 8,
    title: "International Master's Scholarships",
    category: "Scholarships",
    field: "Postgraduate Education",
    level: "Master's Applicants",
    location: "International",
    format: "Application-Based",
    summary:
      "Explore financial support for eligible students planning postgraduate study abroad.",
    description:
      "Funding packages may include tuition, living stipends, travel support or research funding. Benefits vary by award.",
    eligibility:
      "May require a bachelor's degree, transcripts, language test results, references and a statement of purpose.",
    skills: ["Academic Research", "Application Writing", "Planning"],
    benefits: [
      "Explore international study",
      "Identify funding options",
      "Prepare application documents",
    ],
    deadline: "Varies by scholarship",
  },
  {
    id: 9,
    title: "Research Fellowship Opportunities",
    category: "Fellowships",
    field: "Research and Innovation",
    level: "Eligible Research Applicants",
    location: "Pakistan / International",
    format: "Program-Dependent",
    summary:
      "Explore structured research programs, specialist training and mentorship.",
    description:
      "Research fellows may work on projects, collaborate with experts and develop subject-specific research skills.",
    eligibility:
      "Criteria depend on the program. Some accept undergraduate applicants, while others require postgraduate qualifications or experience.",
    skills: ["Research Methods", "Technical Writing", "Critical Thinking"],
    benefits: [
      "Research experience",
      "Expert mentorship",
      "Professional development",
    ],
    deadline: "Varies by program",
  },
  {
    id: 10,
    title: "Cloud and DevOps Hands-On Workshop",
    category: "Workshops",
    field: "Cloud Engineering",
    level: "All Suitable Skill Levels",
    location: "Pakistan / Worldwide",
    format: "Online / On-site",
    summary:
      "Learn cloud deployment, containers and automation through practical exercises.",
    description:
      "A workshop may cover cloud fundamentals, Docker, deployment pipelines and infrastructure monitoring.",
    eligibility:
      "Basic computer knowledge is a useful starting point. Linux and networking knowledge may help with advanced exercises.",
    skills: ["AWS", "Docker", "CI/CD", "Linux"],
    benefits: [
      "Hands-on learning",
      "Deployment practice",
      "Cloud career guidance",
    ],
    deadline: "Depends on organizer",
  },
  {
    id: 11,
    title: "Building AI Agents and Automation",
    category: "Workshops",
    field: "AI and Workflow Automation",
    level: "All Suitable Skill Levels",
    location: "Online / Pakistan",
    format: "Online",
    summary:
      "Explore AI agents, automated workflows and practical AI applications.",
    description:
      "Participants learn how AI agents use tools, connect workflows and support real-world tasks. Content depends on the session.",
    eligibility:
      "A general interest in technology is enough to begin. Coding may be needed for advanced implementations.",
    skills: ["AI Tools", "Prompt Design", "APIs", "Automation"],
    benefits: [
      "Understand AI agents",
      "Explore automation",
      "Develop project ideas",
    ],
    deadline: "Depends on organizer",
  },
  {
    id: 12,
    title: "Professional Communication and Interview Skills",
    category: "Workshops",
    field: "Career Development",
    level: "Students and Job Seekers",
    location: "Pakistan / Worldwide",
    format: "Online / On-site",
    summary:
      "Improve workplace communication, interview preparation and presentation skills.",
    description:
      "Sessions may include professional introductions, interview practice, presentations, teamwork and workplace etiquette.",
    eligibility:
      "Suitable for students, graduates and job seekers who want to improve professional communication.",
    skills: ["Communication", "Presentation", "Teamwork", "Interview Skills"],
    benefits: [
      "Interview preparation",
      "Clearer communication",
      "Workplace confidence",
    ],
    deadline: "Depends on organizer",
  },
  {
    id: 13,
    title: "Student Innovation Competition",
    category: "Competitions",
    field: "Technology and Innovation",
    level: "Eligible Student Teams",
    location: "Pakistan / International",
    format: "Online / On-site",
    summary:
      "Present innovative ideas, prototypes and solutions to real-world problems.",
    description:
      "Participants develop ideas, create prototypes and present solutions according to competition rules.",
    eligibility:
      "Age, education, team size, location and project requirements depend on the organizer.",
    skills: ["Ideation", "Prototyping", "Presentation", "Teamwork"],
    benefits: [
      "Showcase innovation",
      "Build teamwork",
      "Present projects",
    ],
    deadline: "Varies by competition",
  },
  {
    id: 14,
    title: "Technology Hackathons",
    category: "Competitions",
    field: "Software and Product Development",
    level: "Eligible Individual or Team",
    location: "Pakistan / Worldwide",
    format: "Online / On-site",
    summary:
      "Build prototypes and solve technical challenges within a limited time.",
    description:
      "Hackathons may involve software development, design, research, pitching and product demonstrations.",
    eligibility:
      "Some events welcome beginners; others require particular skills, team structures or project submissions.",
    skills: ["Coding", "Problem Solving", "Prototyping", "Pitching"],
    benefits: [
      "Rapid product development",
      "Team collaboration",
      "Portfolio projects",
    ],
    deadline: "Varies by event",
  },
  {
    id: 15,
    title: "UI/UX Design Internship",
    category: "Internships",
    field: "Product and Interface Design",
    level: "Student / Graduate Internship",
    location: "Pakistan / Worldwide",
    format: "Remote / Hybrid",
    summary:
      "Explore user research, wireframing, prototyping and digital product design.",
    description:
      "Design interns may help create user flows, prototypes and interfaces while collaborating with developers and product teams.",
    eligibility:
      "Design fundamentals and a portfolio or sample projects are helpful. Tool requirements vary by provider.",
    skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
    benefits: [
      "Design portfolio",
      "User-centered design",
      "Product team experience",
    ],
    deadline: "Depends on provider",
  },
  {
    id: 16,
    title: "Digital Marketing Executive",
    category: "Jobs",
    field: "Digital Marketing",
    level: "Entry-Level Marketing Role",
    location: "Pakistan / Worldwide",
    format: "Remote / Hybrid / On-site",
    summary:
      "Explore roles in digital campaigns, content strategy and audience engagement.",
    description:
      "Digital marketing teams plan campaigns, publish content, study audience behavior and measure campaign performance.",
    eligibility:
      "Communication, creativity and analytical thinking are valuable. Some employers require experience with SEO or advertising platforms.",
    skills: ["SEO", "Content Strategy", "Analytics", "Social Media"],
    benefits: [
      "Campaign experience",
      "Marketing analytics",
      "Professional portfolio",
    ],
    deadline: "Depends on employer",
  },
  {
    id: 17,
    title: "Entrepreneurship Fellowship",
    category: "Fellowships",
    field: "Startups and Entrepreneurship",
    level: "Aspiring Entrepreneurs",
    location: "Pakistan / International",
    format: "Program-Dependent",
    summary:
      "Explore programs that help founders develop ideas, business skills and networks.",
    description:
      "Entrepreneurship fellowships may provide mentoring, structured learning, peer collaboration and startup development support.",
    eligibility:
      "Some programs accept early ideas; others require a prototype, business plan or established startup.",
    skills: ["Business Planning", "Market Research", "Pitching", "Networking"],
    benefits: [
      "Idea validation",
      "Business development",
      "Mentor connections",
    ],
    deadline: "Varies by program",
  },
  {
    id: 18,
    title: "Open-Source Contribution Programs",
    category: "Internships",
    field: "Software Engineering",
    level: "Beginner-Friendly to Advanced",
    location: "Worldwide",
    format: "Remote",
    summary:
      "Build a public portfolio by contributing to real software projects.",
    description:
      "Contributors improve code, fix issues, write documentation and collaborate with open-source communities. Some programs provide formal mentorship.",
    eligibility:
      "Beginners can start with documentation or suitable starter issues. Coding and Git skills depend on the contribution.",
    skills: ["Git", "GitHub", "Programming", "Documentation"],
    benefits: [
      "Public portfolio",
      "Collaborative development",
      "Project experience",
    ],
    deadline: "Varies by project",
  },
];

const aliases: Record<string, string> = {
  job: "jobs",
  internship: "internships",
  scholarship: "scholarships",
  fellowship: "fellowships",
  workshop: "workshops",
  competition: "competitions",
  hackathon: "competitions",
  developer: "software",
  programming: "software",
  ai: "artificial intelligence",
  cloud: "cloud",
  beginner: "entry-level",
  fresher: "entry-level",
  freshers: "entry-level",
  graduate: "graduate",
  remote: "remote",
  online: "online",
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function OpportunitiesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [level, setLevel] = useState("All levels");
  const [format, setFormat] = useState("All formats");
  const [selected, setSelected] = useState<Opportunity | null>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  const clearFilters = () => {
    setSearchInput("");
    setCategory("All");
    setLevel("All levels");
    setFormat("All formats");
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const filtered = useMemo(() => {
    const query = normalize(searchInput);
    const terms = query
      .split(" ")
      .filter(Boolean)
      .map((term) => aliases[term] || term);

    return opportunities.filter((item) => {
      const text = normalize(
        [
          item.title,
          item.category,
          item.field,
          item.level,
          item.location,
          item.format,
          item.summary,
          item.description,
          item.eligibility,
          item.deadline,
          ...item.skills,
          ...item.benefits,
        ].join(" "),
      );

      const matchesSearch =
        terms.length === 0 || terms.every((term) => text.includes(term));

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesLevel = level === "All levels" || item.level === level;

      const matchesFormat =
        format === "All formats" ||
        item.format.toLowerCase().includes(format.toLowerCase());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesFormat
      );
    });
  }, [searchInput, category, level, format]);

  const renderSkills = (items: string[]) => (
    <div className="flex flex-wrap gap-2">
      {items.map((skill) => (
        <span
          key={skill}
          className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
        >
          {skill}
        </span>
      ))}
    </div>
  );

  if (selected) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 px-4 py-10 text-white sm:px-8">
          <div className="mx-auto max-w-7xl">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mb-6 rounded-lg border border-white/30 px-4 py-2 text-sm hover:bg-white/10"
            >
              ← Back to Opportunities
            </button>

            <span className="rounded-full bg-white/15 px-3 py-1 text-sm">
              {selected.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
              {selected.title}
            </h1>

            <p className="mt-2 text-blue-100">{selected.field}</p>

            <p className="mt-4 max-w-3xl leading-7 text-blue-50">
              {selected.summary}
            </p>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.6fr_0.8fr]">
            <div className="space-y-5">
              {[
                ["Opportunity Overview", selected.description],
                ["Eligibility and Requirements", selected.eligibility],
              ].map(([heading, content]) => (
                <article
                  key={heading}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-slate-900">
                    {heading}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {content}
                  </p>
                </article>
              ))}

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Potential Benefits
                </h2>

                <ul className="mt-4 space-y-3">
                  {selected.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-3 text-sm text-slate-600"
                    >
                      <span className="font-bold text-blue-700">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </article>

              <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-slate-600">
                This is an informational pathway, not a verified live vacancy.
                Confirm availability and requirements with the relevant
                provider.
              </p>
            </div>

            <aside className="h-fit space-y-5 lg:sticky lg:top-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">
                  Opportunity Details
                </h2>

                {[
                  ["Category", selected.category],
                  ["Opportunity Level", selected.level],
                  ["Location", selected.location],
                  ["Format", selected.format],
                  ["Deadline", selected.deadline],
                ].map(([label, value]) => (
                  <div key={label} className="mt-4">
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {value}
                    </p>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-blue-50"
                >
                  Explore Other Opportunities
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Relevant Skills
                </h2>
                {renderSkills(selected.skills)}
              </div>
            </aside>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 px-4 py-10 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
            EXPLORE YOUR NEXT STEP
          </span>

          <h1 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Explore Opportunities
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Explore career opportunities, internships, scholarships,
            fellowships, workshops and competitions.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <form
              onSubmit={handleSearch}
              className="rounded-2xl border border-blue-100 p-2 shadow-sm focus-within:border-blue-400"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search jobs, internships, scholarships, AI, cloud..."
                  aria-label="Search opportunities"
                  className="h-12 min-w-0 flex-1 rounded-xl px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-blue-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  Search →
                </button>
              </div>
            </form>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Opportunity Category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-normal"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All Categories" : item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Opportunity Level
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-normal"
                >
                  {[
                    "All levels",
                    ...Array.from(new Set(opportunities.map((item) => item.level))),
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Format
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 font-normal"
                >
                  {[
                    "All formats",
                    "Online",
                    "Remote",
                    "Hybrid",
                    "On-site",
                    "Application-Based",
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
                Browse by Category
              </p>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      category === item
                        ? "bg-blue-700 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-blue-50"
                    }`}
                  >
                    {item === "All" ? "All Opportunities" : item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={resultsRef}
            className="mb-5 mt-8 scroll-mt-6 flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Discover Opportunities
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Explore options that match your interests and career goals.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-slate-500 hover:text-blue-700"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => (
                <article
                  key={item.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="h-1.5 bg-gradient-to-r from-blue-950 via-blue-700 to-blue-400" />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${styles[item.category]}`}
                      >
                        {item.category}
                      </span>

                      <span className="text-xs font-medium text-slate-500">
                        {item.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold leading-snug text-slate-900 group-hover:text-blue-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-blue-700">
                      {item.field}
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {item.summary}
                    </p>

                    <div className="mt-4">
                      <p className="mb-2 text-xs font-bold uppercase text-slate-400">
                        Relevant Skills
                      </p>
                      {renderSkills(item.skills.slice(0, 3))}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">Location</p>
                        <p className="mt-1 text-sm text-slate-700">
                          {item.location}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">Format</p>
                        <p className="mt-1 text-sm text-slate-700">
                          {item.format}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelected(item);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="mt-5 w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
                    >
                      View Details →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <h3 className="text-lg font-bold text-slate-900">
                No Matching Opportunities
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try a different keyword or adjust the selected filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Reset Filters
              </button>
            </div>
          )}

          <p className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500 sm:text-sm">
            <strong className="text-slate-700">Please note:</strong> These are
            informational opportunity pathways, not verified live vacancies
            or open applications. Confirm availability and deadlines with the
            relevant provider.
          </p>
        </div>
      </section>
    </main>
  );
}