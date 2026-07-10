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
  { name: "dermatologist", icon: Droplet },
  { name: "neurologist", icon: Activity },
  { name: "orthopedic surgeon", icon: Bone },
  { name: "pediatrician", icon: Baby },
  { name: "psychiatrist", icon: Brain },
  { name: "general practitioner", icon: Stethoscope },
  { name: "gynecologist", icon: User },
  { name: "ophthalmologist", icon: Eye },
  { name: "urologist", icon: Droplet },
  { name: "dentist", icon: Smile },
  { name: "gastroenterologist", icon: ShieldPlus },
];




const SpecialitySection = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 text-slate-700'>
      <h1 className='text-3xl font-medium sm:mb-6'>Find By Speciality</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-20 pt-5 w-full'>

        {categories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <Link key={idx} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
              to={`/doctors/${category.name}`}>
              <Icon className="w-6 h-6 text-indigo-600" />
              <p className='text-xs sm:text-sm capitalize'>{category.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default SpecialitySection