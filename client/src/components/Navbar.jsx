import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/appContext'
import { useEffect } from 'react'
import { useContext } from 'react'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()
  const { credit, loadCreditsData } = useContext(AppContext)

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData()
    }

  }, [isSignedIn, loadCreditsData])

  return (
    <div className='flex item-center justify-between mx-4 py-3 lg:mx-44'>
      <Link to={'/'}><img className='w-32 sm:w-44' src={assets.logo} alt="logo" /></Link>
      {
        isSignedIn
          ? <div className='flex items-center gap-2 sm:gap-3'>
            <button className='flex items gap-2 bg-gradient-to-r from-blue-700 to-fuchsia-800 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700'>
              <img className='w-4 sm:w-5' src={assets.credit_icon} alt="" />
              <p className='text-xs sm:text-sm font-medium text-white'>Credits : {credit}</p>
            </button>
            <p className='text-gray-700 max-sm:hidden'>Hi, {user.fullName}</p>
            <UserButton />
          </div>
          : <button onClick={() => openSignIn({})} className='flex bg-zinc-800 text-white gap-4 px-4 py-2 sm:px-6 sm:py-3 text-sm rounded-full'>
            Get Started <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="arrow" />
          </button>
      }

    </div>
  )
}

export default Navbar