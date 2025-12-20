import { Button } from "@/components/ui/button"
import Hero from "./components/custom/Hero"
import Header from "./components/custom/Header"
import { createBrowserRouter, Outlet } from "react-router-dom"
import CreateTrip from "./create-trip"
import { formContext, userContext } from "./configs/context"
import { useState } from "react"
import ViewTrip from "./view-trip"
import MyTrips from "./my-trips"
import PixabaySearchExample from "./components/custom/Pixabay Search"


const App = () => {
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState(null);

  return (
    <userContext.Provider value={{userData, setUserData}}>
      <formContext.Provider value={{formData, setFormData}}>
        <div>
          <Header/>
          <Outlet/>
        </div>
      </formContext.Provider>
    </userContext.Provider>
  )
}

export const appRouter = createBrowserRouter([
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
      },
      {
        path: "/pixabay-photo",
        element: <PixabaySearchExample />
      }
    ]
  },
]);
 
export default App