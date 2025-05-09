import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AppContext } from '../context/AppContext';
import { Search, XCircle, Loader2 } from 'lucide-react';
import SearchResults from './SearchResults';
import axios from 'axios';
import RecentSearches from './RecentSearches';

const SearchDoctors = () => {
    const [cursor, setCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loader, setLoader] = useState(false);
    const [suggestions, setSuggestions] = useState([])


    const { backendUrl, searchResults, setSearchResults } = useContext(AppContext);
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    // Watch specific fields instead of all fields
    const name = watch("name");
    const city = watch("city");

    const onSearch = useCallback(async (data) => {
        if (!data.name && !data.city) {
            setSearchResults([]);
            return;
        }
        

        try {
            setLoader(true);
            const res = await axios.get(`${backendUrl}/api/user/search-doctors`, {
                params: { ...data, cursor }
            });

            if (res.data.success) {
                setSearchResults(res.data.doctors);
                setCursor(res.data.nextCursor);
                setHasNextPage(res.data.hasNextPage);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoader(false);
        }
    }, [cursor, backendUrl]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            onSearch({ name, city});
        }, 400);

        return () => clearTimeout(debounce);
    }, [name, city, onSearch]);


    const handleFocus = () => {
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        setSuggestions(history);
    }

    
    return (
        <div>
            <div className="max-sm:max-w-lg mx-auto sm:p-4 p-2 rounded-lg shadow-lg shadow-slate-500 max-sm:text-xs bg-white my-4">
                <form className='flex gap-4 flex-col sm:flex-row sm:items-start items-center'>
                    <div className='w-full'>
                        <div className={`border border-slate-400 w-full rounded-lg bg-white flex justify-between items-center px-2 ${errors.name ? "border-red-500 border-2" : ""}`}>
                            <Search className="w-4 text-slate-500" />
                            <input
                                onFocus={handleFocus}
                                type="text"
                                placeholder="Search by doctor's name"
                                className={`px-2 py-2 w-full outline-none rounded-lg`}
                                {...register("name", {
                                    maxLength: { value: 50, message: "Name must be less than 50 characters long" },
                                    pattern: {
                                        value: /^[a-zA-Z\s]+$/,
                                        message: "Name must contain only letters and spaces",
                                    }
                                })}
                            />
                            <XCircle
                                className={`w-4 cursor-pointer text-slate-700 ${name ? "inline" : "hidden"}`}
                                alt="Clear Name"
                                aria-label="Clear input"
                                onClick={() => {
                                    setValue('name', '', { shouldValidate: true });
                                    setSearchResults([]);
                                }}
                            />
                        </div>
                        {searchResults.length > 0 && <SearchResults results={searchResults} />}
                        {searchResults.length === 0 && suggestions.length > 0 && <RecentSearches suggestions={suggestions} setSuggestions={setSuggestions} />}
                    </div>
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

                    <p className='text-slate-700 sm:text-xl'>&</p>
                    <div className={`border border-slate-400 w-full rounded-lg bg-white flex justify-between items-center px-2 ${errors.city ? "border-red-500 border-2" : ""}`}>
                        <Search className="w-4 text-slate-500" />
                        <input
                            onFocus={handleFocus}
                            type="text"
                            placeholder="Search by city/town name"
                            className={`px-2 py-2 w-full outline-none rounded-lg`}
                            {...register("city", {
                                maxLength: { value: 50, message: "City/town name must be less than 50 characters long" },
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message: "city must contain only letters and spaces",
                                }
                            })}
                        />
                        <XCircle
                            className={`w-4 cursor-pointer text-slate-700 ${city ? 'inline' : "hidden"}`}
                            onClick={() => {
                                setValue('city', '', { shouldValidate: true });
                                setSearchResults([]);
                            }}
                        />
                    </div>
                    {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default SearchDoctors;