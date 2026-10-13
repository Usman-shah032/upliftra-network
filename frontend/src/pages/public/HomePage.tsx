
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [visibleLetters, setVisibleLetters] = useState(0)

  const heading = 'Build your career with Upliftra Network.'
  const firstLine = 'Build your career with'
  const secondLineStart = firstLine.length + 1

  const firstVisibleText = heading.slice(0, visibleLetters).slice(0, firstLine.length)
  const secondVisibleText =
    visibleLetters > secondLineStart
      ? heading.slice(secondLineStart, visibleLetters)
      : ''

  useEffect(() => {
    let current = 0
    let timer: ReturnType<typeof setTimeout>

    const revealNextLetter = () => {
      if (current < heading.length) {
        current += 1
        setVisibleLetters(current)
        timer = setTimeout(revealNextLetter, 48)
      } else {
        timer = setTimeout(() => {
          current = 0
          setVisibleLetters(0)
          timer = setTimeout(revealNextLetter, 500)
        }, 1800)
      }
    }

    timer = setTimeout(revealNextLetter, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.upliftra-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = search.trim()
    navigate(query ? `/opportunities?search=${encodeURIComponent(query)}` : '/opportunities')
  }

  const platformCards = [
    {
      number: '01',
      label: 'DISCOVER',
      title: 'Opportunities',
      description: 'Find jobs, internships, scholarships, fellowships and competitions that match your professional goals.',
      href: '/opportunities',
      background: 'bg-gradient-to-br from-[#e8f2ff] via-white to-[#dcecff]',
      border: 'border-[#bdd4ef]',
      icon: 'bg-[#1769e0] text-white',
      glow: 'bg-[#9ec7ff]',
    },
    {
      number: '02',
      label: 'CONNECT',
      title: 'Mentorship',
      description: 'Connect with experienced professionals and gain practical guidance for your career journey.',
      href: '/mentors',
      background: 'bg-gradient-to-br from-[#eef4fb] via-white to-[#e3edf7]',
      border: 'border-[#c7d6e5]',
      icon: 'bg-[#0b1f3a] text-white',
      glow: 'bg-[#a7bad2]',
    },
    {
      number: '03',
      label: 'DEVELOP',
      title: 'Learning',
      description: 'Build practical skills through workshops, learning experiences and professional development.',
      href: '/learning',
      background: 'bg-gradient-to-br from-[#edf7ff] via-white to-[#e6f0f8]',
      border: 'border-[#c8dbe9]',
      icon: 'bg-[#e1efff] text-[#1769e0]',
      glow: 'bg-[#b6d6f5]',
    },
    {
      number: '04',
      label: 'EXPERIENCE',
      title: 'Events',
      description: 'Discover practical sessions, workshops and professional experiences designed around growth.',
      href: '/events',
      background: 'bg-gradient-to-br from-[#e9f4ff] via-white to-[#dfeaf6]',
      border: 'border-[#bfd5e8]',
      icon: 'bg-white text-[#1769e0] border border-[#c8dbee]',
      glow: 'bg-[#aacff1]',
    },
  ]

  const ecosystem = [
    {
      number: '01',
      title: 'Students & Graduates',
      description: 'Build your professional identity, discover opportunities, develop practical skills and start meaningful connections.',
    },
    {
      number: '02',
      title: 'Professionals',
      description: 'Strengthen your professional presence, continue learning and discover meaningful career opportunities.',
    },
    {
      number: '03',
      title: 'Mentors',
      description: 'Share practical expertise, support emerging talent and build structured professional relationships.',
    },
    {
      number: '04',
      title: 'Companies & Recruiters',
      description: 'Reach relevant talent, publish opportunities and build stronger relationships with emerging professionals.',
    },
  ]

  const growthSteps = [
    {
      number: '01',
      title: 'Discover Opportunities',
      description: 'Explore jobs, internships, scholarships and career possibilities that align with your interests and ambitions.',
      icon: 'discover',
      href: '/opportunities',
      label: 'Explore opportunities',
    },
    {
      number: '02',
      title: 'Connect with Mentors',
      description: 'Learn from experienced professionals, seek guidance and build valuable relationships for your career.',
      icon: 'connect',
      href: '/mentors',
      label: 'Find a mentor',
    },
    {
      number: '03',
      title: 'Develop Your Skills',
      description: 'Improve your practical abilities through workshops, learning resources and professional development.',
      icon: 'develop',
      href: '/learning',
      label: 'Start learning',
    },
    {
      number: '04',
      title: 'Achieve Your Goals',
      description: 'Create your professional profile and take meaningful steps towards your personal and career goals.',
      icon: 'achieve',
      href: '/register',
      label: 'Get started',
    },
  ]

  const trustItems = [
    {
      number: '01',
      title: 'Professional profiles',
      description: 'Education, skills, experience and career goals organized in one structured professional identity.',
    },
    {
      number: '02',
      title: 'Relevant discovery',
      description: 'Find opportunities, mentors, learning experiences and events through structured discovery.',
    },
    {
      number: '03',
      title: 'Connected workflows',
      description: 'Applications, mentorship, learning and professional connections work together in one ecosystem.',
    },
    {
      number: '04',
      title: 'Privacy & control',
      description: 'Role-based access and clear controls help keep professional information protected.',
    },
  ]

  const GrowthIcon = ({ type }: { type: string }) => {
    const commonProps = {
      className: 'h-6 w-6',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      'aria-hidden': true as const,
    }

    switch (type) {
      case 'discover':
        return (
          <svg {...commonProps}>
            <circle cx="10.8" cy="10.8" r="6.5" />
            <path d="m16 16 4.2 4.2" />
            <path d="M10.8 7.8v6M7.8 10.8h6" />
          </svg>
        )
      case 'connect':
        return (
          <svg {...commonProps}>
            <circle cx="9" cy="8" r="3" />
            <path d="M3.5 19c0-3 2.4-5 5.5-5 1.6 0 3 .5 4 1.5" />
            <circle cx="17" cy="16" r="3" />
            <path d="m15.8 16 1 1 1.7-2" />
          </svg>
        )
      case 'develop':
        return (
          <svg {...commonProps}>
            <path d="M3 5.5c3.4-1.2 6.1-.5 9 1.7 2.9-2.2 5.6-2.9 9-1.7v13c-3.4-1.2-6.1-.5-9 1.7-2.9-2.2-5.6-2.9-9-1.7z" />
            <path d="M12 7.2v13" />
            <path d="M6.5 9h2M6.5 12h2M15.5 9h2M15.5 12h2" />
          </svg>
        )
      case 'achieve':
        return (
          <svg {...commonProps}>
            <circle cx="12" cy="8" r="5" />
            <path d="m9 12-1 8 4-2.5 4 2.5-1-8" />
            <path d="m10 8 1.4 1.4L14.5 6.5" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#172033]">
      {/* HERO */}
      <section
        className="relative isolate overflow-hidden border-b border-[#d7e1eb] bg-[#f3f7fc]"
        style={{ isolation: 'isolate' }}
      >
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(90deg, rgba(243,247,252,0.68) 0%, rgba(243,247,252,0.48) 48%, rgba(243,247,252,0.12) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="upliftra-hero-separator relative z-[2]" />

        {/* Hero spacing intentionally unchanged */}
        <div className="relative z-10 mx-auto max-w-[1360px] px-4 pb-9 pt-9 sm:px-6 sm:pb-11 sm:pt-11 lg:px-8 lg:pb-12 lg:pt-12">
          <div className="max-w-[1080px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5d6e8] bg-white/90 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#526174] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1769e0]" />
              Pakistan's professional growth platform
            </div>

            <div className="mt-5 max-w-[1050px]">
              <h1
                className="relative min-h-[5.9rem] text-[2.8rem] font-black leading-[0.98] tracking-[-0.055em] sm:min-h-[8.25rem] sm:text-[4.2rem] lg:min-h-[10.2rem] lg:text-[5.2rem] xl:min-h-[11.15rem] xl:text-[5.7rem]"
                aria-label={heading}
                style={{
                  opacity: 1,
                  visibility: 'visible',
                  textShadow: '0 1px 1px rgba(255,255,255,0.35)',
                }}
              >
                <span
                  className="block"
                  style={{
                    color: '#0B1F3A',
                    WebkitTextFillColor: '#0B1F3A',
                    background: 'none',
                    backgroundImage: 'none',
                    WebkitBackgroundClip: 'border-box',
                    backgroundClip: 'border-box',
                    opacity: 1,
                    visibility: 'visible',
                  }}
                >
                  {firstVisibleText || '\u00A0'}
                </span>
                <span
                  className="block"
                  style={{
                    color: '#1769E0',
                    WebkitTextFillColor: '#1769E0',
                    background: 'none',
                    backgroundImage: 'none',
                    WebkitBackgroundClip: 'border-box',
                    backgroundClip: 'border-box',
                    opacity: 1,
                    visibility: 'visible',
                  }}
                >
                  {secondVisibleText || '\u00A0'}
                </span>
              </h1>
            </div>

            <p
              className="relative z-10 mt-4 max-w-[700px] text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8"
              style={{
                color: '#26364b',
                WebkitTextFillColor: '#26364b',
                opacity: 1,
                visibility: 'visible',
                textShadow: '0 1px 1px rgba(255,255,255,0.3)',
              }}
            >
              Discover opportunities, develop practical skills, connect with experienced people and build a stronger professional future.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#1769e0] px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(23,105,224,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b1f3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2 sm:px-7"
              >
                <span className="text-white">Create your profile</span>
                <span className="ml-2 text-lg text-white" aria-hidden="true">→</span>
              </Link>
              <Link
                to="/opportunities"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#c7d6e6] bg-white/90 px-6 text-sm font-bold text-[#172033] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1769e0] hover:text-[#1769e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2 sm:px-7"
              >
                Explore opportunities <span className="ml-2 text-[#1769e0]" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* SEARCH */}
          <div className="upliftra-reveal mt-6 max-w-[860px]">
            <form
              onSubmit={handleSearch}
              autoComplete="off"
              className="flex flex-col gap-2 rounded-2xl border border-[#c7d6e6] bg-white/90 p-2 shadow-[0_8px_22px_rgba(23,32,51,0.055)] sm:flex-row"
            >
              <div className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl border border-transparent bg-[#f6f9fc] px-4 transition-colors focus-within:border-[#1769e0] focus-within:bg-white">
                <svg
                  className="h-5 w-5 shrink-0 text-[#7f8da0]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 4 4" />
                </svg>

                <input
                  name="opportunity-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  type="text"
                  aria-label="Search opportunities"
                  placeholder="Search jobs, internships, scholarships, workshops..."
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="upliftra-search-input min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-sm text-[#172033] outline-none ring-0 shadow-none placeholder:text-[#8b96a7] focus:border-0 focus:outline-none focus:ring-0 focus:shadow-none focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0"
                  style={{
                    outline: 'none',
                    boxShadow: 'none',
                    border: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                className="h-12 rounded-xl bg-[#0b1f3a] px-7 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#1769e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2"
              >
                Search
              </button>
            </form>

            <div className="mt-2.5 flex flex-wrap items-center gap-2 pl-1">
              <span className="mr-1 text-[11px] font-bold text-[#334155]">Popular:</span>
              {['Internships', 'Jobs', 'Mentors', 'Learning'].map((item) => (
                <Link
                  key={item}
                  to={
                    item === 'Mentors'
                      ? '/mentors'
                      : item === 'Learning'
                        ? '/learning'
                        : `/opportunities?search=${encodeURIComponent(item)}`
                  }
                  className="rounded-full border border-[#ccd9e7] bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#526174] transition-colors hover:border-[#1769e0] hover:bg-[#edf5ff] hover:text-[#1769e0]"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-6">
            <div className="upliftra-reveal max-w-[420px]">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1769e0]">THE UPLIFTRA ECOSYSTEM</p>
              <h2 className="mt-2 text-3xl font-black leading-[1.05] tracking-[-0.045em] text-[#0b1f3a] sm:text-[2.6rem]">Everything you need to move forward.</h2>
              <p className="mt-3 text-sm leading-6 text-[#5e6b7d] sm:text-base">One connected professional ecosystem for opportunity discovery, practical development, mentorship and meaningful professional experiences.</p>
              <Link to="/register" className="mt-4 inline-flex items-center text-sm font-bold text-[#1769e0] transition-colors hover:text-[#0b1f3a]">Start building your profile <span className="ml-2 text-lg" aria-hidden="true">→</span></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {platformCards.map((card, index) => (
                <Link key={card.title} to={card.href} className={`upliftra-card upliftra-reveal upliftra-reveal-delay-${index + 1} group relative min-h-[215px] overflow-hidden rounded-2xl border p-4 shadow-[0_5px_18px_rgba(23,32,51,0.045)] transition-shadow hover:shadow-[0_10px_24px_rgba(23,105,224,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2 sm:p-5 ${card.background} ${card.border}`}>
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl opacity-50 ${card.glow}`} />
                  <div className="relative flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-[11px] font-black shadow-sm ${card.icon}`}>{card.number}</div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/80 text-base font-bold text-[#1769e0] shadow-sm transition-colors group-hover:border-[#1769e0] group-hover:bg-[#1769e0] group-hover:text-white" aria-hidden="true">→</span>
                  </div>
                  <div className="relative mt-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1769e0]">{card.label}</p>
                    <h3 className="mt-1.5 text-[1.25rem] font-black tracking-[-0.025em] text-[#0b1f3a]">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#526174]">{card.description}</p>
                  </div>
                  <div className="relative mt-3 h-px w-10 overflow-hidden bg-[#bfd4ea] transition-all duration-300 group-hover:w-14"><div className="h-full w-full bg-[#1769e0]" /></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YOUR GROWTH JOURNEY */}
      <section className="relative overflow-hidden border-y border-[#d8e2ec] bg-gradient-to-br from-[#f3f7fb] via-white to-[#e8f2ff]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#dcecff]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-56 w-56 rounded-full bg-[#e1efff]/60 blur-3xl" />
        <div className="relative mx-auto max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-6">
            <div className="upliftra-reveal max-w-[500px]">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1769e0]">YOUR GROWTH JOURNEY</p>
              <h2 className="mt-2 text-3xl font-black leading-[1.08] tracking-[-0.045em] text-[#0b1f3a] sm:text-4xl lg:text-5xl">Your next chapter starts here.</h2>
              <p className="mt-3 text-sm leading-6 text-[#5e6b7d] sm:text-base">Move forward with a clear path: discover relevant opportunities, connect with experienced mentors, develop practical skills and take the next step towards your goals.</p>
              <Link to="/register" className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#1769e0] bg-[#1769e0] px-6 text-sm font-bold !text-white shadow-[0_7px_18px_rgba(23,105,224,0.15)] transition-colors duration-200 hover:bg-[#0b1f3a] hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2"><span className="!text-white">Start your journey</span><span className="text-lg !text-white" aria-hidden="true">→</span></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {growthSteps.map((item, index) => (
                <Link key={item.number} to={item.href} aria-label={`${item.label}: ${item.title}`} className={`upliftra-card upliftra-reveal upliftra-reveal-delay-${index + 1} group block rounded-2xl border border-[#d3dfea] bg-white p-4 shadow-[0_5px_18px_rgba(23,32,51,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a9c9ef] hover:shadow-[0_10px_24px_rgba(23,105,224,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2 sm:p-5`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black tracking-[0.16em] text-[#1769e0]">{item.number}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6e5f5] bg-[#edf5ff] text-[#1769e0] transition-colors duration-200 group-hover:border-[#1769e0] group-hover:bg-[#1769e0] group-hover:text-white"><GrowthIcon type={item.icon} /></span>
                  </div>
                  <h3 className="mt-3 text-lg font-black tracking-[-0.025em] text-[#0b1f3a] transition-colors group-hover:text-[#1769e0] sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5e6b7d]">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-[#e5edf5] pt-3"><span className="text-xs font-bold text-[#1769e0]">{item.label}</span><span className="text-lg font-bold text-[#1769e0] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="upliftra-reveal max-w-[720px]">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1769e0]">BUILT FOR THE ECOSYSTEM</p>
              <h2 className="mt-2 text-3xl font-black leading-[1.05] tracking-[-0.045em] text-[#0b1f3a] sm:text-4xl">Different people. One connected professional network.</h2>
            </div>
            <p className="upliftra-reveal max-w-[430px] text-sm leading-6 text-[#5e6b7d]">Upliftra brings together the people and organizations that shape a professional journey — from first opportunity to long-term growth.</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystem.map((item, index) => (
              <div key={item.title} className={`upliftra-card upliftra-reveal upliftra-reveal-delay-${index + 1} rounded-2xl border border-[#d3dfea] bg-gradient-to-br from-white to-[#f1f6fb] p-4 shadow-[0_5px_16px_rgba(23,32,51,0.035)] sm:p-5`}>
                <span className="text-[10px] font-black tracking-[0.16em] text-[#1769e0]">{item.number}</span>
                <div className="mt-3 h-1 w-9 rounded-full bg-[#1769e0]" />
                <h3 className="mt-3 text-base font-black text-[#172033]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5e6b7d]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTORSHIP + LEARNING */}
      <section className="border-y border-[#d8e2ec] bg-[#f3f7fb]">
        <div className="mx-auto max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
            <Link to="/mentors" className="upliftra-card upliftra-reveal group relative overflow-hidden rounded-2xl border border-[#bfd8f2] bg-gradient-to-br from-[#e5f1ff] via-[#f2f8ff] to-[#dcecff] p-5 shadow-[0_7px_20px_rgba(23,105,224,0.06)] transition-shadow hover:shadow-[0_12px_25px_rgba(23,105,224,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2 sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/60 blur-3xl" />
              <div className="relative flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1769e0] text-xs font-black text-white shadow-sm">M</div><span className="text-xl text-[#1769e0] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span></div>
              <p className="relative mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#1769e0]">MENTORSHIP</p>
              <h3 className="relative mt-2 text-2xl font-black leading-[1.08] tracking-[-0.035em] text-[#0b1f3a] sm:text-3xl">Learn from people with real experience.</h3>
              <p className="relative mt-3 max-w-xl text-sm leading-6 text-[#526174]">Discover mentors by expertise, industry and professional interests and turn experience into practical guidance.</p>
            </Link>
            <Link to="/learning" className="upliftra-card upliftra-reveal upliftra-reveal-delay-1 group relative overflow-hidden rounded-2xl border border-[#cbd9e7] bg-gradient-to-br from-white via-[#f8fbfe] to-[#e8f2fc] p-5 shadow-[0_7px_20px_rgba(23,32,51,0.045)] transition-shadow hover:shadow-[0_12px_25px_rgba(23,32,51,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2 sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#dcecff] blur-3xl" />
              <div className="relative flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f0ff] text-xs font-black text-[#1769e0]">L</div><span className="text-xl text-[#1769e0] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span></div>
              <p className="relative mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#1769e0]">PRACTICAL LEARNING</p>
              <h3 className="relative mt-2 text-2xl font-black leading-[1.08] tracking-[-0.035em] text-[#0b1f3a] sm:text-3xl">Build skills you can actually use.</h3>
              <p className="relative mt-3 max-w-xl text-sm leading-6 text-[#526174]">Connect practical workshops, learning experiences and professional development with your long-term career goals.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* AI CAREER SUPPORT */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="upliftra-reveal overflow-hidden rounded-2xl border border-[#c4d9ef] bg-gradient-to-br from-[#edf5ff] via-[#f5f9fd] to-[#e6f1fc] shadow-[0_8px_24px_rgba(23,32,51,0.045)]">
            <div className="grid lg:grid-cols-[1fr_0.78fr]">
              <div className="p-5 sm:p-7 lg:p-9">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1769e0]">AI-POWERED CAREER SUPPORT</p>
                <h2 className="mt-2 max-w-[650px] text-3xl font-black leading-[1.05] tracking-[-0.045em] text-[#0b1f3a] sm:text-4xl">Guidance that understands where you want to go.</h2>
                <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#5e6b7d] sm:text-base">Upliftra's AI layer is designed to support career planning, skill-gap analysis, resume improvement, interview preparation and personalized learning roadmaps.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Career planning', 'Skill gaps', 'Resume improvement', 'Interview practice', 'Learning roadmap'].map((item) => (
                    <span key={item} className="rounded-full border border-[#c8d9e9] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#526174] shadow-sm">{item}</span>
                  ))}
                </div>
              </div>
              <div className="border-t border-[#d3e0ed] bg-white/80 p-4 lg:border-l lg:border-t-0 lg:p-6">
                <div className="rounded-2xl border border-[#d7e2ec] bg-white p-4 shadow-[0_8px_22px_rgba(23,32,51,0.06)]">
                  <div className="flex items-center gap-3 border-b border-[#e4e9ef] pb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1769e0] text-[10px] font-black text-white">AI</div>
                    <div><p className="text-sm font-black text-[#172033]">AI Career Coach</p><p className="text-[11px] text-[#8b96a7]">Example career support prompts</p></div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {['Build a career plan', 'Identify my skill gaps', 'Improve my resume', 'Prepare for an interview'].map((item) => (
                      <div key={item} className="flex items-center justify-between rounded-xl border border-[#e0e7ef] bg-[#f8fafc] px-3.5 py-2.5"><span className="text-xs font-bold text-[#39475a]">{item}</span><span className="text-sm font-bold text-[#1769e0]" aria-hidden="true">→</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-[#d8e2ec] bg-[#f3f7fb]">
        <div className="mx-auto max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:gap-6">
            <div className="upliftra-reveal max-w-[430px]">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1769e0]">BUILT FOR PROFESSIONALS</p>
              <h2 className="mt-2 text-3xl font-black leading-[1.05] tracking-[-0.045em] text-[#0b1f3a] sm:text-4xl">A professional foundation you can trust.</h2>
              <p className="mt-3 text-sm leading-6 text-[#5e6b7d]">Upliftra is being built around structured information, meaningful connections, clear workflows and responsible access.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustItems.map((item, index) => (
                <div key={item.title} className={`upliftra-card upliftra-reveal upliftra-reveal-delay-${index + 1} rounded-2xl border border-[#d2deea] bg-white p-4 shadow-[0_5px_16px_rgba(23,32,51,0.035)] sm:p-5`}>
                  <span className="text-[10px] font-black tracking-[0.16em] text-[#1769e0]">{item.number}</span>
                  <div className="mt-3 h-1 w-9 rounded-full bg-[#1769e0]" />
                  <h3 className="mt-3 text-base font-black text-[#172033]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5e6b7d]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="upliftra-reveal relative overflow-hidden rounded-2xl border border-[#bcd5ef] bg-gradient-to-r from-[#e8f3ff] via-[#f3f8fd] to-[#e1effd] px-5 py-6 shadow-[0_8px_24px_rgba(23,105,224,0.05)] sm:px-8 sm:py-7">
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/70 blur-3xl" />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[720px]">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1769e0]">START WITH UPLIFTRA</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#0b1f3a] sm:text-3xl">Build your next professional chapter.</h2>
                <p className="mt-2 text-sm leading-6 text-[#5e6b7d]">Create your profile, discover opportunities and start connecting with the people and experiences that can move you forward.</p>
              </div>
              <div className="relative flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link to="/register" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#1769e0] px-6 text-sm font-bold text-white shadow-[0_7px_18px_rgba(23,105,224,0.14)] transition-colors hover:bg-[#0b1f3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2 sm:px-7"><span className="text-white">Join Upliftra</span><span className="ml-2 text-lg text-white" aria-hidden="true">→</span></Link>
                <Link to="/opportunities" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#c4d5e6] bg-white px-6 text-sm font-bold text-[#172033] transition-colors hover:border-[#1769e0] hover:text-[#1769e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769e0] focus-visible:ring-offset-2 sm:px-7">Explore opportunities</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
