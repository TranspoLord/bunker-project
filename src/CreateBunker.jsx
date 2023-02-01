import { TextField, Box, Card, Button, CardContent, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function CreateBunker(props) {
    const [bunkerBool, setBunkerBool] = useState(props.isCreatingBunker);
    const [selectedBunker, setSelectedBunker] = useState(null);
    const [bunkerSaved, setBunkerSaved] = useState(false);
    const [bunkerName, setNewBunkerName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNorth, setNewNorth] = useState("");
    const [newSouth, setNewSouth] = useState("");
    const [newEast, setNewEast] = useState("");
    const [newWest, setNewWest] = useState("");
    const [newDescription, setNewDescription] = useState("");


    //TODO: Use snackbar to display messages(function with severity, message, and duration)

    function handleAddRoom(e) {
        e.preventDefault();
        const newRoom = {
            name: newName,
            north: newNorth,
            south: newSouth,
            east: newEast,
            west: newWest,
            description: newDescription
        };

        setRooms([...rooms, newRoom]);
        setNewName("");
        setNewNorth("");
        setNewSouth("");
        setNewEast("");
        setNewWest("");
        setNewDescription("");
    }

    function handleRemoveRoom(index) {
        const newRooms = [...rooms];
        newRooms.splice(index, 1);
        setRooms(newRooms);
    }

    function handleBunkerSave() {
        //Save bunker to local storage here
        console.log("Saving bunker to local storage")
        console.log(rooms)
        localStorage.setItem("bunker" + bunkerName, JSON.stringify(rooms))
        setBunkerBool(false)
        setBunkerSaved(true)
    }

    const getBasicBunkerInfo = () => {
        return (
            <div>
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                    <h2>Basic Bunker Info</h2>
                    <h4>Rooms: {rooms.length}</h4>
                    <TextField required margin="normal" id="outlined-basic" label="Bunker Name" variant="outlined" value={bunkerName} onChange={(e) => setNewBunkerName(e.target.value)} />
                    <TextField margin="normal" id="outlined-basic" label="Bunker Description" variant="outlined" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                </Box>
            </div>
        );
    }

    function addRoomCard(){
        return (
            <div>
                
            </div>
        );
    }

    const getRoomInfo = () => {
        return (
            <div>
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '5ch' }, }} noValidate autoComplete="off">
                    <TextField required size="small" margin="dense" id="outlined-basic" label="Room Name" variant="outlined" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    <TextField size="small" margin="dense" id="outlined-basic" label="North" variant="outlined" value={newNorth} onChange={(e) => setNewNorth(e.target.value)} />
                    <TextField size="small" margin="dense" id="outlined-basic" label="South" variant="outlined" value={newSouth} onChange={(e) => setNewSouth(e.target.value)} />
                    <TextField size="small" margin="dense" id="outlined-basic" label="East" variant="outlined" value={newEast} onChange={(e) => setNewEast(e.target.value)} />
                    <TextField size="small" margin="dense" id="outlined-basic" label="West" variant="outlined" value={newWest} onChange={(e) => setNewWest(e.target.value)} />
                    <TextField size="small" margin="dense" id="outlined-basic" label="Description" variant="outlined" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    <button onClick={handleAddRoom}>Add Room</button>
                </Box>
            </div>
        );
    }

    return (
        <div>
            <h1>Create Bunker</h1>
            <Link to="/manage"><Button variant="contained">Back</Button></Link>
            <Button variant="contained" onClick={handleBunkerSave}>Save Bunker</Button>
            {getBasicBunkerInfo()}
            <h2>Rooms</h2>
            <Button variant="contained" onClick={addRoomCard()}>Add Room</Button>
        </div>
    );

}

export default CreateBunker;