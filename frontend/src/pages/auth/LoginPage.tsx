import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/upliftra-logo.png'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:hidden">
        <img
          src={logo}
          alt="Upliftra Network"
          className="mx-auto h-12 w-auto object-contain"
        />
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold text-[#1769e0]">
          Welcome back
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
          Sign in to Upliftra
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#5e6b7d]">
          Access your opportunities, connections, learning, and career
          journey.
        </p>
      </div>

      <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-[#172033]"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-[#dce3ec] bg-white px-4 text-sm text-[#172033] shadow-sm transition placeholder:text-[#8b96a7] focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#172033]"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-[#1769e0] transition hover:text-[#0b1f3a]"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="h-12 w-full rounded-xl border border-[#dce3ec] bg-white px-4 pr-20 text-sm text-[#172033] shadow-sm transition placeholder:text-[#8b96a7] focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-[#5e6b7d] transition hover:bg-[#f4f7fb] hover:text-[#1769e0]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#c8d2df] text-[#1769e0] focus:ring-[#1769e0]/20"
            />

            <span className="text-sm text-[#5e6b7d]">
              Remember me
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#1769e0] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b1f3a] focus:outline-none focus:ring-4 focus:ring-[#1769e0]/20"
        >
          Sign in
        </button>
      </form>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#dce3ec]" />
        <span className="text-xs font-medium uppercase tracking-wide text-[#8b96a7]">
          or continue with
        </span>
        <div className="h-px flex-1 bg-[#dce3ec]" />
      </div>

      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#dce3ec] bg-white px-5 text-sm font-semibold text-[#172033] shadow-sm transition hover:border-[#1769e0] hover:bg-[#f8faff]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f4f7fb] text-xs font-bold text-[#1769e0]">
          G
        </span>
        Continue with Google
      </button>

      <p className="mt-8 text-center text-sm text-[#5e6b7d]">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-[#1769e0] transition hover:text-[#0b1f3a]"
        >
          Create an account
        </Link>
      </p>

      <p className="mt-6 text-center text-xs leading-5 text-[#8b96a7]">
        By continuing, you agree to Upliftra Network's Terms of Service and
        Privacy Policy.
      </p>
    </div>
  )
}

export default LoginPage