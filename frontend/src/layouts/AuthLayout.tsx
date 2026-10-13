import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/upliftra-logo.png'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#172033]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Brand Panel */}
        <section className="relative hidden overflow-hidden bg-[#0b1f3a] lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#1769e0]/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#2f8cff]/10 blur-3xl" />

          <div className="relative z-10 p-10">
            <Link to="/" className="inline-flex">
              <img
                src={logo}
                alt="Upliftra Network"
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="relative z-10 max-w-xl px-10 pb-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#2f8cff]">
              Pakistan's Professional & Career Ecosystem
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
              Build your career.
              <span className="block text-[#2f8cff]">
                Discover your future.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#c8d2df]">
              Connect with opportunities, mentors, practical learning,
              professionals, and organizations through one growing career
              ecosystem.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-lg font-bold text-white">Learn</p>
                <p className="mt-1 text-xs text-[#c8d2df]">
                  Practical skills
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-lg font-bold text-white">Connect</p>
                <p className="mt-1 text-xs text-[#c8d2df]">
                  People & mentors
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-lg font-bold text-white">Grow</p>
                <p className="mt-1 text-xs text-[#c8d2df]">
                  Career & impact
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 px-10 pb-8 text-xs text-[#8b96a7]">
            © {new Date().getFullYear()} Upliftra Network. All rights reserved.
          </div>
        </section>

        {/* Auth Content */}
        <section className="flex min-h-screen flex-col">
          <div className="flex items-center justify-between px-6 py-5 lg:hidden">
            <Link to="/">
              <img
                src={logo}
                alt="Upliftra Network"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <Link
              to="/"
              className="text-sm font-medium text-[#5e6b7d] transition hover:text-[#1769e0]"
            >
              Back to home
            </Link>
          </div>

          <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </main>

          <div className="px-6 py-5 text-center text-xs text-[#8b96a7]">
            <span>Upliftra Network</span>
            <span className="mx-2">•</span>
            <Link
              to="/privacy"
              className="transition hover:text-[#1769e0]"
            >
              Privacy
            </Link>
            <span className="mx-2">•</span>
            <Link
              to="/terms"
              className="transition hover:text-[#1769e0]"
            >
              Terms
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AuthLayout