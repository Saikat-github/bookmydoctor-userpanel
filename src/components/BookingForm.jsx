import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import QRCode from "./QRCode";
import { useContext, useState, useRef, useCallback, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Loader2 } from 'lucide-react';
import { getNextDates } from "../utils/utilFunctions";



export default function BookingForm() {
  const { doctorId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef(null);

  const {
    doctors,
    backendUrl,
    qrCodeData,
    setQRCodeData,
    setApiData,
    recaptchaSiteKey
  } = useContext(AppContext);


  const doctorData = useMemo(() => {
    return doctors.find(d => d._id === doctorId) || {};
  }, [doctors, doctorId]);


  const availableDays = useMemo(() => {
    return Object.keys(doctorData?.availability?.workingDays || {});
  }, [doctorData]);


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const dateOptions = useMemo(() => {
    return getNextDates(availableDays, 14);
  }, [getNextDates, availableDays]);



  const onSubmit = useCallback(async (data) => {
    if (!recaptchaRef.current) {
      return toast.warn("reCAPTCHA not loaded, please wait or refresh the page");
    }
    setIsLoading(true);

    try {
      const token = await recaptchaRef.current.executeAsync();
      if (!token) {
        return toast.warn("reCAPTCHA not verified, please wait or refresh the page");
      }

      data.reCaptcha = token;
      const res = await axios.post(`${backendUrl}/api/user/book-appointment`, { ...data, doctorId });

      if (res.data.success) {
        setQRCodeData(res.data.qrCodeData);
        setApiData(JSON.parse(res.data.qrCodeData));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "An error occurred during booking");
    } finally {
      setIsLoading(false);
    }
  }, [backendUrl, doctorId, setQRCodeData, setApiData]);



  if (qrCodeData) {
    return (
      <div className="flex justify-center items-center mb-28">
        <div className="w-full max-w-md p-6 shadow-2xl bg-white rounded-2xl">
          <QRCode doctorId={doctorId} />
        </div>
      </div>
    );
  }



  return (
    <div className="flex justify-center items-center mb-28">
      <div className="w-full max-w-md p-6 shadow-2xl bg-white rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-sm:text-xs text-sm">
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
              <p className="text-red-500 text-xs mt-1">{errors.patientName.message}</p>
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
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
            )}
          </div>

          <select
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600 text-slate-600"
            {...register("appointmentDate", { required: "Please select a date" })}
          >
            <option value="">Select appointment date(next 14 days)</option>
            {dateOptions.map((day) => (
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
              <span className="text-red-600">*</span>In case you lost your QR, we'll send it to your email
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
            disabled={isLoading}
            type="submit"
            className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition flex justify-center ${isLoading ? "bg-opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? <Loader2 className="w-4 animate-spin" /> : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}