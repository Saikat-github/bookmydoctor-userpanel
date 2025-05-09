import React from 'react'
import { GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const SingleDoctor = ({ doctor }) => {

    return (
        <Link
            to={`/appointments/${doctor._id}`}
            state={{ from: 'alldoctors' }}
            className='shadow-lg rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 max-sm:flex'
        >
            <img className='bg-gradient-to-r from-indigo-500 to-purple-600 max-sm:w-32' src={doctor?.personalInfo?.image} alt={doctor?.personalInfo?.name} />
            <div className='sm:p-4 p-2 sm:space-y-2 space-y-0.5'>
                <p className='text-slate-700 text-lg max-sm:text-sm font-medium'>Dr. {doctor.personalInfo.name}</p>
                <p className='text-slate-700 text-xs sm:text-sm flex items-start gap-2'>
                    <GraduationCap />
                    {doctor?.
                        professionalInfo?.speciality}
                    <br />
                    {doctor?.professionalInfo?.experience} years exp.
                </p>

                <p className='text-slate-700 text-xs flex items-start gap-2 max-sm:text-[0.7rem]'>
                    <MapPin className=''/>
                    {doctor?.clinicInfo?.address},
                    <br />
                    {doctor?.clinicInfo?.pincode}
                </p>
            </div>
        </Link>
    )
}

export default SingleDoctor