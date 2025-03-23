import React from 'react'
import { assets, plans } from '../assets/assets'
const BuyCredit = () => {
  return (
    <div className='min-h-[73vh] text-center pt-12 mb-4'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-2'>Our Plans</button>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold mb-6 sm:mb-4'>Choose the plan that's right for you</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div className='bg-white drop-shadow-md border border-gray-200 rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500' key={index}>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${item.price}</span>/{item.credits} Credits
            </p>
            <button className='w-full bg-gray-800 text-white mt-8 py-2.5 rounded-4xl min-w-52 '>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit