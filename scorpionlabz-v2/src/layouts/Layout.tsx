import React from 'react'
import '../styles/LayoutStyles.css'

const Layout = ( {children}: {children: React.ReactNode} ) => {
  return (
    <div className='layout-main'>
        <div className='layout-content'>
            {children}
        </div>
    </div>
  )
}

export default Layout