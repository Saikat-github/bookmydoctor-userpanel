import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";


export const AppContext = createContext();


const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    const title = "bookmydoctor"
    const [loader, setLoader] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [qrCodeData, setQRCodeData] = useState(null);


    const getDoctorsData = async (speciality="", city="", name="") => {
        try {
            setLoader(true);
            const res = await axios.get(`${backendUrl}/api/user/doctors`, {
                params: {
                    speciality,
                    city,
                    name,
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
        loader,
        setLoader,
        setDoctors,
        doctors,
        backendUrl,
        getDoctorsData,
        qrCodeData, setQRCodeData,
        hasNextPage,
        cursor,
        setHasNextPage,
        setCursor,
        recaptchaSiteKey,
        title
    }




    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
