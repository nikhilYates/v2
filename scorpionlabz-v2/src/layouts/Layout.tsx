import React from 'react'
import '../styles/LayoutStyles.css'

const Layout = ( {children}: {children: React.ReactNode} ) => {
  return (
    <div className='layout-main min-h-screen w-full m-0 p-0'>
        <div className='layout-content h-full w-full m-0 p-0'>
            {children}
        </div>
    </div>
  )
}

export default Layout