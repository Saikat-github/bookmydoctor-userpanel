import React, { useContext } from 'react'
import { ArrowDown, User2Icon, X, XCircle, XCircleIcon, XIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const RecentSearches = ({ suggestions, setSuggestions }) => {

    const clearHistory = () => {
        localStorage.removeItem("searchHistory");
        setSuggestions([]);
    };


    return (
        <div className='p-4 rounded text-xs text-slate-700 bg-white shadow-xl space-y-2'>
            <div className='flex justify-between' onClick={clearHistory}>
                <p className='flex items-center gap-1'>
                    Recent Searches
                    <ArrowDown className='w-4'/>
                </p>
                <p className='flex items-center gap-1 hover:cursor-pointer'>
                    Clear 
                    <XCircle className='w-4'/>
                </p>
            </div>
            {
                suggestions.length > 0
                &&
                suggestions.map((doctor) => (
                    <Link className='flex items-start gap-2 border-b p-1' key={doctor._id}
                        to={`/appointments/${doctor._id}`}
                        state={{ from: 'homepage' }}>
                        <User2Icon className='text-indigo-600' />
                        <p className='hover:text-slate-900'>
                            Dr {doctor?.personalInfo?.name}
                            <br />
                            <span>
                                {doctor?.professionalInfo?.speciality}
                            </span>
                            <br />
                            <span className='text-slate-500 hover:text-slate-700'>{doctor?.clinicInfo?.pincode}, {doctor?.clinicInfo?.address}</span>
                        </p>
                    </Link>
                ))
            }
        </div>
    )
}

export default RecentSearches