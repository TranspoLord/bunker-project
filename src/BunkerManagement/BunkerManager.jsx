import React, { useState, useEffect, useContext } from 'react';
import App from '../App';
import './App.css';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardContent, CardActions, Typography, Dialog } from '@mui/material';
import { Context } from '../Mains/SnackBarStoreContext';
import { DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { saveAs } from 'file-saver';


const BunkerManager = () => {
    const [loadFile, setLoad] = useState(false)
    const [createBunker, setCreate] = useState(false)
    const [editBunker, setEdit] = useState(false)
    const [bunkerList, setBunkerList] = useState([])
    const [file, setFile] = useState(null);
    const [isValid, setIsValid] = useState(null);
    const [state, dispatch] = useContext(Context);
    const [openWindow, setOpenWindow] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Loading bunkers from local storage")
        BunkerLoadFromLocal()
    }, []);
    function BunkerLoadFromLocal() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            console.log("Key: " + key)
            if (key.startsWith("bunker-")) {
                const bunkerName = key.substring('bunker-'.length);
                const dataString = localStorage.getItem(key);
                const data = JSON.parse(dataString);
                setBunkerList(bunkerList => bunkerList.concat(data))
            }
        }
        console.log("Bunker list: " + bunkerList)
    }


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        validateFile(selectedFile);
    };

    const validateFile = (file) => {
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = (e.target.result);
                const data = JSON.parse(text);
                if (data.name && data.rooms && data.description) {
                    setIsValid(true);
                    localStorage.setItem("bunker-" + data.name, text);
                    dispatch({ type: "OPEN", severity: "success", message: "Bunker loaded           ", button: <Button sx={{color: 'text.disabled'}} onClick={() => { navigate("/manage/edit/" + data.name) }}>Edit</Button> });
                    setBunkerList(bunkerList => bunkerList.concat(data))
                } else {
                    setIsValid(false);
                }
                
            };
            reader.readAsText(file);
        }
        catch (err) {
            setIsValid(false);
        }
    };

    const handleClose = () => {
        setOpenWindow(false)
    };

    const handleBunkerDelete = () => {
        setOpenWindow(true)
    };

    function handleRemoveBunker(index) {
        const newBunkers = [...bunkerList]
        localStorage.removeItem("bunker-" + bunkerList[index].name)
        newBunkers.splice(index, 1)
        setBunkerList(newBunkers)
        console.log(JSON.stringify(localStorage))
        handleClose()
        dispatch({ type: "OPEN", severity: "success", message: "Bunker deleted" });
    }

    const handleBunkerExport = (bunker) => {
        const fileName = bunker.name + "-bunker.json";
        const fileData = JSON.stringify(bunker);
        const fileToSave = new Blob([fileData], { type: "application/json" });
        saveAs(fileToSave, fileName);
        dispatch({ type: "OPEN", severity: "success", message: "Bunker exported" });
    };

    function BunkerCard(bunker, index) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {bunker.name}
                    </Typography>
                    <Typography variant="body2">
                        Room Count: {bunker.rooms.length}
                    </Typography>
                    <Typography variant="body2">
                        Description: {bunker.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined" onClick={() => { handleBunkerExport(bunker) }}>Export</Button>
                    <Link to={`/manage/edit/${bunker.name}`}>
                        <Button size="small" variant="outlined" onClick={() => { setEdit(true) }}>Edit</Button>
                    </Link>
                    <Button size="small" variant="outlined" onClick={() => { handleBunkerDelete() }}>Delete</Button>
                    <Dialog open={openWindow} onClose={handleClose} aria-labelledby="deleteBunker">
                        <DialogTitle id="deleteBunker">Are you sure?</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                This will delete the bunker and all of its rooms.
                            </DialogContentText>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => { handleRemoveBunker(index) }}>Delete</Button>
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