import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const SendOTP = () => {
    const { doctorId } = useParams();
    const [email, setEmail] = useState('');
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [loader, setLoader] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { backendUrl } = useContext(AppContext);


    const navigate = useNavigate();

    const handleSendOTP = async (data) => {
        if (cooldown > 0) return toast.warn(`Please wait ${cooldown}s before resending`);
        const { email, date } = data;
        setLoader(true);
        try {
            const res = await axios.post(backendUrl + '/api/user/get-otp', { email, doctorId, date });
            if (res.data.success) {
                setEmail(data.email);
                toast.success(res.data.message);
                setShowOTPInput(true);
                setCooldown(60);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data || 'An error occurred');
        } finally {
            setLoader(false);
        }
    };



    const handleResetPassword = async (data) => {
        setLoader(true);
        const { otp } = data;
        try {
            const res = await axios.post(backendUrl + '/api/user/get-qrcode', {
                email, otp
            });
            if (res.data.success) {
                toast.success(res.data.message);
                // Redirect to doctor page after 2 seconds
                setTimeout(() => navigate(`/appointments/${doctorId}`), 2000);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data || 'An error occurred');
        } finally {
            setLoader(false);
        }
    };


    useEffect(() => {
        if (cooldown > 0) {
            const interval = setInterval(() => setCooldown(c => c - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [cooldown]);


    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg text-slate-800">
            <h2 className="text-2xl font-bold mb-6">Get Your QR Code</h2>

            {!showOTPInput
                ?
                (
                    <form onSubmit={handleSubmit(handleSendOTP)} className='text-sm'>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                className="border w-full px-4 py-1 border-slate-400 outline-primary"
                                placeholder="Enter your email to verify"
                                {...register("email", {
                                    required: "Please enter your email",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div className='mb-4'>
                            <label className="block text-slate-700 mb-2">Select Appointment Date</label>
                            <input
                                className="w-full p-2 border border-gray-400 rounded"
                                type="date"
                                {...register('date', { required: "Please select a date" })} />
                            {errors.date && (
                                <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                            )}
                        </div>
                        <button
                            disabled={loader}
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded hover:bg-slate-800 transition-all duration-300"
                        >
                            {loader ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <>
                        <form onSubmit={handleSubmit(handleResetPassword)} className='text-sm'>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Enter OTP sent to your email</label>
                                <input
                                    type="number"
                                    {...register('otp', { required: true })}
                                    className="w-full p-2 border border-gray-400 rounded"
                                    required
                                    maxLength="6"
                                />
                            </div>
                            <button
                                disabled={loader}
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded hover:bg-slate-800 transition-all duration-300"
                            >
                                {loader ? 'Verifying...' : 'Verify'}
                            </button>
                        </form>
                        <button
                            disabled={cooldown > 0}
                            onClick={() => setShowOTPInput(false)} className='text-indigo-700 hover:underline mt-2'>Resend OTP in {cooldown}s
                        </button>
                    </>
                )}
            <p
                className='text-sm text-center mt-2 text-indigo-600  font-medium w-full cursor-pointer' onClick={() => navigate(`/appointments/${doctorId}`)}>
                Back
            </p>
        </div>
    )
}

export default SendOTP