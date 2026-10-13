import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/upliftra-logo.png'

function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:hidden">
        <img
          src={logo}
          alt="Upliftra Network"
          className="mx-auto h-12 w-auto object-contain"
        />
      </div>

      {!submitted ? (
        <>
          <div className="mb-8">
            <Link
              to="/login"
              className="mb-6 inline-flex items-center text-sm font-semibold text-[#5e6b7d] transition hover:text-[#1769e0]"
            >
              ← Back to sign in
            </Link>

            <p className="text-sm font-semibold text-[#1769e0]">
              Account recovery
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
              Forgot your password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#5e6b7d]">
              Enter the email address associated with your Upliftra account
              and we'll send you instructions to reset your password.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleSubmit}
          >
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
                required
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-[#dce3ec] bg-white px-4 text-sm text-[#172033] shadow-sm transition placeholder:text-[#8b96a7] focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10"
              />
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#1769e0] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b1f3a] focus:outline-none focus:ring-4 focus:ring-[#1769e0]/20"
            >
              Send reset instructions
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#5e6b7d]">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#1769e0] transition hover:text-[#0b1f3a]"
            >
              Sign in
            </Link>
          </p>
        </>
      ) : (
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eff6ff]">
            <span className="text-2xl text-[#1769e0]">✓</span>
          </div>

          <p className="mt-6 text-sm font-semibold text-[#1769e0]">
            Check your inbox
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
            Reset link sent
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5e6b7d]">
            If an account exists with that email address, you'll receive
            instructions to reset your password.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#1769e0] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b1f3a]"
          >
            Back to sign in
          </Link>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 text-sm font-semibold text-[#1769e0] transition hover:text-[#0b1f3a]"
          >
            Try another email
          </button>
        </div>
      )}
    </div>
  )
}

export default ForgotPasswordPage