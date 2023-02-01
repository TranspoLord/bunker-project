import React, { useState, useEffect } from 'react';
import App from './App';
import './App.css';
import GameManager from './GameManager';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Routes } from 'react-router';
import { createNull } from 'typescript';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardContent, CardActions, Typography } from '@mui/material';

const BunkerManager = () => {
    const [loadFile, setLoad] = useState(false)
    const [createBunker, setCreate] = useState(false)
    const [editBunker, setEdit] = useState(false)
    const [bunkerList, setBunkerList] = useState(Object.keys(localStorage))
    const [back, setBack] = useState(false)
    const [file, setFile] = useState(null);
    const [isValid, setIsValid] = useState(null);

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

    function handleRemoveBunker(index){
        const newBunkers = [...bunkerList]
        newBunkers.splice(index, 1)
        setBunkerList(newBunkers)
        localStorage.removeItem(bunkerList[index])
        console.log(JSON.stringify(localStorage))
    }

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
                    <Link to="/manage/edit">
                        <Button size="small" variant="outlined" onClick={() => {setEdit(true)}}>Edit</Button>
                    </Link>
                    <Button size="small" variant="outlined" onClick={() => {handleRemoveBunker(index)}}>Delete</Button>
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