import React, { useState, useEffect } from 'react';
import App from './App';
import './App.css';
import GameManager from './GameManager';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Routes } from 'react-router';
import { createNull } from 'typescript';

const BunkerManager = () => {
    const [loadFile, setLoad] = useState(false)
    const [createBunker, setCreate] = useState(false)
    const [editBunker, setEdit] = useState(false)
    const [bunkerList, setBunkerList] = useState(false)
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

    function loadFromLocalStorage(){

    }

    //TODO: Automatically move to edit page after file load to have user confirm text is correct
    //TODO: Create a list/cards of all saved bunkers in local storage
    //TODO: On cards, have a button to delete the bunker from local storage
    //TODO: On cards, have a button to edit the bunker in the editor
    return (
        <div>
            <h1>Bunker Manager</h1>
            <label htmlFor='fileInput'>
                <button onClick={() => { document.getElementById("fileInput").click() }} className="bunkerEditorLoadButton">
                    Load Bunker
                </button>
            </label>
            <input id='fileInput' type='file' accept="application/json, text/plain" style={{ display: 'none' }} onChange={handleFileChange} />
            <Link to="/manage/create">
                <button onClick={() => { setCreate(true) }} className="bunkerEditorCreateButton">
                    Create Bunker
                </button>
            </Link>
            <Link to="/manage/edit">
                <button onClick={() => { setEdit(true) }} className="bunkerEditorEditButton">
                    Edit Bunker
                </button>
            </Link>
            <Link to="/list">
                <button onClick={() => { setBunkerList(true) }} className="bunkerEditorListButton">
                    Bunker List
                </button>
            </Link>
            <Link to="/">
                <button className="bunkerEditorBackButton">
                    Back
                </button>
            </Link>
        </div>
    );

}

export default BunkerManager;