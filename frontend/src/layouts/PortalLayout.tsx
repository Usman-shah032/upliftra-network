import { Outlet } from 'react-router-dom'

function PortalLayout() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#172033]">
      <div className="min-h-screen">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default PortalLayout