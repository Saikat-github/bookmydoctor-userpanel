import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { Home, Stethoscope, Phone, Search, LogIn, X, Menu } from 'lucide-react';


const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { token, userData, logout } = useContext(AppContext);
    const navigate = useNavigate();



    return (

        <div className='flex flex-col relative'>
            <div className='flex justify-between text-sm py-4 border-b border-b-indigo-600 cursor-pointer'>
                <div onClick={() => navigate("/")} className='flex items-center justify-center gap-1'>
                    <p className='sm:text-2xl sm:block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
                        bookmydoctor.
                    </p>
                </div>
                <ul className='hidden md:flex items-start gap-6 sm:gap-16'>
                    <NavLink className={({ isActive }) =>
                        `flex flex-col md:flex-row text-xs md:text-sm items-center gap-1 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''
                        }`} to="/">
                        <Home className="w-4 h-4 text-indigo-600" />
                        <li className='py-1 text-slate-700 hover:text-slate-600'>Home</li>
                        <hr className='border-none outline-none h-0.5 bg-slate-600 m-auto hidden' />
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `flex flex-col md:flex-row text-xs md:text-sm items-center gap-1 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''
                        }`} to="/doctors">
                        <Stethoscope className="w-4 h-4 text-indigo-600" />
                        <li className='py-1 text-slate-700 hover:text-slate-600'>Find Doctors</li>
                        <hr className='border-none outline-none h-0.5 bg-slate-600 m-auto hidden' />
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `flex flex-col md:flex-row text-xs md:text-sm items-center gap-1 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''
                        }`} to="/contact">
                        <Phone className="w-4 h-4 text-indigo-600" />
                        <li className='py-1 text-slate-700 hover:text-slate-600'>Support</li>
                        <hr className='border-none outline-none h-0.5 bg-slate-600 m-auto hidden' />
                    </NavLink>
                </ul>
                <div>
                    {token && userData
                        ?
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                        </div>
                        :
                        <Link to="/login" className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-light hidden md:flex gap-2'>
                            <LogIn className="w-4 h-4 text-white" />
                            Login
                        </Link>
                    }
                    <div className='md:hidden' onClick={() => setShowMenu(!showMenu)}>
                        {!showMenu
                            ?
                            <Menu className="w-4 h-4 text-indigo-600" />
                            :
                            <X className="w-4 h-4 text-indigo-600" />
                        }
                    </div >
                </div>
            </div>
            {
                showMenu &&
                <div className={`absolute right-0 top-12 md:hidden z-20 px-6 py-2 bg-white shadow-md shadow-indigo-600 text-slate-700 rounded-md mb-5`}>
                    <ul className='flex flex-col items-start gap-2'>
                        <NavLink className={({ isActive }) =>
                        `flex py-2 md:flex-row text-xs md:text-sm items-center gap-2 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''
                        }`} onClick={() => setShowMenu(false)} to="/">
                            <Home className="w-4 h-4 text-indigo-600" />
                            <li className='py-1 hover'>Home</li>
                            <hr className='border-none outline-none h-0.5 bg-white m-auto hidden' />
                        </NavLink>
                        <NavLink className={({ isActive }) =>
                        `flex py-2 md:flex-row text-xs md:text-sm items-center gap-2 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''
                        }`} onClick={() => setShowMenu(false)} to="/doctors">
                            <Stethoscope className="w-4 h-4 text-indigo-600" />
                            <li className='py-1 hover'>All Doctors</li>
                            <hr className='border-none outline-none h-0.5 bg-white m-auto hidden' />
                        </NavLink>
                        <NavLink className={({ isActive }) =>
                        `flex py-2 md:flex-row text-xs md:text-sm items-center gap-2 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''
                        }`} onClick={() => setShowMenu(false)} to="/contact">
                            <Phone className="w-4 h-4 text-indigo-600" />
                            <li className='py-1'>Support</li>
                            <hr className='border-none outline-none h-0.5 bg-white m-auto hidden' />
                        </NavLink>
                        <NavLink className={({ isActive }) =>
                        `flex py-2 md:flex-row text-xs md:text-sm items-center gap-2 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''
                        }`} onClick={() => setShowMenu(false)} to="/login">
                            <LogIn className="w-4 h-4 text-indigo-600" />
                            Login
                        </NavLink>
                    </ul>
                </div>
            }

        </div>
    )
}

export default Navbar