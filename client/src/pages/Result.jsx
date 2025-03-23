import React from 'react'
import { assets } from '../assets/assets'
const Result = () => {
  return (
    <div className='mx-4 my-3 lg:mx-44 mt-12 min-h-[69vh]'>
      <div className='bg-white rounded-xl px-8 py-2 drop-shadow-sm'>
        {/* Image Container */}
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
          {/* ---------Left Side--------- */}
          <div>
            <p className='font-semibold text-gray-600 mb-2'>Original</p>
            <img className='rounded-lg border-gray-300' src={assets.image_w_bg} alt="" />
          </div>
          {/* ---------Right Side--------- */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-600 mb-2'>Background Removed</p>
            <div className='rounded-lg border  border-gray-300 h-full relative bg-layer overflow-hidden'>
              {/* <img src={assets.image_wo_bg} alt="" /> */}
              {/* <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
                <div className='border-6 border-blue-700 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
              </div> */}
            </div>
          </div>
        </div>
        {/* -------Buttons-------- */}
        <div className='flex items-center justify-between mt-6 sm:justify-end flex-wrap gap-4'>
          <button className=' px-8 py-2.5 text-blue-700 text-sm border border-blue-700 px-4 py-2 rounded-full hover:scale-105 transition-all duration-700'>Try another image</button>
          <a className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-blue-700 to-fuchsia-800 px-4 py-2 rounded-full hover:scale-105 transition-all duration-700' href="">Download image</a>
        </div>
      </div>
    </div>
  )
}

export default Result