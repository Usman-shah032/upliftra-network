import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/upliftra-logo.png'

function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [updated, setUpdated] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setUpdated(true)
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

      {!updated ? (
        <>
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#1769e0]">
              Account security
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
              Set a new password
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#5e6b7d]">
              Create a strong new password for your Upliftra Network account.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#172033]"
              >
                New password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="Enter your new password"
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

              <p className="mt-2 text-xs text-[#8b96a7]">
                Use at least 8 characters with a combination of letters,
                numbers, and symbols.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-[#172033]"
              >
                Confirm new password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="Re-enter your new password"
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

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#1769e0] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b1f3a] focus:outline-none focus:ring-4 focus:ring-[#1769e0]/20"
            >
              Update password
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdf4]">
            <span className="text-2xl font-bold text-[#16a34a]">✓</span>
          </div>

          <p className="mt-6 text-sm font-semibold text-[#16a34a]">
            Password updated
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
            You're all set
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5e6b7d]">
            Your password has been updated successfully. You can now sign in
            using your new password.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#1769e0] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b1f3a]"
          >
            Continue to sign in
          </Link>
        </div>
      )}
    </div>
  )
}

export default ResetPasswordPage