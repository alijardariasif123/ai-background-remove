import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/appContext'

const Header = () => {

    const {removeBg} = useContext(AppContext)

  return (
    <div className='flex item-center justify-between max-sm:flex-col-reverse gap-y-20 px-4 mt-20 lg:px-44 sm:mt-20'>
        {/* ---------------let side---------------- */}
        <div>
            <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 '>
                Remove the <br className='max-md:hidden'/><span className='bg-gradient-to-r from-blue-700 to-fuchsia-800 bg-clip-text text-transparent'>background</span> from <br className='max-md:hidden'/> images for free.
            </h1>
            <p className='my-6 text-[13px] text-gray-600'>Effortlessly remove backgrounds from images for free with AI-powered precision. <br className='max-sm:hidden'/> Get clean, high-quality cutouts in seconds—no software or expertise needed!</p>
            <div>
                <input onChange={e => removeBg(e.target.files[0])} type='file' accept='image/*' id='upload1' hidden/>
                <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-blue-700 to-fuchsia-800 m-auto hover:scale-105 transition-all duration-700' htmlFor='upload1'>
                    <img width={20} src={assets.upload_btn_icon} alt="" />
                    <p className='text-white text-sm'>Upload your image</p>
                </label>
            </div>
        </div>
        {/* ---------------right side---------------- */}
        <div className='w-full max-w-[430px] '>
            <img src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header