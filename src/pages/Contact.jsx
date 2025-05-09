import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='min-h-screen mb-20'>
      <h1 className='text-center font-semibold text-xl sm:text-3xl text-gray-600 p-2 rounded-lg mb-6'>CONTACT US</h1>

      <div className='flex justify-center flex-col sm:flex-row gap-10'>
        <img className='max-w-80' src={assets.contact_image} alt="" />
        <div className='text-sm text-gray-700 my-6 space-y-6'>
          <h2 className='font-semibold'>OUR OFFICE</h2>
          <p>Saratpally, Golapbag <br />
          Burdwan, WB, India
          <br />
          713104</p>

          <h2 className='font-semibold'>CONTACT SUPPORT </h2>
          <p>Ph : +91 9635473546  <br />
          Email : saikatservices@gmail.com</p>
          <div className='flex gap-4'>
          <button onClick={() => window.location.href = "tel:+919635473546"} className='py-2 px-6 border border-indigo-800 hover:bg-gradient-to-r from-indigo-500 to-purple-600 hover:text-white transition-all duration-300'>Call Us</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact