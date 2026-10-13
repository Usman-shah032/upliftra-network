
import { Link, useSearchParams } from 'react-router-dom'

type GuidanceOption = {
  id: string
  label: string
  title: string
  description: string
  points: string[]
  helpTitle: string
  helpItems: string[]
  actionLabel: string
}

type Benefit = {
  id: string
  number: string
  title: string
  description: string
  detailTitle: string
  detailDescription: string
  detailPoints: string[]
}

const guidanceOptions: GuidanceOption[] = [
  {
    id: 'one-to-one-mentorship',
    label: 'One-to-One Mentorship',
    title: 'Get personalized guidance from experienced professionals',
    description:
      'Connect with experienced professionals who can understand your goals, answer your questions, and guide you through your personal career journey.',
    points: [
      'Discuss your goals, challenges, and career direction',
      'Get personalized advice based on your current situation',
      'Learn directly from someone with relevant professional experience',
    ],
    helpTitle: 'Make mentorship work for you',
    helpItems: [
      'Share your goals and challenges with an experienced professional',
      'Get practical feedback and guidance based on your situation',
      'Build a clearer and more confident path toward your goals',
    ],
    actionLabel: 'Find a Mentor',
  },
  {
    id: 'build-skills',
    label: 'Build Skills',
    title: 'Build the skills your target career needs',
    description:
      'Get practical direction from people who have already worked in your target field and understand which skills matter in the real industry.',
    points: [
      'Identify the most valuable skills for your field',
      'Create a practical learning roadmap',
      'Understand how to move from learning to real projects',
    ],
    helpTitle: 'Build the right skills',
    helpItems: [
      'Identify the technical and professional skills you need',
      'Prioritize learning instead of trying to learn everything',
      'Turn your knowledge into practical portfolio projects',
    ],
    actionLabel: 'Start Your Learning Path',
  },
  {
    id: 'career-guidance',
    label: 'Career Guidance',
    title: 'Make clearer career decisions',
    description:
      'When you are unsure about your next step, experienced guidance can help you evaluate your options and move forward with greater confidence.',
    points: [
      'Explore career paths based on your interests',
      'Understand the next realistic step in your journey',
      'Learn from someone who has already navigated the field',
    ],
    helpTitle: 'Get clearer career direction',
    helpItems: [
      'Discuss your current goals and challenges',
      'Explore possible career directions',
      'Create practical next steps instead of staying stuck',
    ],
    actionLabel: 'Find Career Guidance',
  },
  {
    id: 'industry-insights',
    label: 'Industry Insights',
    title: 'Learn how the industry actually works',
    description:
      'Go beyond classroom knowledge and learn about workplace expectations, industry trends, professional practices, and real-world experiences.',
    points: [
      'Understand real workplace expectations',
      'Learn from practical industry experiences',
      'Discover how professionals grow in their careers',
    ],
    helpTitle: 'Learn from industry experience',
    helpItems: [
      'Understand how your target industry operates',
      'Learn about real workplace challenges and expectations',
      'Gain perspective from professionals with practical experience',
    ],
    actionLabel: 'Connect With Professionals',
  },
]

const benefits: Benefit[] = [
  {
    id: 'personal-guidance',
    number: '01',
    title: 'Personal guidance',
    description:
      'Get direction based on your goals, interests, current skills, and career stage instead of following a one-size-fits-all path.',
    detailTitle: 'Get guidance that is relevant to your journey',
    detailDescription:
      'A mentor can first understand where you are, where you want to go, and what challenges are holding you back. From there, they can help you make your next steps clearer and more practical.',
    detailPoints: [
      'Discuss your goals, interests, strengths, and current challenges.',
      'Get a clearer direction based on your individual career situation.',
      'Identify realistic next steps instead of trying to figure everything out alone.',
    ],
  },
  {
    id: 'career-growth',
    number: '02',
    title: 'Career growth',
    description:
      'Learn how to make stronger career decisions, prepare for opportunities, and continuously improve your professional profile.',
    detailTitle: 'Turn career goals into practical progress',
    detailDescription:
      'Mentorship can help you understand what you need to improve at each stage of your career. Instead of only focusing on getting the next opportunity, you can build a stronger foundation for long-term professional growth.',
    detailPoints: [
      'Understand which skills and experiences can strengthen your career profile.',
      'Get practical feedback on your CV, LinkedIn profile, projects, or applications.',
      'Learn how to prepare yourself for better opportunities and responsibilities.',
    ],
  },
  {
    id: 'real-industry',
    number: '03',
    title: 'Real industry perspective',
    description:
      'Understand what actually happens inside the industry through practical experiences, insights, and lessons from professionals.',
    detailTitle: 'Learn what the industry really expects',
    detailDescription:
      'Academic knowledge gives you a foundation, but industry experience shows you how that knowledge is actually used. A mentor can share practical experiences, workplace expectations, common challenges, and lessons learned from real situations.',
    detailPoints: [
      'Understand the difference between academic learning and real workplace expectations.',
      'Learn how professionals solve problems and handle practical challenges.',
      'Discover which skills, habits, and professional practices matter in your target industry.',
    ],
  },
  {
    id: 'professional-network',
    number: '04',
    title: 'Professional connections',
    description:
      'Build meaningful professional relationships with people who can share knowledge, experience, and valuable perspectives.',
    detailTitle: 'Build meaningful professional relationships',
    detailDescription:
      'Mentorship is not only about receiving advice. It is also about building genuine professional relationships over time. Meaningful connections can expose you to new perspectives, industry conversations, opportunities, and people who understand your field.',
    detailPoints: [
      'Connect with professionals who have relevant industry experience.',
      'Learn how to communicate and build relationships professionally.',
      'Grow a network that can support your learning and career journey over time.',
    ],
  },
]

function MentorsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedGuidanceId =
    searchParams.get('guidance') ?? 'one-to-one-mentorship'

  const selectedGuidance =
    guidanceOptions.find(
      (option) => option.id === selectedGuidanceId,
    ) ?? guidanceOptions[0]

  const selectedBenefitId = searchParams.get('benefit')

  const selectedBenefit =
    benefits.find((benefit) => benefit.id === selectedBenefitId) ?? null

  const selectGuidance = (id: string) => {
    setSearchParams({ guidance: id })

    setTimeout(() => {
      document
        .getElementById('guidance-details')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 50)
  }

  const selectBenefit = (id: string) => {
    setSearchParams({
      guidance: selectedGuidance.id,
      benefit: id,
    })

    setTimeout(() => {
      document
        .getElementById('benefit-details')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#172033]">
      {/* HERO */}
      <section className="border-b border-[#e3e8ef] bg-white">
        <div className="mx-auto max-w-[1320px] px-5 py-9 sm:px-6 sm:py-10 lg:px-7 lg:py-11">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-[#d9e4f2] bg-[#f5f9ff] px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#1769e0]">
                MENTOR NETWORK
              </div>

              <h1 className="max-w-[650px] text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#172033] sm:text-5xl">
                Learn from experience.
                <span className="block text-[#1769e0]">
                  Move forward with purpose.
                </span>
              </h1>

              <p className="mt-5 max-w-[620px] text-base leading-7 text-[#5e6b7d] sm:text-[17px]">
                Connect with experienced professionals who can help you
                build skills, make better career decisions, and understand
                the industry with greater clarity.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/mentors"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1769e0] px-5 text-sm font-bold !text-white shadow-[0_8px_20px_rgba(23,105,224,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b1f3a] hover:!text-white hover:shadow-[0_10px_24px_rgba(11,31,58,0.18)] focus:!text-white"
                >
                  <span className="!text-white">
                    Find a Mentor
                  </span>
                </Link>

                <a
                  href="#guidance-details"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-[#d7e0ea] bg-white px-5 text-sm font-bold !text-[#263449] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#bfcbd9] hover:bg-[#f8fafc] hover:!text-[#263449] focus:!text-[#263449]"
                >
                  <span className="!text-[#263449]">
                    Explore Mentorship
                  </span>
                </a>
              </div>
            </div>

            {/* HERO OPTIONS */}
            <div className="rounded-2xl border border-[#dfe6ee] bg-[#fbfcfe] p-5 shadow-[0_10px_30px_rgba(23,32,51,0.05)] sm:p-6">
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a8797]">
                  What do you need help with?
                </p>

                <h2 className="mt-1.5 text-xl font-bold tracking-[-0.02em] text-[#172033]">
                  Choose your focus
                </h2>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {guidanceOptions.map((option) => {
                  const active = option.id === selectedGuidance.id

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectGuidance(option.id)}
                      className={`group rounded-xl border p-4 text-left transition-all duration-200 ${
                        active
                          ? 'border-[#1769e0] bg-[#f3f8ff] shadow-[0_5px_16px_rgba(23,105,224,0.08)]'
                          : 'border-[#e0e6ed] bg-white hover:-translate-y-0.5 hover:border-[#bfcddd] hover:shadow-[0_6px_18px_rgba(23,32,51,0.06)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`text-sm font-bold ${
                            active
                              ? 'text-[#1769e0]'
                              : 'text-[#263449] group-hover:text-[#1769e0]'
                          }`}
                        >
                          {option.label}
                        </span>

                        <span
                          className={`mt-0.5 text-sm ${
                            active
                              ? 'text-[#1769e0]'
                              : 'text-[#9aa5b3] group-hover:text-[#1769e0]'
                          }`}
                        >
                          →
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-[#6d7989]">
                        {option.description.split('.')[0]}.
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="border-b border-[#e3e8ef] bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-6 sm:py-9 lg:px-7">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4">
              <div className="flex items-center gap-2.5">
                <span className="h-6 w-1 rounded-full bg-[#1769e0]" />

                <h2 className="text-xl font-bold tracking-[-0.025em] text-[#172033]">
                  Explore{' '}
                  <span className="text-[#1769e0]">
                    Mentors
                  </span>
                </h2>
              </div>

              <p className="mt-2 pl-[13px] text-sm leading-6 text-[#687588]">
                Search by expertise, industry, or career area to find
                guidance that matches your goals.
              </p>
            </div>

            <div className="group flex h-[56px] w-full items-center rounded-2xl border border-[#d4dfec] bg-[#fbfdff] px-4 shadow-[0_5px_18px_rgba(23,32,51,0.045)] transition-all duration-200 hover:border-[#b8cbe1] hover:shadow-[0_7px_22px_rgba(23,105,224,0.07)] focus-within:border-[#9fbee4] focus-within:bg-white focus-within:shadow-[0_8px_24px_rgba(23,105,224,0.10)]">
              <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef5ff] text-[#1769e0] transition-colors duration-200 group-focus-within:bg-[#e5f0ff]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-[18px] w-[18px]"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path
                    d="m16 16 4.5 4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Search mentors by expertise, industry, or career area..."
                aria-label="Search mentors"
                className="upliftra-mentor-search-input h-full min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-sm font-medium text-[#172033] placeholder:text-[#8b96a7] outline-none ring-0 shadow-none focus:border-0 focus:outline-none focus:ring-0 focus:shadow-none focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none"
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  border: '0',
                  WebkitAppearance: 'none',
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          .upliftra-mentor-search-input,
          .upliftra-mentor-search-input:focus,
          .upliftra-mentor-search-input:focus-visible {
            outline: none !important;
            box-shadow: none !important;
            border: 0 !important;
          }
        `}</style>
      </section>

      {/* WHY MENTORSHIP MATTERS */}
      <section className="bg-[#f7f9fc]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-14 lg:px-7">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1769e0]">
              WHY MENTORSHIP MATTERS
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#172033] sm:text-3xl">
              Guidance can make the journey clearer.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#667386] sm:text-base">
              The right mentor can help you understand your options,
              learn from real experience, and move forward with greater
              confidence.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const active = benefit.id === selectedBenefitId

              return (
                <button
                  key={benefit.id}
                  type="button"
                  onClick={() => selectBenefit(benefit.id)}
                  className={`upliftra-card group rounded-2xl border bg-white p-5 text-left shadow-[0_5px_18px_rgba(23,32,51,0.04)] ${
                    active
                      ? 'border-[#1769e0] ring-1 ring-[#1769e0]/10'
                      : 'border-[#e0e6ed]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.12em] text-[#1769e0]">
                      {benefit.number}
                    </span>

                    <span className="text-sm text-[#a0aab7] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#1769e0]">
                      →
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-bold text-[#172033]">
                    {benefit.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-6 text-[#687588]">
                    {benefit.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* GUIDANCE DETAILS */}
      <section
        id="guidance-details"
        className="border-t border-[#e3e8ef] bg-white"
      >
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-14 lg:px-7">
          <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border border-[#e0e6ed] bg-white p-6 shadow-[0_6px_22px_rgba(23,32,51,0.04)] sm:p-7">
              <span className="inline-flex rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-bold text-[#1769e0]">
                {selectedGuidance.label}
              </span>

              <h2 className="mt-4 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.025em] text-[#172033] sm:text-3xl">
                {selectedGuidance.title}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#657286] sm:text-base">
                {selectedGuidance.description}
              </p>

              <div className="mt-6 space-y-3">
                {selectedGuidance.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eaf3ff] text-xs font-bold text-[#1769e0]">
                      ✓
                    </span>

                    <p className="text-sm leading-6 text-[#445166]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#dbe5f0] bg-[#f7faff] p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#1769e0]">
                MENTOR SUPPORT
              </p>

              <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-[#172033]">
                {selectedGuidance.helpTitle}
              </h3>

              <div className="mt-5 space-y-4">
                {selectedGuidance.helpItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#1769e0] shadow-sm">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-[#536176]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-[#1769e0] px-5 text-sm font-bold !text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b1f3a] hover:!text-white focus:!text-white"
              >
                <span className="!text-white">
                  {selectedGuidance.actionLabel}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFIT DETAIL */}
      {selectedBenefit && (
        <section
          id="benefit-details"
          className="border-t border-[#e3e8ef] bg-[#f7f9fc]"
        >
          <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-6 lg:px-7">
            <div className="rounded-2xl border border-[#dfe6ee] bg-white p-6 shadow-[0_8px_26px_rgba(23,32,51,0.05)] sm:p-8">
              <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <div className="inline-flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf3ff] text-xs font-bold text-[#1769e0]">
                      {selectedBenefit.number}
                    </span>

                    <span className="text-xs font-bold uppercase tracking-[0.13em] text-[#1769e0]">
                      MENTORSHIP BENEFIT
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.025em] text-[#172033] sm:text-3xl">
                    {selectedBenefit.detailTitle}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[#657286] sm:text-base">
                    {selectedBenefit.detailDescription}
                  </p>
                </div>

                <div className="rounded-xl border border-[#e0e7ef] bg-[#fbfcfe] p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7a8797]">
                    HOW IT HELPS YOU
                  </p>

                  <div className="mt-4 space-y-4">
                    {selectedBenefit.detailPoints.map(
                      (point, index) => (
                        <div
                          key={point}
                          className="flex items-start gap-3"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1769e0] text-[11px] font-bold text-white">
                            {index + 1}
                          </span>

                          <p className="text-sm leading-6 text-[#4f5d71]">
                            {point}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NETWORK */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-14 lg:px-7">
          <div className="rounded-2xl border border-[#dfe6ee] bg-[#fbfcfe] p-7 sm:p-9">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1769e0]">
                MORE THAN MENTORSHIP
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#172033] sm:text-3xl">
                Build relationships that can grow with your career.
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#687588] sm:text-base">
                Upliftra is designed to bring learners and professionals
                closer together through meaningful conversations, practical
                knowledge, and long-term professional connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[#e3e8ef] bg-[#f7f9fc]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-6 sm:py-14 lg:px-7">
          <div className="rounded-2xl border border-[#dfe6ee] bg-white p-7 shadow-[0_8px_26px_rgba(23,32,51,0.05)] sm:p-9">
            <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1769e0]">
                  START YOUR JOURNEY
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-[-0.025em] text-[#172033] sm:text-3xl">
                  The right guidance can change what comes next.
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#687588] sm:text-base">
                  Join Upliftra and connect with people who can help you
                  learn, grow, and move forward with greater confidence.
                </p>
              </div>

              <Link
                to="/register"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-[#1769e0] px-5 text-sm font-bold !text-white shadow-[0_7px_18px_rgba(23,105,224,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b1f3a] hover:!text-white hover:shadow-[0_10px_24px_rgba(11,31,58,0.16)] focus:!text-white"
              >
                <span className="!text-white">
                  Join Upliftra
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MentorsPage
