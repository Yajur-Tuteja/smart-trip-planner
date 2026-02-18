import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { AuthDialogContext } from '../../configs/context';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function Authentication() {

    const {openAuthDialog} = useContext(AuthDialogContext);

    const [mode, setMode] = useState("login");


    return (
        <div>
            <Dialog open={openAuthDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <div>
                                {mode === "login" ? <LoginForm setMode={setMode}/> : <SignUpForm setMode={setMode}/>}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Authentication