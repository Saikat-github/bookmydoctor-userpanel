import { useContext, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { SingleDoctorProfile } from '../../components';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';





const SingleDoctor = () => {
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [loader, setLoader] = useState(false);

  const { doctors, backendUrl } = useContext(AppContext);
  const { docAuthId } = useParams();

  const getSingleDoctor = async () => {
    try {
      setLoader(true);
      const res = await axios.get(backendUrl + "/api/user/single-doc", { params: { docAuthId } })
      if (res.data.success) {
        setSelectedDoc(res.data.doctor)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error('Error fetching doctor details');
    } finally {
      setLoader(false);
    }
  }


  useEffect(() => {
    const found = doctors.find((d) => d.docAuthId === docAuthId);
    if (found) {
      setSelectedDoc(found);
    } else {
      getSingleDoctor();
    }
  }, [docAuthId]);


  if (loader) return (
    <Loader2 className='w-5 animate-spin mx-auto my-60 text-indigo-600' />
  )


  return (
    <div className='mb-60'>
      <SingleDoctorProfile doctorData={selectedDoc} />
    </div>
  )
}

export default SingleDoctor