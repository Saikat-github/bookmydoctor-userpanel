import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import { useContext, useState, useRef, useCallback, useMemo } from "react";
import QRCode from "./QRCode";
import { AppContext } from "../../context/AppContext";
import { getNextDates } from "../../utils/utilFunctions";
import { Link } from "react-router-dom";




export default function BookingForm({ docAuthId }) {
  const [loader, setIsLoader] = useState(false);
  const recaptchaRef = useRef(null);

  const {
    doctors,
    backendUrl,
    qrCodeData,
    setQRCodeData,
    recaptchaSiteKey
  } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const doctorData = useMemo(() => {
    return doctors.find(d => d.docAuthId === docAuthId) || {};
  }, [docAuthId]);


  const availableDays = useMemo(() => {
    return Object.keys(doctorData?.availability?.workingDays || {});
  }, [doctorData]);


  const upcomingDates = useMemo(() => {
    return getNextDates(availableDays, 7);
  }, [getNextDates, availableDays]);


  const onSubmit = useCallback(async (data) => {
    if (!recaptchaRef.current) {
      return toast.error("reCAPTCHA not loaded, please wait or refresh the page");
    }
    setIsLoader(true);

    try {
      const token = await recaptchaRef.current.executeAsync();
      if (!token) {
        return toast.error("reCAPTCHA not verified, please wait or refresh the page");
      }

      data.reCaptcha = token;
      const res = await axios.post(`${backendUrl}/api/user/book-appointment`, { ...data, docAuthId });

      if (res.data.success) {
        setQRCodeData(res.data.qrCodeData);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "An error occurred while booking");
    } finally {
      setIsLoader(false);
    }
  }, [backendUrl, docAuthId]);




  if (qrCodeData) {
    return (
      <div className="flex justify-center items-center mb-28">
          <QRCode docAuthId={docAuthId} />
      </div>
    );
  }




  return (
    <div className="flex justify-center items-center mb-28">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-sm:text-xs text-sm w-full max-w-md p-6 shadow-2xl bg-white rounded-2xl">
        <h2 className="text-center font-medium text-xl sm:text-2xl text-slate-600 rounded-lg">
          Enter Your Details
        </h2>

        <div>
          <input type="text" {...register("honeypot")} className="hidden" />
          <input
            type="text"
            className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your full name"
            {...register("patientName", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
              maxLength: { value: 50, message: "Name cannot exceed 50 characters" }
            })}
          />
          {errors.patientName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.patientName.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="tel"
            className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your mobile number"
            {...register("phoneNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit mobile number starting with 6-9"
              }
            })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <select
            className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600 text-slate-600"
            {...register("gender", { required: "Please select your gender" })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">
              {errors.gender.message}
            </p>
          )}
        </div>

        <select
          className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600 text-slate-600"
          {...register("appointmentDate", { required: "Please select a date" })}
        >
          <option value="">Select appointment date(next 7 days)</option>
          {upcomingDates.map((day) => (
            <option key={day.date} value={day.date}>
              {day.display}
            </option>
          ))}
        </select>
        {errors.appointmentDate && (
          <p className="text-red-500 text-xs mt-1">{errors.appointmentDate.message}</p>
        )}

        <div>
          <input
            type="email"
            className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email Id (Optional)"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }
            })}
          />
          <p className="text-xs text-slate-600 pl-2">
            <span className="text-red-600">*</span>In case you lost your QR, you can get it by verifying your email
          </p>
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={recaptchaSiteKey}
          onError={() => toast.error("reCAPTCHA failed to load")}
          size="invisible"
          badge="bottomright"
        />

        <button
          disabled={loader}
          type="submit"
          className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition flex justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loader ? <Loader2 className="w-4 animate-spin" /> : "Book Appointment"}
        </button>

        <Link to={`/doctor/${docAuthId}`} className='text-sm text-indigo-600 font-medium w-full block text-center'>Cancel</Link>
      </form>
    </div>
  );
}