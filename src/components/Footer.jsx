import React from 'react'
import { useNavigate } from 'react-router-dom'


const Footer = () => {
    const navigate = useNavigate();



    return (
        <div className='mt-48 mb-2 py-10 px-4 bg-purple-600 text-white'>
            <div className='flex justify-around flex-col sm:flex-row gap-4'>
                <div className=''>
                    <h1 className='text-sm font-semibold mb-3'>Support</h1>
                    <ul className='text-xs space-y-1'>
                        <li>+91 9635473546</li>
                        <li>saikatservices@gmail.com</li>
                    </ul>
                </div>
                <ul className='text-xs flex flex-col gap-1'>
                    <li className='text-sm font-semibold mb-3'>Company</li>
                    <li className='cursor-pointer hover:underline' onClick={() => navigate("/about")}>Terms & Condition</li>
                    <li className='cursor-pointer hover:underline' onClick={() => navigate("/about")}>Privacy Policy</li>
                    <a
                        href={import.meta.env.VITE_DOCTOR_PANEL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='hover:underline'>
                        Go To Doctor Panel
                    </a>
                </ul>
            </div>
            <div className='mt-12 text-xs  text-center flex flex-col justify-center gap-4'>
                <div className='flex items-center justify-center gap-2 p-4 bg-white mx-auto'>
                    <p className='sm:text-2xl sm:block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
                        bookmydoctor.
                    </p>
                </div>
                <p className=''>Copyright {new Date().getFullYear()} &copy;bookmydoctor. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer