import React, { useState, useEffect, useContext } from 'react';
import App from './App';
import './App.css';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardContent, CardActions, Typography, Dialog } from '@mui/material';
import { Context } from './SnackBarStoreContext';
import { DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { saveAs } from 'file-saver';


const BunkerManager = () => {
    const [loadFile, setLoad] = useState(false)
    const [createBunker, setCreate] = useState(false)
    const [editBunker, setEdit] = useState(false)
    const [bunkerList, setBunkerList] = useState(Object.keys(localStorage))
    const [back, setBack] = useState(false)
    const [file, setFile] = useState(null);
    const [isValid, setIsValid] = useState(null);
    const [state, dispatch] = useContext(Context);
    const [openWindow, setOpenWindow] = useState(false)

    function BunkerLoadFromLocal() {
        const localData = JSON.parse(localStorage.getItem()) || [];

        localData.filter(data => data.bunker).forEach(data => {
            const bunker = data.bunker;
            bunkerList[bunker.name] = bunker;
        });
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        validateFile(selectedFile);
    };

    const validateFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const fileData = JSON.parse(event.target.result);
                console.log(fileData);
                setIsValid(true);
            } catch (error) {
                setIsValid(false);
            }
        };
        reader.readAsText(file);
        console.log(JSON.stringify(file))
    };

    const handleClose = () => {
        setOpenWindow(false)
    };

    const handleBunkerDelete = () => {
        setOpenWindow(true)
    };

    function handleRemoveBunker(index){
        const newBunkers = [...bunkerList]
        newBunkers.splice(index, 1)
        setBunkerList(newBunkers)
        localStorage.removeItem(bunkerList[index])
        console.log(JSON.stringify(localStorage))
        handleClose()
        dispatch({ type: "OPEN", severity: "success", message: "Bunker deleted" });
    }

    const handleBunkerExport = (bunker) => {
        const fileName = bunker.name + "-bunker.json";
        const fileData = JSON.stringify(bunker);
        const fileToSave = new Blob([fileData], {type: "application/json"});
        saveAs(fileToSave, fileName);
        dispatch({ type: "OPEN", severity: "success", message: "Bunker exported" });
    };


    function BunkerCard (bunker, index) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {bunker}
                    </Typography>
                    <Typography variant="body2">
                        Room Count: NYI
                        Description: NYI
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined" onClick={() => {handleBunkerExport(bunker)}}>Export</Button>
                    <Link to="/manage/edit">
                        <Button size="small" variant="outlined" onClick={() => {setEdit(true)}}>Edit</Button>        
                    </Link>
                    <Button size="small" variant="outlined" onClick={() => {handleBunkerDelete()}}>Delete</Button>
                    <Dialog open={openWindow} onClose={handleClose} aria-labelledby="deleteBunker">
                        <DialogTitle id="deleteBunker">Are you sure?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                This will delete the bunker and all of its rooms.
                            </DialogContentText>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => {handleRemoveBunker(index)}}>Delete</Button>
                        </DialogContent>
                    </Dialog>
                </CardActions>
            </Card>
        );
    }

    return (
        <div>
            <h1>Bunker Manager</h1>
            <label htmlFor='fileInput'>
                <Button variant='contained' onClick={() => { document.getElementById("fileInput").click() }} >
                    Load Bunker
                </Button>
            </label>
            <input id='fileInput' type='file' accept="application/json, text/plain" style={{ display: 'none' }} onChange={handleFileChange} />
            <Link to="/manage/create">
                <Button variant="contained" onClick={() => { setCreate(true) }}>
                    Create Bunker
                </Button>
            </Link>
            <Link to="/">
                <Button variant='contained'>
                    Back
                </Button>
            </Link>
            
            {bunkerList.map((bunker, index) => (
                <div key={index}>
                    {BunkerCard(bunker, index)}
                </div>
            ))}
        </div>
    );

}

export default BunkerManager;