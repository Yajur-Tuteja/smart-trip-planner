import Header from "./components/custom/Header"
import { Outlet } from "react-router-dom"
import { FormContext, UserContext } from "./configs/context"
import { useState } from "react"



const App = () => {
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <FormContext.Provider value={{formData, setFormData}}>
        <div>
          <Header/>
          <Outlet/>
        </div>
      </FormContext.Provider>
    </UserContext.Provider>
  )
}

export default App