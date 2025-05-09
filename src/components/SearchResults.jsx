import React, { useContext } from 'react'
import { User2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const SearchResults = ({ results }) => {
  const saveSearch = (doctor) => {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!history.includes(doctor)) {
      history.unshift(doctor); // add to top
      if (history.length > 5) history.pop(); // limit to 5 recent searches
      localStorage.setItem("searchHistory", JSON.stringify(history));
    }
  };



  return (
    <div className='p-4 rounded text-xs hover:text-slate-900 text-slate-700 bg-white shadow-xl space-y-2'>
      {
        results.length > 0
        &&
        results.map((doctor) => (
          <Link className='flex items-start gap-2 border-b p-1' key={doctor._id}
            to={`/appointments/${doctor._id}`}
            state={{ from: 'homepage' }}
            onClick={() => saveSearch(doctor)}>
            <User2Icon className='text-indigo-600' />
            <p>
              {doctor?.personalInfo?.name}
              <br />
              <span className='text-slate-500 hover:text-slate-700'>{doctor?.clinicInfo?.pincode}, {doctor?.clinicInfo?.address}</span>
            </p>
          </Link>
        ))
      }
    </div>
  )
}

export default SearchResults