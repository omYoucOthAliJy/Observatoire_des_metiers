import React, { PropsWithChildren } from 'react'
import SideBar from '../profile/Sidebar'

function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white flex" style={{ alignItems: "stretch" }}>
      <SideBar  />
      <div className="lg:container text-black p-8 mt-16 flex items-start justify-center mx-auto">
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout