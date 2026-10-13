function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb]">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-[#dce3ec] bg-white px-4 py-2 text-sm font-semibold text-[#1769e0] shadow-sm">
            Pakistan's & Career Ecosystem
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#172033] sm:text-5xl lg:text-6xl">
            Build Your Career.
            <span className="block text-[#1769e0]">
              Discover Your Future.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5e6b7d]">
            Upliftra Network connects students, graduates, professionals,
            mentors, recruiters, companies, and organizations through
            opportunities, practical learning, mentorship, and career growth.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/opportunities"
              className="rounded-xl bg-[#1769e0] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b1f3a]"
            >
              Explore Opportunities
            </a>

            <a
              href="/register"
              className="rounded-xl border border-[#dce3ec] bg-white px-6 py-3.5 text-sm font-semibold text-[#172033] shadow-sm transition hover:border-[#1769e0] hover:text-[#1769e0]"
            >
              Join Upliftra
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-[#5e6b7d]">
            <div>
              <span className="font-semibold text-[#172033]">
                Students
              </span>
              <span className="ml-2">Learn & Grow</span>
            </div>

            <div>
              <span className="font-semibold text-[#172033]">
                Professionals
              </span>
              <span className="ml-2">Connect & Advance</span>
            </div>

            <div>
              <span className="font-semibold text-[#172033]">
                Companies
              </span>
              <span className="ml-2">Discover Talent</span>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-[#1769e0]/10 blur-3xl" />

          <div className="relative rounded-3xl border border-[#dce3ec] bg-white p-8 shadow-[0_20px_60px_rgba(23,32,51,0.10)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#5e6b7d]">
                  Career Dashboard
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#172033]">
                  Your growth journey
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1769e0] text-sm font-bold text-white">
                U
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#f4f7fb] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#172033]">
                    Career Readiness
                  </span>
                  <span className="text-sm font-bold text-[#1769e0]">
                    78%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#dce3ec]">
                  <div className="h-full w-[78%] rounded-full bg-[#1769e0]" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dce3ec] p-5">
                  <p className="text-xs font-medium text-[#5e6b7d]">
                    Opportunities
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#172033]">
                    24
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dce3ec] p-5">
                  <p className="text-xs font-medium text-[#5e6b7d]">
                    Skills
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#172033]">
                    12
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dce3ec] p-5">
                <p className="text-xs font-medium text-[#5e6b7d]">
                  Recommended next step
                </p>
                <p className="mt-2 font-semibold text-[#172033]">
                  Complete your professional profile
                </p>
                <p className="mt-1 text-sm text-[#5e6b7d]">
                  Improve your visibility and discover better opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection