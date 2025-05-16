import { useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AppContext } from '../context/AppContext';
import { SingleDoctor } from '../components';
import { doctorSpecialities } from '../assets/assets';
import { XCircle, Filter, Loader2, ArrowDown } from 'lucide-react';
import { toast } from 'react-toastify';


const DoctorsPage = () => {
  const { speciality } = useParams();
  const { register, watch, setValue } = useForm({
    defaultValues: {
      speciality: speciality || '',
      city: '',
    },
  });
  const { doctors, getDoctorsData, loader, hasNextPage } = useContext(AppContext);
  const selectedSpecialist = watch('speciality');
  const city = watch('city');


  const loadMore = () => {
    if (hasNextPage) getDoctorsData(selectedSpecialist, city);
  };


  const findDoctors = useCallback(async () => {
    try {
      if (!selectedSpecialist && !city) {
        return;
      }
      await getDoctorsData(selectedSpecialist, city);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [selectedSpecialist, city]);


  useEffect(() => {
    const debounce = setTimeout(() => {
      findDoctors();
    }, 400);
    return () => clearTimeout(debounce);
  }, [selectedSpecialist, city]);



  return (
    <div className='mb-20'>
      <div className='max-sm:max-w-lg mx-auto sm:p-4 p-2 rounded-lg shadow-lg shadow-slate-500 max-sm:text-xs bg-white my-4 flex gap-4 flex-col sm:flex-row sm:items-start items-center'>

        {/* Speciality Select */}
        <div className='border border-slate-400 w-full rounded-lg bg-white flex justify-between items-center px-2'>
          <ArrowDown className='w-4 text-slate-500' />
          <select
            {...register('speciality')}
            className='w-full px-1 py-2 rounded-lg focus:outline-none focus:border-indigo-600 transition-all cursor-pointer text-slate-600 max-sm:text-xs'
            aria-label='Select doctor speciality'
          >
            <option value='' className='text-slate-300'>Select speciality</option>
            <option value=''>All</option>
            {doctorSpecialities.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        <p className='text-slate-700 sm:text-xl'>&</p>

        {/* City Input */}
        <div className='w-full rounded-lg bg-white flex justify-between items-center px-2 border border-slate-400'>
          <Filter className='w-4 text-slate-400 max-sm:text-xs' />
          <input
            type='text'
            maxLength={50}
            placeholder='Enter city/town name'
            {...register('city')}
            className='px-2 py-2 w-full outline-none rounded'
            aria-label='Find by city'
          />
          <XCircle
            className={`w-4 cursor-pointer text-slate-700 ${city ? 'inline' : 'hidden'}`}
            onClick={() => setValue('city', '')}
            aria-label='Clear city'
          />
        </div>
      </div>

      {/* Loading & Result States */}
      {loader && <Loader2 className='w-6 animate-spin text-indigo-600 mx-auto my-10' />}
      {!loader && doctors.length === 0 && (
        <p className='text-center text-slate-700 my-10 text-lg'>No doctors found matching your criteria.</p>
      )}

      {/* Doctors List */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-5 gap-y-6'>
        {doctors.map(doctor => (
          <SingleDoctor doctor={doctor} key={doctor?.id || doctor?._id} />
        ))}
      </div>

      {/* Load More */}
      {hasNextPage && (
        loader
          ? <div className='w-10 h-10 border-4 border-t-transparent border-slate-700 animate-spin my-6 rounded-full mx-auto'></div>
          : <button
            className='bg-slate-700 my-6 text-white px-2 py-1 rounded-md hover:bg-opacity-80 transition-all duration-200 w-32 mx-auto block'
            onClick={loadMore}
          >
            Load More...
          </button>
      )}
    </div>
  );
};

export default DoctorsPage;
