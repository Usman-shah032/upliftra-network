import { Outlet } from 'react-router-dom'
import Navbar from '../components/navigation/Navbar'

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7fb] text-[#172033]">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[#dce3ec] bg-[#0b1f3a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="max-w-sm">
              <h2 className="text-lg font-bold tracking-tight">
                UPLIFTRA NETWORK
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                Pakistan's professional and career ecosystem connecting
                students, professionals, mentors, recruiters, companies,
                universities, and organizations.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Platform
              </h3>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <a
                  href="/opportunities"
                  className="block transition hover:text-white"
                >
                  Opportunities
                </a>

                <a
                  href="/mentors"
                  className="block transition hover:text-white"
                >
                  Mentors
                </a>

                <a
                  href="/learning"
                  className="block transition hover:text-white"
                >
                  Learning
                </a>

                <a
                  href="/events"
                  className="block transition hover:text-white"
                >
                  Events
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Community
              </h3>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <a
                  href="/about"
                  className="block transition hover:text-white"
                >
                  About Upliftra
                </a>

                <a
                  href="/contact"
                  className="block transition hover:text-white"
                >
                  Contact
                </a>

                <a
                  href="/register"
                  className="block transition hover:text-white"
                >
                  Join Upliftra
                </a>

                <a
                  href="/login"
                  className="block transition hover:text-white"
                >
                  Login
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                For Organizations
              </h3>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <a
                  href="/companies"
                  className="block transition hover:text-white"
                >
                  Companies
                </a>

                <a
                  href="/universities"
                  className="block transition hover:text-white"
                >
                  Universities
                </a>

                <a
                  href="/organizations"
                  className="block transition hover:text-white"
                >
                  Organizations
                </a>

                <a
                  href="/partners"
                  className="block transition hover:text-white"
                >
                  Partnerships
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Upliftra Network. All rights
              reserved.
            </p>

            <div className="flex flex-wrap gap-5">
              <a
                href="/privacy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="/terms"
                className="transition hover:text-white"
              >
                Terms of Service
              </a>

              <a
                href="/cookies"
                className="transition hover:text-white"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
