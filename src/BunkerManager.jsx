import React, {useState, useEffect } from 'react';
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

    function LoadFile() {
        console.log("This is the load file function")
        const [isValid, setIsValid] = useState(null);

        const handleFileChange = (event) => {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            validateFile(selectedFile);            
        };

        const validateFile = (file) => {
            if(file.type === "application/json" || file.type === "text/plain") {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try{
                        const fileData = JSON.parse(event.target.result);
                        console.log(fileData);
                        setIsValid(true);
                    } catch (error) {
                        setIsValid(false);
                    }
                };
                reader.readAsText(file);
            } else {
                setIsValid(false);
            }
        };

        return (   
            <div>
                {console.log("This is the load file function return")}
                <input type="file" onChange={handleFileChange} />
                {file ? 'Selected file: ${file.name}' : "No file selected"}
                {isValid === true ? <p>The file is a valid json file</p> : null}
                {isValid === false ? <p>The file is not a valid json file</p> : null}
            </div>
        );
    }

    function CreateBunker() {
        //TODO: Finish this function
        const bunkerName = prompt("Enter the name of the bunker you want to create")
        const bunkerRoom1 = prompt("Enter the name of the first room in the bunker")
        const bunkerRoom1Description = prompt("Enter the description of the first room in the bunker")
        const bunkerRoom2 = prompt("Enter the name of the second room in the bunker")
        const bunkerRoom2Description = prompt("Enter the description of the second room in the bunker")
        const bunkerRoom3 = prompt("Enter the name of the third room in the bunker")
        const bunkerRoom3Description = prompt("Enter the description of the third room in the bunker")
        const bunkerRoom4 = prompt("Enter the name of the fourth room in the bunker")
        const bunkerRoom4Description = prompt("Enter the description of the fourth room in the bunker")

    }


    return (
        <div>
            <button onClick = {() => {setLoad(true)}} className = "bunkerEditorLoadButton">
                Load Bunker
            </button>
            {loadFile ? <LoadFile/> : null}
            <Link to="/manage/create">
                <button onClick = {() => {setCreate(true)}} className = "bunkerEditorCreateButton">
                    Create Bunker
                </button>
            </Link>
            <Link to="/edit">
                <button onClick = {() => {setEdit(true)}} className = "bunkerEditorEditButton">
                    Edit Bunker
                </button>
            </Link>
            <Link to="/list">
                <button onClick = {() => {setBunkerList(true)}} className = "bunkerEditorListButton">
                    Bunker List
                </button>
            </Link>
            <Link to="/">
                <button className = "bunkerEditorBackButton">
                    Back
                </button>
            </Link>
        </div>
    );

}

export default BunkerManager;