import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Login');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();



  const onsubmit = async (data) => {
    console.log(data);
    toast.warn('Login and Signup are disabled for now');
  }




  return (
    <div className='h-screen flex justify-center items-start my-24 '>
      <form onSubmit={handleSubmit(onsubmit)} className='flex text-xs sm:text-sm flex-col border p-4 sm:p-8 rounded-md gap-6 text-slate-700 shadow-lg w-80'>
        <div>
          <h1 className='text-lg font-semibold text-center'>{state}</h1>
        </div>

        {
          state === "SignUp" &&
          <div>
            <input className='w-full border py-2 px-2' type="text" placeholder='Enter your name' {...register("name", { required: "Please enter your name" })} />
            {errors.name && <p className='text-red-600 text-xs'>{errors.name.message}</p>}
          </div>
        }



        <div>
          <input className='w-full border py-2 px-2' type="email" placeholder='Enter your email'{...register("email", { required: "Email is required" })} />
          {errors.email && <p className='text-red-600 text-xs'>{errors.email.message}</p>}
        </div>

        <button disabled={isSubmitting} className='flex  gap-2 justify-center items-center py-2 px-4 text-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white transition-all duration-300'>
          {state} {isSubmitting && <div className='w-4 h-4 border-2 border-white border-dashed animate-spin rounded-full'></div>}
        </button>

        <p>{state === "SignUp" ? "Already have an account?" : "Don't have an account?"} <span className='cursor-pointer text-indigo-700' onClick={() => setState(state === "Login" ? "SignUp" : "Login")}>{state === 'Login' ? "SignUp" : "Login"} here</span></p>
      </form>
    </div>
  )
}

export default Login