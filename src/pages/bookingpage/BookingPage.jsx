import React from 'react'
import { useParams } from "react-router-dom";
import { BookingForm } from '../../components';


const BookingPage = () => {
    const { docAuthId } = useParams();
  return (
    <BookingForm docAuthId={docAuthId} />
  )
}

export default BookingPage