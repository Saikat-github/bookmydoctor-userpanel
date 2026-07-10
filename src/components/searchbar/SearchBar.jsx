import { useContext, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Search, XCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { doctorSpecialities } from '../../assets/specialities';
import SearchResult from './SearchResult';



const SearchBar = () => {
    const [loader, setLoader] = useState(false);
    const [cities, setCities] = useState([]);

    const navigate = useNavigate()
    const debounceRef = useRef(null);
    const { backendUrl, getDoctorsData } = useContext(AppContext)
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const cityValue = watch('city');

    const getCitiesList = async (city) => {
        try {
            setLoader(true);
            const res = await axios.get(`${backendUrl}/api/user/cities`, {
                params: { city }
            });

            if (res.data.success) {
                setCities(res.data.cities);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoader(false);
        }
    }


    const debounceSearch = (value) => {
        clearTimeout(debounceRef.current);

        if (value.length < 2) return;
        debounceRef.current = setTimeout(() => {
            getCitiesList(value);
        }, 400);
    };

    const onSubmit = (data) => {
        const { city, speciality } = data;
        if (!city && !speciality) {
            toast.error("Please enter a city or select a speciality to search");
            return;
        }
        getDoctorsData(speciality, city);
        navigate('/doctors');
    }



    return (
        <div>
            <div className="max-sm:max-w-lg mx-auto sm:p-4 p-2 rounded-lg shadow-lg shadow-slate-500 max-sm:text-xs bg-white my-4">
                <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col sm:flex-row'>
                    <div className='w-full'>
                        <div className={`border border-slate-400 rounded-lg bg-white flex justify-between items-center px-2 ${errors.city ? "border-red-500 border-2" : ""}`}>
                            <Search className="w-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search by city/town name"
                                className={`px-2 py-2 w-full outline-none rounded-lg`}
                                {...register("city", {
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        debounceSearch(value);
                                    },
                                    maxLength: { value: 50, message: "City/town name must be less than 50 characters long" },
                                    pattern: {
                                        value: /^[a-zA-Z\s]+$/,
                                        message: "city must contain only letters and spaces",
                                    }
                                })}
                            />
                            {cityValue && (
                                <XCircle
                                    className="w-4 cursor-pointer"
                                    onClick={() => {
                                        setValue('city', '', { shouldValidate: true });
                                        setCities([]);
                                    }}
                                />
                            )}
                        </div>
                        {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}

                        {/* Showing searched cities suggestion */}
                        <SearchResult results={cities} setValue={setValue} setResults={setCities} />
                    </div>

                    <p className='m-auto'>OR</p>

                    <div className='border border-slate-400 rounded-lg bg-white flex justify-between items-center px-2 h-10 w-full'>
                        <select
                            {...register('speciality')}
                            className='w-full px-1 py-2 rounded-lg focus:outline-none focus:border-indigo-600 transition-all cursor-pointer max-sm:text-xs'
                            aria-label='Select doctor speciality'
                        >
                            <option value=''>Select speciality</option>
                            <option value=''>All</option>
                            {doctorSpecialities.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors h-10">Search</button>
                </form>
            </div>
        </div>
    );
}

export default SearchBar


