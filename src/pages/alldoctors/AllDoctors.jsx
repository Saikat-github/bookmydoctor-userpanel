import { useContext } from 'react';
import { Loader2 } from 'lucide-react';
import { DocCardSkeleton, DoctorCard, SearchBar } from '../../components';
import { AppContext } from '../../context/AppContext';




const AllDoctors = () => {
  const { doctors, getDoctorsData, loader, hasNextPage } = useContext(AppContext);

  const loadMore = () => {
    if (hasNextPage) getDoctorsData(selectedSpecialist, city);
  };



  return (
    <div className='mb-20'>

      {/* Searchbar */}
      <SearchBar />

      {!loader && doctors.length === 0 && (
        <p className='text-center text-slate-700 my-10 text-lg'>No doctors found matching your criteria.</p>
      )}

      {/* Doctors List */}
      <div className='flex flex-wrap justify-center items-center mx-auto gap-4 pt-5'>
        {doctors?.map(doctor => (
          <DoctorCard doctor={doctor} key={doctor?._id} />
        ))}
      </div>


      {/* Loading & Result States */}
      {loader && <>
        <DocCardSkeleton />
      </>}


      {/* Load More */}
      {hasNextPage && !loader && 
        <button
          className='bg-indigo-600 my-6 text-white px-2 py-1 rounded-md hover:bg-opacity-80 transition-all duration-200 w-32 mx-auto block'
          onClick={loadMore}
        >
          Load More...
        </button>
      }
    </div>
  );
};

export default AllDoctors;
