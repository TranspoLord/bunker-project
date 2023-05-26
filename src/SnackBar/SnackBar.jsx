import React, { useState, useContext} from 'react';
import '../App.css';
import { Snackbar, Alert} from '@mui/material';
import { Context } from './SnackBarStoreContext';

const SnackBarMessage = () => {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
        dispatch({ type: "CLOSE" });
    };

    return (
        <div style={{}}>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }} 
            open = {state.open}
            autoHideDuration = {6000}
            onClose = {handleClose}>
                <Alert variant="filled" onClose={handleClose} severity={state.severity} sx={{ width: "100%" }}>
                    {state.message}
                    {state.button ? state.button : null}
                </Alert>
            </Snackbar>
        </div>
    );
};
export default SnackBarMessage;
