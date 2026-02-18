import Header from "./components/custom/Header"
import { Outlet } from "react-router-dom"
import { FormContext, UserContext, AuthDialogContext} from "./configs/context"
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./configs/firebase-config"

const App = () => {
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState(null);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        setUserData(user);
        if (user) {
            setOpenAuthDialog(false);
        }
    });
    return unsub;
  }, []);

    
  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <AuthDialogContext.Provider value={{openAuthDialog, setOpenAuthDialog}}>  
        <FormContext.Provider value={{formData, setFormData}}>
          <div>
            <Header/>
            <Outlet/>
          </div>
        </FormContext.Provider>
      </AuthDialogContext.Provider>
    </UserContext.Provider>
  )
}

export default App