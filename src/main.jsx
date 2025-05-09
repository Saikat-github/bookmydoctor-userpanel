import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DoctorsPage from './pages/DoctorsPage.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'
import MyProfile from './pages/MyProfile.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import Appoinments from './pages/Appoinments.jsx'
import AppContextProvider from './context/AppContext.jsx'
import BookingForm from './components/BookingForm.jsx'
import SendOTP from './pages/SendOTP.jsx'
import NotFound from './pages/NotFound.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContextProvider>
        <App />
      </AppContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/doctors",
        element: <DoctorsPage />
      },
      {
        path: "/doctors/:speciality",
        element: <DoctorsPage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/my-profile",
        element: <MyProfile />
      },
      {
        path: "/my-appointments",
        element: <MyAppointments />
      },
      {
        path: "/appointments/:doctorId",
        element: <Appoinments />
      },
      {
        path:"/book-appointment/:doctorId",
        element: <BookingForm />
      },
      {
        path:"/otp-verification/:doctorId",
        element: <SendOTP />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
