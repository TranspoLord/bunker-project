import React, {useState, useEffect } from 'react';
import App from './App';
import './App.css';
import GameManager from './GameManager';

const BunkerManager = () => {
    const [loadFile, setLoad] = useState(false)
    const [createBunker, setCreate] = useState(false)
    const [editBunker, setEdit] = useState(false)
    const [bunkerList, setBunkerList] = useState(false)
    const [back, setBack] = useState(false)

    function buttons() {
        if(loadFile) {
            return 
        }
        else if (createBunker) {
            return
        }
        else if (editBunker) {
            return
        }
        else if (bunkerList) {
            return
        }
        else if(back) {
            return <App />
            
        }
        else {
            return (
            <div>
                    <button onClick = {() => {setLoad(true)}} className = "bunkerEditorLoadButton">
                        Load Bunker
                    </button>
                    <button onClick = {() => {setCreate(true)}} className = "bunkerEditorCreateButton">
                        Create Bunker
                    </button>
                    <button onClick = {() => {setEdit(true)}} className = "bunkerEditorEditButton">
                        Edit Bunker
                    </button>
                    <button onClick = {() => {setBunkerList(true)}} className = "bunkerEditorListButton">
                        Bunker List
                    </button>
                    <button onClick = {() => {setBack(true)}} className = "bunkerEditorBackButton">
                        Back
                    </button>
                </div>
            )
        }

    }



    return (
        <div className = "BunkerEditor">
            {buttons()}
        </div>
    );
}

export default BunkerManager;