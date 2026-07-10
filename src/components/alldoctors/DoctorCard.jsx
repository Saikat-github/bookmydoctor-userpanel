import { GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';



const DoctorCard = ({ doctor }) => {
    return (
        <Link
            to={`/doctor/${doctor.docAuthId}`}
            state={{ from: 'alldoctors' }}
            className='group bg-white border border-indigo-200 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col w-60 h-80'
        >
            <img
                className='w-32 h-48 object-cover group-hover:scale-105 transition-transform duration-500 mx-auto'
                src={doctor?.personalInfo?.profileImg}
                alt={doctor?.personalInfo?.name}
            />
            <div className='p-4 space-y-2.5'>
                <p className='text-slate-800 text-lg font-semibold leading-tight'>Dr. {doctor.personalInfo.name}</p>
                <div className='flex items-center gap-2'>
                    <span className='text-[11px] font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded'>
                        {doctor?.professionalInfo?.speciality}
                    </span>
                    <span className='text-xs text-slate-500'>{doctor?.professionalInfo?.experience} yrs exp.</span>
                </div>

                <div className='flex items-start gap-1.5 text-xs text-slate-500 leading-relaxed'>
                    <MapPin className='w-3.5 h-3.5 mt-0.5 shrink-0' />
                    <span>{doctor?.clinicInfo?.city}, {doctor?.clinicInfo?.pincode}</span>
                </div>
            </div>
        </Link>
    )
}

export default DoctorCard