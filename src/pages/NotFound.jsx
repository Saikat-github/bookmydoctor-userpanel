import React from 'react';
import { ArrowLeftCircle, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {

  return (
    <div className="flex flex-col items-center min-h-screen  px-4 text-center my-10">
      <Ghost className="w-12 h-12 text-indigo-500 mb-6" />
      <h1 className="text-4xl font-semibold text-slate-600 mb-2">Page Not Found!</h1>
      <p className="text-slate-500 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to={'/'} className='cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2  rounded-full hover:opacity-90 transition mx-auto text-center max-sm:text-sm'>Go to Homepage</Link>
    </div>
  );
};

export default NotFound;
