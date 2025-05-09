import React, { useContext, useState } from 'react';
import {
    Phone,
    MapPin,
    Languages,
    IndianRupee,
    GraduationCap,
    Clock,
    Building
} from 'lucide-react';

import { assets } from '../assets/assets.js';
import { ChevronDown } from "lucide-react";
import RealTimeStatus from './RealTimeStatus';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom'



const DoctorProfileCard = ({ doctorData }) => {
    const [expanded, setExpanded] = useState(false);
    let availableDays = Object.keys(doctorData?.availability?.workingDays || {});
    const navigate = useNavigate();

    const { getNextDates, setQRCodeData, setApiData } = useContext(AppContext);
    let nearestDate = getNextDates(availableDays)[0]?.date;

    // Early return if no data
    if (!doctorData) {
        return (
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <p className="text-slate-700">No doctor information available</p>
            </div>
        );
    }

    const {
        _id,
        verified,
        personalInfo = {},
        professionalInfo = {},
        clinicInfo = {},
        availability = { workingDays: {} }
    } = doctorData;

    const formatTime = (time) => {
        if (!time) return '';
        return new Date(`2025-02-09T${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };


    const getAvailableDays = () => {
        if (!availability.workingDays) return [];
        return Object.entries(availability.workingDays).map(([day, slots]) => ({
            day,
            slots: Array.isArray(slots) ? slots.map(slot =>
                `${formatTime(slot.start)} - ${formatTime(slot.end)}`
            ) : []
        }));
    };


    const onClickHandler = () => {
        setApiData(null);
        setQRCodeData(null);
        navigate(`/book-appointment/${doctorData._id}`);
    }


    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg pb-4">
            <div className="flex flex-col sm:flex-row gap-8 sm:justify-between items-center p-2 sm:p-6">

                <div className="space-y-2 flex flex-col items-center">
                    <img
                        src={personalInfo.image || '/api/placeholder/128/128'}
                        alt={personalInfo.name || 'Doctor'}
                        className="w-32 h-32 rounded-full object-cover bg-gradient-to-r from-indigo-500 to-purple-600"
                    />
                    <h2 className="text-2xl font-bold text-slate-700 flex gap-1 items-center">
                        Dr. {personalInfo.name || 'Name Not Available'} <img src={verified && assets.verified_icon} className='w-4' alt="" />
                    </h2>
                    <p className="text-sm sm:text-lg text-indigo-600">
                        {professionalInfo.speciality || 'Specialty Not Available'}
                    </p>
                    <div className="flex items-center gap-2 text-slate-700 text-sm sm:text-lg">
                        <GraduationCap className='w-5' />
                        <span>
                            {professionalInfo.degree || 'Degree Not Available'}
                            {professionalInfo.experience && ` • ${professionalInfo.experience} years experience`}
                        </span>
                    </div>
                    {
                        availability.isAvailable

                            ?
                            <div className='flex items-center gap-2 text-green-500 text-sm sm:text-lg'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                <p>Available</p>
                            </div>
                            :
                            <div className='flex items-center gap-2 text-sm sm:text-lg text-red-500'>
                                <p className='w-2 h-2 bg-red-500 rounded-full'></p>
                                <p>Not Available</p>
                            </div>
                    }
                    {
                        doctorData?.availability?.isAvailable
                            ?
                            <p onClick={onClickHandler} className='cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2  rounded-full hover:opacity-90 transition flex justify-center mt-1 w-full mx-auto text-center max-sm:text-sm'>Book Appointment</p>
                            :
                            <p className='bg-red-600 bg-opacity-70 text-white px-4 py-2  rounded-full transition flex justify-center mt-1 w-full mx-auto text-center max-sm:text-sm'>Doctor Not Available</p>
                    }
                    <button
                        onClick={() => navigate(`/otp-verification/${doctorData._id}`)}
                        className='cursor-pointer bg-slate-700 text-white px-4 py-2  rounded-full hover:bg-opacity-90 transition flex justify-center mt-1 w-full mx-auto text-center max-sm:text-sm'>Get Your Lost QR</button>
                </div>
                <RealTimeStatus date={nearestDate} doctorId={_id} avgTime={clinicInfo?.avgCheckTime} />
            </div>
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 px-4 py-2 my-4 border-2 border-slate-700 text-slate-700 font-medium text-sm mx-auto rounded-full transition-all duration-300 active:scale-95"
            >
                {expanded ? "Show Less" : "Show More Details"}
                <ChevronDown
                    className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""
                        }`}
                />
            </button>


            {
                expanded
                    ?
                    <div className="p-6 space-y-6 text-xs sm:text-sm">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Consultation Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800">Consultation Details</h3>
                                <div className="space-y-3">
                                    {clinicInfo.fees !== undefined && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <IndianRupee className='w-5' />
                                            <span>Consultation Fee: ₹{clinicInfo.fees}</span>
                                        </div>
                                    )}
                                    {clinicInfo.avgCheckTime && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Clock className='w-5' />
                                            <span>Average Consultation: {clinicInfo.avgCheckTime} mins</span>
                                        </div>
                                    )}
                                    {personalInfo.language && personalInfo.language.length > 0 && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Languages className='w-5' />
                                            <span>Languages: {personalInfo.language.join(', ')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Contact & Location */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800">Contact & Location</h3>
                                <div className="space-y-3">
                                    {clinicInfo.phoneNumber && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Phone className='w-5' />
                                            <span>{clinicInfo.phoneNumber}</span>
                                        </div>
                                    )}
                                    {clinicInfo.city && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Building className='w-5' />
                                            <span>{clinicInfo.city}, {clinicInfo.pincode}</span>
                                        </div>
                                    )}
                                    {clinicInfo.address && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <MapPin className='w-5' />
                                            <span>{clinicInfo.address}, {clinicInfo.pincode}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Availability Schedule */}
                        {availability.workingDays && Object.keys(availability.workingDays).length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">Available Time Slots</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
                                    {getAvailableDays().map(({ day, slots }) => (
                                        <div key={day} className="bg-slate-200 p-4 rounded-lg">
                                            <h4 className="font-medium text-slate-800 mb-2">{day}</h4>
                                            {slots.map((slot, index) => (
                                                <div key={index} className="text-slate-800">
                                                    {slot}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    :
                    <></>
            }
        </div>
    );
};

export default DoctorProfileCard;