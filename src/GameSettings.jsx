import React, {useState, useContext} from 'react';
import {Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { Context } from './SnackBarStoreContext';
import { useParams } from 'react-router-dom';


function GameSettings () {
    const [state, dispatch] = useContext(Context);
    const [openBunkerList, setOpenBunkerList] = useState(false);
    const { bunkerName } = useParams();
    const bunkerList = JSON.parse(localStorage.getItem("bunker-" + bunkerName));

    function BunkerCard(bunker, index)  {
        

    }


    return (
        <div>
            <Button variant='contained'>Choose Bunker</Button>
            {console.log("Bunker list: " + bunkerList)}
                    



        </div>
    )
}

export default GameSettings;
