import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { Context } from '../SnackBar/SnackBarStoreContext';
import { useParams, Link } from 'react-router-dom';


function GameSettings(props) {
    const [state, dispatch] = useContext(Context);
    const [openBunkerList, setOpenBunkerList] = useState(false);
    const { name } = useParams();
    const getBunker = JSON.parse(localStorage.getItem("bunker-" + name));

    const [bunkerList, setBunkerList] = useState([]);


    return (
        <>
            <div>
                <Link to="/">
                    <Button variant='contained'>Home</Button>
                </Link>
                <Link to="/bunkerChoice">
                    <Button variant='contained'>Choose Bunker</Button>
                </Link>
            </div>
            <div>
                <h2>Current bunker: {name}</h2>
            </div>
            <div>
                <Link to={`/game/${name}`}>
                    <Button variant='contained'>Play</Button>
                </Link>
                {/*create save management for game*/}
            </div>
        </>
    )
}

export default GameSettings;
