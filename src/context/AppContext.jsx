import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';


export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    const [loader, setLoader] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [qrCodeData, setQRCodeData] = useState();
    const [apiData, setApiData] = useState();
    const [searchResults, setSearchResults] = useState([]);



    const getNextDates = (availableDays, totalDays=7) => {
        const days = [];
        const today = new Date();
        const options = { weekday: "long" };

        for (let i = 0; i < totalDays; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            futureDate.setHours(0, 0, 0, 0); // Ensures no timezone shift

            const dayName = futureDate.toLocaleDateString("en-US", options);

            if (availableDays?.includes(dayName)) {
                days.push({
                    date: futureDate.toLocaleDateString("en-GB").split("/").reverse().join("-"), // Corrected for local time
                    display: `${dayName} (${futureDate.toLocaleDateString("en-GB")})`,
                });
            }
        }
        return days;
    };



    const getDoctorsData = async (speciality="", city="") => {
        try {
            setLoader(true);
            const res = await axios.get(`${backendUrl}/api/user/all-doctors`, {
                params: {
                    speciality,
                    city,
                    cursor
                }
            });
            if (res.data.success) {
                setDoctors(cursor ? [...doctors, ...res.data.doctors] : res.data.doctors)

                //Update pagination state
                setCursor(res.data.nextCursor);
                setHasNextPage(res.data.hasNextPage);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoader(false);
        }
    }





    useEffect(() => {
        getDoctorsData();
    }, [])



    const value = {
        getNextDates,
        loader,
        setLoader,
        setDoctors,
        doctors,
        backendUrl,
        getDoctorsData,
        qrCodeData, setQRCodeData,
        apiData, setApiData,
        hasNextPage,
        cursor,
        setHasNextPage,
        setCursor,
        searchResults, 
        setSearchResults,
        recaptchaSiteKey
    }



    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
