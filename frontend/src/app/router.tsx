
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage'
import VerifyEmailPage from '../pages/auth/VerifyEmailPage'
import OpportunitiesPage from '../pages/public/OpportunitiesPage'
import MentorsPage from '../pages/public/MentorsPage'
import LearningPage from '../pages/public/LearningPage'
import AuthLayout from '../layouts/AuthLayout'
import PortalLayout from '../layouts/PortalLayout'
import PublicLayout from '../layouts/PublicLayout'

function PortalTest() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="rounded-2xl border border-[#dce3ec] bg-white p-10 shadow-sm">
        <h1 className="text-2xl font-bold text-[#172033]">
          Portal
        </h1>
        <p className="mt-2 text-[#5e6b7d]">
          Portal layout is working.
        </p>
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/opportunities',
        element: <OpportunitiesPage />,
      },
      {
        path: '/mentors',
        element: <MentorsPage />,
      },
      {
        path: '/learning',
        element: <LearningPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmailPage />,
      },
    ],
  },
  {
    element: <PortalLayout />,
    children: [
      {
        path: '/portal',
        element: <PortalTest />,
      },
    ],
  },
])