import { useContext, useState, useMemo, useCallback } from 'react';
import {
    Phone,
    MapPin,
    Languages,
    IndianRupee,
    GraduationCap,
    Clock,
    Building,
    ChevronDown,
    Verified
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNextDates, formatTime } from '../../utils/utilFunctions.js';
import { assets } from '../../assets/assets.js';
import RealTimeStatus from './RealTimeStatus';
import { AppContext } from '../../context/AppContext';





const SingleDoctorProfile = ({ doctorData }) => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const { setQRCodeData } = useContext(AppContext);


    // Extract values with safe fallbacks to prevent errors
    const {
        docAuthId = '',
        verified = false,
        personalInfo = {},
        professionalInfo = {},
        clinicInfo = {},
        availability = { workingDays: {} }
    } = doctorData || {};


    const availableDays = useMemo(() =>
        Object.keys(availability?.workingDays || {}),
        [availability?.workingDays]
    );

    const nearestDate = useMemo(() =>
        getNextDates(availableDays)[0]?.date,
        [getNextDates, availableDays]
    );

    const availableDaySlots = useMemo(() => {
        if (!availability.workingDays) return [];
        return Object.entries(availability.workingDays).map(([day, slots]) => ({
            day,
            slots: Array.isArray(slots)
                ?
                slots.map(slot =>
                    `${formatTime(slot.start)} - ${formatTime(slot.end)}`
                )
                :
                []
        }));
    }, [availability.workingDays]);


    const handleBookAppointment = useCallback(() => {
        setQRCodeData(null);
        navigate(`/booking-page/${docAuthId}`);
    }, [docAuthId, setQRCodeData]);


    const handleGetLostQR = useCallback(() => {
        setQRCodeData(null);
        navigate(`/get-lost-qr/${docAuthId}`);
    }, [docAuthId, setQRCodeData]);


    const toggleExpanded = useCallback(() => {
        setExpanded(prev => !prev);
    }, []);


    if (!doctorData) {
        return (
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <p className="text-slate-700">No doctor information available</p>
            </div>
        );
    }




    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-4">
            <div className="flex flex-col sm:flex-row gap-8 sm:justify-between items-center p-2">
                <div className="space-y-2 flex flex-col items-center text-sm">
                    <img
                        src={personalInfo?.profileImg || '/api/placeholder/128/128'}
                        alt={personalInfo?.name || 'Doctor'}
                        className="w-32 h-32 rounded-full object-cover border-2 border-indigo-200"
                    />
                    <h2 className="text-2xl font-bold text-slate-700 flex gap-1 items-center">
                        Dr. {personalInfo?.name || 'Name Not Available'}
                        {
                            verified &&
                            <div className="relative inline-block group">
                                <Verified className="w-5 text-blue-700" />

                                <span className="pointer-events-none absolute left-full top-1/2 ml-1 -translate-y-1/2 whitespace-nowrap bg-black/15 px-2 py-1 text-xs text-black font-normal transition-opacity duration-200 group-hover:opacity-100 opacity-0">
                                    This doctor is verified
                                </span>
                            </div>
                        }
                    </h2>
                    <p className="text-slate-700">
                        {professionalInfo?.speciality || 'Specialty Not Available'}
                    </p>
                    <div className="flex items-center gap-2 text-slate-700">
                        <GraduationCap className="w-5" />
                        <span>
                            {professionalInfo.degree || 'Degree Not Available'}
                            {professionalInfo.experience && ` • ${professionalInfo.experience} years experience`}
                        </span>
                    </div>

                    {/* Book appointment button */}
                    {availability.isAvailable ? (
                        <button
                            onClick={handleBookAppointment}
                            className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition flex justify-center mt-1 w-full mx-auto text-center text-sm"
                        >
                            Book Appointment
                        </button>
                    ) : (
                        <p className="cursor-not-allowed bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full flex justify-center mt-1 w-full mx-auto text-center text-sm opacity-50">
                            Doctor Not Available
                        </p>
                    )}

                    <button
                        onClick={handleGetLostQR}
                        className="cursor-pointer bg-slate-700 text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition flex justify-center mt-1 w-full mx-auto text-center text-sm"
                    >
                        Get Your Lost QR
                    </button>
                </div>

                <RealTimeStatus
                    date={nearestDate}
                    docAuthId={docAuthId}
                    avgTime={clinicInfo?.avgCheckTime}
                />
            </div>


            {/* Show more/less button */}
            <button
                onClick={toggleExpanded}
                className="flex items-center gap-2 px-4 py-2 my-4 border-2 border-slate-700 text-slate-700 font-medium text-sm mx-auto rounded-full transition-all duration-300 active:scale-95"
            >
                {expanded ? "Show Less" : "Show More Details"}
                <ChevronDown
                    className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
            </button>


            {/* Expanded details section */}
            {expanded &&
                <div className="p-6 space-y-6 text-xs sm:text-sm">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Consultation Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-800">Consultation Details</h3>
                            <div className="space-y-3">
                                {
                                    clinicInfo?.fees !== undefined && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <IndianRupee className="w-5" />
                                            <span>Consultation Fee: ₹{clinicInfo.fees}</span>
                                        </div>
                                    )
                                }
                                {
                                    clinicInfo?.avgCheckTime !== undefined && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Clock className="w-5" />
                                            <span>Average Consultation: {clinicInfo.avgCheckTime} mins</span>
                                        </div>
                                    )
                                }
                                {
                                    personalInfo?.language && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Languages className="w-5" />
                                            <span>Languages: {personalInfo.language.join(', ')}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* Contact & Location */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800">Contact & Location</h3>
                        <div className="space-y-3">
                            {
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Phone className="w-5" />
                                    <span>{clinicInfo?.phoneNumber}</span>
                                </div>
                            }
                            {
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Building className="w-5" />
                                    <span>{clinicInfo?.city}, {clinicInfo?.pincode}</span>
                                </div>
                            }
                            {
                                <div className="flex items-center gap-2 text-slate-700">
                                    <MapPin className="w-5" />
                                    <span>
                                        {clinicInfo?.address}, {clinicInfo?.pincode}
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            
            {/* Availability Schedule */}
            {availability?.workingDays && Object.keys(availability.workingDays).length > 0
                && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Available Time Slots</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
                            {availableDaySlots.map(({ day, slots }) => (
                                <div key={day} className="bg-slate-200 p-4 rounded-lg">
                                    <h4 className="font-medium text-slate-800 mb-2">{day}
                                    </h4>
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
        </div >
    );
};

export default SingleDoctorProfile;