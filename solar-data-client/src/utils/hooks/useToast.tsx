import { useState } from "react";
import { createContext, useContext } from "react";
import { Snackbar, Alert, AlertColor, Box } from "@mui/material";


const ToastContext = createContext<any>(null)


type ToastProps = {
    open: boolean,
    handleClose: () => void,
    message: string,
    type: AlertColor

}

export const useToast = () => {
    const toast = useContext(ToastContext)

    const showToast = (type: AlertColor, message: string) => {
        toast.setType(type)
        toast.setMessage(message)
        toast.setOpen(true)
    }

    return (
        {
            showToast
        }
    )
}


const Toast = ({ open, handleClose, message, type }: ToastProps) => {


    return (

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>

    )
}

export const ToastProvider = ({ children }: any) => {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('success' as AlertColor)
    const [message, setMessage] = useState('')
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <ToastContext.Provider value={{ open, setOpen, handleClose, setType, setMessage }}>
            {children}
            <Toast open={open} handleClose={handleClose} type={type} message={message} />
        </ToastContext.Provider>
    )

}