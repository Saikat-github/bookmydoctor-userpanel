import React, { useRef, useState } from 'react';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { QRCodeSVG } from "qrcode.react";
import { assets } from "../assets/assets.js";
import { toast } from 'react-toastify';
import { toPng } from 'html-to-image';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const QRCode = ({ title = "Prescripto Booking QR", logo = assets.React, size = 256, doctorId }) => {
  const [loader, setLoader] = useState(false);
  const componentRef = useRef(null);
  const { qrCodeData, apiData } = useContext(AppContext);

  const navigate = useNavigate()

  // Function to download as high-quality PNG image
  const downloadAsImage = async () => {
    setLoader(true);
    try {
      if (componentRef.current) {
        // Get accurate dimensions of the component
        const { offsetWidth, offsetHeight } = componentRef.current;

        // Add extra padding to ensure nothing gets cut
        const paddingX = 0; // Extra padding on each side
        const paddingY = 0; // Extra padding on top and bottom

        // Convert component to high-quality PNG with proper dimensions
        const dataUrl = await toPng(componentRef.current, {
          quality: 1.0,
          pixelRatio: 3, // Higher resolution for better quality
          width: offsetWidth + (paddingX * 2),
          height: offsetHeight + (paddingY * 2),
          cacheBust: true,
          canvasWidth: offsetWidth + (paddingX * 2),
          style: {
            margin: `${paddingY}px ${paddingX}px`,
            boxShadow: 'none'
          }
        });

        // Create a link to download the image
        const link = document.createElement('a');
        link.download = `${title.replace(/\s+/g, '-')}-qrcode.png`;
        link.href = dataUrl;
        link.click();

        toast.success("QR Code image downloaded successfully!");
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Download failed. Please screenshot your QR code instead.");

      // Try fallback method with lower quality
      // fallbackImageDownload();
    } finally {
      setLoader(false);
    }
  };





  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className="flex flex-col items-center justify-center space-y-4 px-4 bg-white" ref={componentRef}>
        {/* Title above QR code */}
        {title && (
          <h3 className="text-lg font-semibold text-slate-950 text-center">{title}</h3>
        )}

        {/* QR code with logo */}
        <div className="relative flex justify-center items-center py-6">
          <QRCodeSVG
            value={qrCodeData}
            size={size}
            level={"H"} // High error correction level to accommodate logo
            includeMargin={true}
            imageSettings={{
              src: logo,
              x: undefined, // Centered by default
              y: undefined,
              height: 40, // Adjust logo size
              width: 40,
              excavate: true, // Clears background behind the logo
            }}
          />
        </div>

        {/* Details below QR code */}
        <div className='text-xs text-slate-950'>
          <p>Serial Num : {apiData.serialNumber}</p>
          <p>Appointment Date : {apiData.appointmentDate.split("-").reverse().join("/")}</p>
          <p>Doctor : Dr. {apiData.doctorName}</p>
          <p className='text-indigo-700 mt-1'>Download or take a screenshot</p>
        </div>
      </div>

      {/* Download button */}
      <div className='my-2 flex justify-center items-center gap-2'>
        <button onClick={() => navigate(`/appointments/${doctorId}`)} className='bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2'>
          <ArrowLeft className='w-4' />
          Go Back
        </button>

        <button
          disabled={loader}
          onClick={downloadAsImage}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Download className='w-4' />
          {loader ? "Downloading..." : "Download"}
        </button>
      </div>
    </div>
  );
};

export default QRCode;






