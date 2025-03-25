import React from 'react'
// import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'
const Result = () => {
    const {resultImage, image} = useContext(AppContext)
  return (
    <div className='mx-4 my-3 lg:mx-44 mt-12 min-h-[69vh]'>
      <div className='bg-white rounded-xl px-8 py-2 drop-shadow-sm'>
        {/* Image Container */}
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
          {/* ---------Left Side--------- */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-600 mb-2'>Original</p>
            <img className='rounded-lg border border-gray-300' src={image ? URL.createObjectURL(image):''} alt="" />
          </div>
          {/* ---------Right Side--------- */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-600 mb-2'>Background Removed</p>
            <div className='rounded-lg border  border-gray-300 h-full relative bg-layer overflow-hidden'>
              <img src={resultImage ? resultImage : ""} alt="" />
              {
                  !resultImage && image && <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
                  <div className='border-6 border-blue-700 rounded-full h-12 w-12 border-t-transparent animate-spin'></div>
                </div>
              }
             
            </div>
          </div>
        </div>
        {/* -------Buttons-------- */}
        { resultImage && <div className='flex items-center justify-between mt-6 sm:justify-end flex-wrap gap-4'>
          <button className=' px-8 py-2.5 text-blue-700 text-sm border border-blue-700 px-4 py-2 rounded-full hover:scale-105 transition-all duration-700'>Try another image</button>
          <a href={resultImage} download className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-blue-700 to-fuchsia-800 px-4 py-2 rounded-full hover:scale-105 transition-all duration-700' >Download image</a>
        </div> }
      </div>
    </div>
  )
}

export default Result