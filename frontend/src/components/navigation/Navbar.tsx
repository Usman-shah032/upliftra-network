
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/upliftra-logo.png'

function Navbar() {
  const location = useLocation()

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Opportunities', path: '/opportunities' },
    { label: 'Mentors', path: '/mentors' },
    { label: 'Learning', path: '/learning' },
    { label: 'Events', path: '/events' },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }

    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dce3ec] bg-white/95 shadow-[0_2px_18px_rgba(23,32,51,0.07)] backdrop-blur-md">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="group flex shrink-0 items-center rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1769e0]/15"
        >
          <img
            src={logo}
            alt="Upliftra Network"
            className="h-14 w-auto object-contain transition-all duration-300 group-hover:scale-[1.025] group-hover:opacity-95"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative inline-flex h-11 items-center rounded-xl px-4 text-sm font-semibold transition-all duration-250 ease-out focus:outline-none focus:ring-4 focus:ring-[#1769e0]/15 ${
                  active
                    ? 'bg-[#eff6ff] text-[#1769e0] shadow-[inset_0_0_0_1px_rgba(23,105,224,0.06)]'
                    : 'text-[#526174] hover:-translate-y-0.5 hover:bg-[#f4f7fb] hover:text-[#1769e0] hover:shadow-[0_4px_12px_rgba(23,32,51,0.05)]'
                }`}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Active indicator */}
                {active && (
                  <span className="absolute bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#1769e0]" />
                )}

                {/* Hover indicator */}
                {!active && (
                  <span className="absolute bottom-1.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-[#1769e0] transition-all duration-250 group-hover:w-4" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          {/* Login */}
          <Link
            to="/login"
            className="group inline-flex h-11 items-center justify-center rounded-xl border border-transparent px-4.5 text-sm font-semibold text-[#172033] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#dce3ec] hover:bg-[#f8fafc] hover:text-[#1769e0] hover:shadow-[0_4px_12px_rgba(23,32,51,0.06)] focus:outline-none focus:ring-4 focus:ring-[#1769e0]/15 active:translate-y-0"
          >
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              Login
            </span>
          </Link>

          {/* Join Upliftra */}
          <Link
            to="/register"
            className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-xl bg-[#1769e0] px-5 text-sm font-bold text-white shadow-[0_7px_18px_rgba(23,105,224,0.22)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:bg-[#0b1f3a] hover:shadow-[0_10px_24px_rgba(11,31,58,0.24)] focus:outline-none focus:ring-4 focus:ring-[#1769e0]/25 active:translate-y-0"
          >
            <span className="relative z-10 text-white transition-transform duration-200 group-hover:translate-x-0.5">
              Join Upliftra
            </span>

            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar

