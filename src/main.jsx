import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Hero from './components/custom/Hero.jsx'
import CreateTrip from './create-trip/index.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { appRouter } from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/index.jsx';
import MyTrips from './my-trips/index.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/create-trip",
        element: <CreateTrip />,
      },
      {
        path: "/view-trip/:tripId",
        element: <ViewTrip/>
      },
      {
        path: "/my-trips",
        element: <MyTrips/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <RouterProvider router={appRouter} />
  </GoogleOAuthProvider>
)
