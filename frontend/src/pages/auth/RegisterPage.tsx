import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/upliftra-logo.png'

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:hidden">
        <img
          src={logo}
          alt="Upliftra Network"
          className="mx-auto h-12 w-auto object-contain"
        />
      </div>

      <div className="mb-7">
        <p className="text-sm font-semibold text-[#1769e0]">
          Join Upliftra
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#5e6b7d]">
          Build your profile, discover opportunities, connect with people,
          and grow your career.
        </p>
      </div>

      <form className="space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-semibold text-[#172033]"
          >
            Full name
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            className="h-12 w-full rounded-xl border border-[#dce3ec] bg-white px-4 text-sm text-[#172033] shadow-sm transition placeholder:text-[#8b96a7] focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10"
          />
        </div>

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
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-semibold text-[#172033]"
          >
            I am joining as
          </label>

          <select
            id="role"
            name="role"
            defaultValue=""
            className="h-12 w-full rounded-xl border border-[#dce3ec] bg-white px-4 text-sm text-[#172033] shadow-sm transition focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10"
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="mentor">Mentor</option>
            <option value="recruiter">Recruiter / Company</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-[#172033]"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Create a strong password"
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold text-[#172033]"
          >
            Confirm password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              className="h-12 w-full rounded-xl border border-[#dce3ec] bg-white px-4 pr-20 text-sm text-[#172033] shadow-sm transition placeholder:text-[#8b96a7] focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((value) => !value)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-[#5e6b7d] transition hover:bg-[#f4f7fb] hover:text-[#1769e0]"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 rounded border-[#c8d2df] text-[#1769e0] focus:ring-[#1769e0]/20"
          />

          <span className="text-sm leading-5 text-[#5e6b7d]">
            I agree to Upliftra Network's{' '}
            <Link
              to="/terms"
              className="font-semibold text-[#1769e0] hover:text-[#0b1f3a]"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to="/privacy"
              className="font-semibold text-[#1769e0] hover:text-[#0b1f3a]"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#1769e0] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b1f3a] focus:outline-none focus:ring-4 focus:ring-[#1769e0]/20"
        >
          Create account
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
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-[#1769e0] transition hover:text-[#0b1f3a]"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage