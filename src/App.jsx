import { Outlet } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import { Footer, Navbar, ScrollToTop } from './components';



const App = () => {

  return (
    <div className='mx-4 sm:mx-[10%] text-slate-700'>
      <Navbar />
      <Toaster />
      <main className='min-h-screen py-2 mt-16 sm:mt-20'>
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App