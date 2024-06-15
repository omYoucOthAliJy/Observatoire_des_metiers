import React, { PropsWithChildren } from 'react'
import SideBar from '../profile/Sidebar'

function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-[100%] bg-white flex overflow-y-scroll" style={{ alignItems: "stretch" }}>
      <SideBar  />
      <div className="w-full text-black p-8 mt-16 flex items-start justify-center mx-auto h-full">
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout