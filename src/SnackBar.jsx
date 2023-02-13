import React, { useState} from 'react';
import './App.css';
import { Snackbar, Alert} from '@mui/material';
import Grow from '@mui/material/Grow';


function SnackBarMessage (severity, message) {
    console.log("In snackbar" + message + " " + severity);
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    return (
        <div style={{}}>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }} 
            open = {open}
            autoHideDuration = {6000}
            onClose = {handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
export default SnackBarMessage;
