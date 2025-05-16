import { useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { DoctorProfileCard } from '../components';



const Appoinments = () => {
  const { doctorId } = useParams();
  const { doctors, searchResults } = useContext(AppContext);
  const location = useLocation();
  const fromPage = location.state?.from;

  let selectedDoc = null;
if (fromPage === "homepage" && searchResults.length > 0) {
    selectedDoc = searchResults.filter((d) => (d._id === doctorId))[0]
} else {
  selectedDoc = doctors.filter((d) => (d._id === doctorId))[0]
}


  return (
    <div className='mb-60'>
      <DoctorProfileCard doctorData={selectedDoc} />
    </div>
  )
}

export default Appoinments






























// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams, useLocation } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import { BookingForm, DoctorProfileCard } from '../components';
// import { Loader2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import axios from 'axios';



// const Appoinments = () => {
//   const [loader, setLoader] = useState(false);
//   const [docDetails, setDocDetails] = useState(null);
  
//   const { doctorId } = useParams();
//   const navigate = useNavigate();
//   const { backendUrl } = useContext(AppContext);
//   const location = useLocation();
//   const fromPage = location.state?.from;


//   useEffect(() => {
//     const getSingleDoctor = async () => {
//       try {
//         setLoader(true);
//         const res = await axios.get(`${backendUrl}/api/user/get-doctor`, {
//           params: {
//             docId: doctorId
//           }
//         });
//         console.log(res)
//         if (res.data.success) {
//           setDocDetails(res.data.profileData)
//         } else {
//           toast.error(res.data.message);
//         }
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//       } finally {
//         setLoader(false);
//       }
//     }

//     getSingleDoctor();
//   }, [])


//   return (
//     <div className='mb-60'>
//       {docDetails
//         ?
//         <DoctorProfileCard doctorData={docDetails} />
//         :
//         <Loader2 className='w-10 animate-spin mx-auto my-10 text-indigo-600' />
//       }
//     </div>
//   )
// }

// export default Appoinments