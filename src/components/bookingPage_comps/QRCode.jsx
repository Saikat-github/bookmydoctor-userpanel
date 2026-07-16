import { useRef, useState } from 'react';
import { useContext } from "react";
import { QRCodeSVG } from "qrcode.react";
import toast from 'react-hot-toast';
import { toPng } from 'html-to-image';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";




const QRCode = ({ docAuthId }) => {
  const [loader, setLoader] = useState(false);
  const componentRef = useRef(null);
  const { qrCodeData, title } = useContext(AppContext);

  const dataBelowQR = JSON.parse(qrCodeData)
  const navigate = useNavigate()

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
    } finally {
      setLoader(false);
    }
  };





  return (
    <div className='flex flex-col items-center justify-center gap-4 w-full max-w-sm p-6 shadow-2xl bg-white rounded-2xl'>
      <div className="flex flex-col justify-center space-y-4 px-4 bg-white" ref={componentRef}>

        {/* QR code with logo */}
        <div className="relative flex flex-col justify-center items-center space-y-2 py-4 ">
          <QRCodeSVG
            value={qrCodeData}
            size={256}
            level={"H"} // High error correction level to accommodate logo
            imageSettings={{
              src: "/bookmeadr-logo-black.svg",
              x: undefined, // Centered by default
              y: undefined,
              height: 40, // Adjust logo size
              width: 40,
              excavate: true, // Clears background behind the logo
            }}
          />
          <h3 className="text-sm text-slate-950 text-center">
            {title}
          </h3>
        </div>

        {/* Details below QR code */}
        <div className='text-xs text-slate-950'>
          <p>Serial Num : {dataBelowQR?.serialNumber}</p>
          <p>Appointment Date : {dataBelowQR?.appointmentDate.split("-").reverse().join("/")}</p>
          <p>Doctor : Dr. {dataBelowQR?.doctorName}</p>
          <p className='text-indigo-700 mt-1'>Download or take a screenshot</p>
        </div>
      </div>

      {/* Download button */}
      <div className='w-full max-w-[256px] flex items-center justify-between gap-4 text-sm'>
        <button
          onClick={() => navigate(`/doctor/${docAuthId}`)} className='bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 flex items-center gap-1'>
          <ArrowLeft className='w-4' />
          Back
        </button>

        <button
          disabled={loader}
          onClick={downloadAsImage}
          className="bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 disabled:opacity-50"
        >
          <Download className='w-4' />
          {loader ? "Downloading..." : "Download"}
        </button>
      </div>
    </div>
  );
};

export default QRCode;






