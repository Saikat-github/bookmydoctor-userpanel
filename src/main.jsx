import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import { AllDoctors, BookingPage, Contact, GetLostQR, Home, Login, NotFound, SingleDoctor } from './pages/index.js'



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/doctors",
        element: <AllDoctors />
      },
      {
        path: "/doctors/:speciality",
        element: <AllDoctors />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/doctor/:docAuthId",
        element: <SingleDoctor />
      },
      {
        path: "/booking-page/:docAuthId",
        element: <BookingPage />
      },
      {
        path: "/get-lost-qr/:docAuthId",
        element: <GetLostQR />
      },
      {
        path: "/contact",
        element: <Contact />
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
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>,
)
