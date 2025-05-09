import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-l from-indigo-500 to-purple-600 rounded-lg px-6 md:px-10 lg:px-20'>
        {/* Left Side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-10px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment <br /> With Trusted Doctors</p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt="" />
                <p className='max-sm:hidden'>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free</p>
            </div>
            <Link to="/doctors" className='bg-white px-2 sm:px-4 py-2 flex items-center gap-2 rounded-full text-lg max-sm:text-sm text-slate-700 font-medium hover:gap-3 transition-all duration-500 cursor-pointer' href="#top-doctors">Find Doctors 
            <ArrowRight className='w-6'/></Link>
        </div>

        {/* Right Side */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg max-sm:hidden' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header