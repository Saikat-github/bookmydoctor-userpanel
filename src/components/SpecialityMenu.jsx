import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import {
  Heart,
  Droplet,
  Brain,
  Bone,
  Baby,
  Stethoscope,
  User,
  Eye,
  Activity,
  ShieldPlus,
  Zap,
  Smile
} from 'lucide-react';

const categories = [
  { name: "Cardiologist", icon: Heart },
  { name: "Dermatologist", icon: Droplet },
  { name: "Neurologist", icon: Activity },
  { name: "Orthopedic Surgeon", icon: Bone },
  { name: "Pediatrician", icon: Baby },
  { name: "Psychiatrist", icon: Brain },
  { name: "General Practitioner", icon: Stethoscope },
  { name: "Gynecologist", icon: User },
  { name: "Ophthalmologist", icon: Eye },
  { name: "Urologist", icon: Droplet },
  { name: "Dentist", icon: Smile },
  { name: "Gastroenterologist", icon: ShieldPlus },
];


const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 text-slate-700'>
      <h1 className='text-3xl font-medium sm:mb-6'>Find By Speciality</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-20 pt-5 w-full'>

        {categories.map((category, idx) => {
          const Icon = category.icon;
        return (
          <Link key={idx} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' to={`/doctors/${category.name}`}>
            <Icon className="w-6 h-6 text-indigo-600" />
            <p className='text-xs sm:text-sm'>{category.name}</p>
          </Link>
        );
      })}
      </div>
    </div>
  )
}

export default SpecialityMenu