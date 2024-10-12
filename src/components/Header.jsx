import React from 'react'
import Logoimg from '../assets/images/logo.png'

function Header() {
  return (
    <header className='py-4 px-10 bg-[#001529] border-white border-b-[2px]'>
      <div className='flex items-center space-x-6'>
        <img className='scale-125' src={Logoimg} alt="ogo img" width={40} height={40} />
        <h2 className='text-white text-2xl font-bold'>Admin panel</h2>
      </div>
    </header>
  )
}

export default Header
