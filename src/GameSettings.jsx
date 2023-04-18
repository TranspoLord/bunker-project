import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { Context } from './SnackBarStoreContext';
import { useParams, Link } from 'react-router-dom';


function GameSettings() {
    const [state, dispatch] = useContext(Context);
    const [openBunkerList, setOpenBunkerList] = useState(false);
    const { bunkerName } = useParams();

    const [bunkerList, setBunkerList] = useState([]);

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


    return (
        <div>
            <Link to="/">
                <Button variant='contained'>Back</Button>
            </Link>
            <Link to ="/game/bunkerchoice">
                <Button variant='contained'>Choose Bunker</Button>
            </Link>

            {console.log("Bunker list: " + bunkerList)}




        </div>
    )
}

export default GameSettings;
