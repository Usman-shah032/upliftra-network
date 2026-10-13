import { Link } from 'react-router-dom'
import logo from '../../assets/upliftra-logo.png'

function VerifyEmailPage() {
  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:hidden">
        <img
          src={logo}
          alt="Upliftra Network"
          className="mx-auto h-12 w-auto object-contain"
        />
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eff6ff]">
          <span className="text-2xl text-[#1769e0]">✉</span>
        </div>

        <p className="mt-6 text-sm font-semibold text-[#1769e0]">
          Email verification
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033]">
          Verify your email
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5e6b7d]">
          We've sent a verification link to your email address. Please check
          your inbox and click the link to verify your Upliftra Network
          account.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-[#dce3ec] bg-white p-5 text-center shadow-sm">
        <p className="text-sm font-semibold text-[#172033]">
          Didn't receive the email?
        </p>

        <p className="mt-2 text-xs leading-5 text-[#8b96a7]">
          Check your spam or junk folder. You can also request a new
          verification email.
        </p>

        <button
          type="button"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-xl border border-[#dce3ec] bg-white px-5 text-sm font-semibold text-[#1769e0] transition hover:border-[#1769e0] hover:bg-[#f8faff]"
        >
          Resend verification email
        </button>
      </div>

      <div className="mt-7 space-y-3 text-center">
        <Link
          to="/login"
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#1769e0] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b1f3a] focus:outline-none focus:ring-4 focus:ring-[#1769e0]/20"
        >
          Continue to sign in
        </Link>

        <Link
          to="/"
          className="inline-flex text-sm font-semibold text-[#5e6b7d] transition hover:text-[#1769e0]"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default VerifyEmailPage