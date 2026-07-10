import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Home, Stethoscope, Phone, LogIn, X, Menu } from 'lucide-react';

const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/doctors", label: "Find Doctors", mobileLabel: "All Doctors", icon: Stethoscope },
    { to: "/contact", label: "Support", icon: Phone },
];

const navClass = ({ isActive }) =>
    `flex flex-col md:flex-row text-xs md:text-sm items-center gap-1 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''}`;

const mobileNavClass = ({ isActive }) =>
    `flex py-2 text-xs md:text-sm items-center gap-2 sm:gap-3 sm:py-2 cursor-pointer border-b-2 border-transparent hover:border-b-indigo-600 transition-all duration-500 ${isActive ? 'border-b-indigo-600' : ''}`;




const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='bg-white fixed top-0 left-0 w-full transition-all duration-300 z-50 px-6'>
            {/* Top */}
            <div className='flex justify-between text-sm py-4 border-b border-b-indigo-600 cursor-pointer'>

                <Link to="/" className='flex items-center gap-1'>
                    <p className='sm:text-2xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent'>
                        bookmydoctor
                    </p>
                </Link>

                {/* Desktop */}
                <ul className='hidden md:flex items-start gap-6 sm:gap-16'>
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink key={to} to={to} className={navClass}>
                            <Icon className="w-4 h-4 text-indigo-600" />
                            <li className='py-1 text-slate-700 hover:text-slate-600'>{label}</li>
                            <hr className='border-none outline-none h-0.5 bg-slate-600 m-auto hidden' />
                        </NavLink>
                    ))}
                </ul>

                <div>
                    <Link to="/login"
                        className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-light hidden md:flex gap-2'>
                        <LogIn className="w-4 h-4 text-white" />
                        Login
                    </Link>

                    <div className='md:hidden' onClick={() => setShowMenu(!showMenu)}>
                        {showMenu
                            ? <X className="w-4 h-4 text-indigo-600" />
                            : <Menu className="w-4 h-4 text-indigo-600" />}
                    </div>
                </div>
            </div>


            {/* Mobile */}
            {showMenu && (
                <div className='h-screen md:hidden px-6 py-2 bg-white text-slate-700 rounded-md '>
                    <ul className='flex flex-col items-center gap-2'>

                        {navItems.map(({ to, label, mobileLabel, icon: Icon }) => (
                            <NavLink key={to}
                                to={to}
                                onClick={() => setShowMenu(false)}
                                className={mobileNavClass}>
                                <Icon className="w-4 h-4 text-indigo-600" />
                                <li className='py-1'>{mobileLabel || label}</li>
                                <hr className='border-none outline-none h-0.5 bg-white m-auto hidden' />
                            </NavLink>
                        ))}

                        <NavLink to="/login"
                            onClick={() => setShowMenu(false)}
                            className={mobileNavClass}>
                            <LogIn className="w-4 h-4 text-indigo-600" />
                            Login
                        </NavLink>

                    </ul>
                </div>
            )}

        </div>
    )
}

export default Navbar
