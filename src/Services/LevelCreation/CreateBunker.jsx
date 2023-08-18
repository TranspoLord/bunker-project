import { TextField, Box, Card, Button, CardContent, Typography, FormControl, DialogActions, ListItemText } from '@mui/material';
import { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { InputLabel, MenuItem, Select, FormControlLabel, Checkbox } from '@mui/material';
import { Context } from '../SnackBar/SnackBarStoreContext';
import TestBunkerLogic from '../Logic/TestBunkerLogic';
import ItemManagement from './ItemManagement';

function CreateBunker(props) {
    const [state, dispatch] = useContext(Context);
    const [bunkerInfoOpen, setBunkerInfoOpen] = useState(false);
    const { name } = useParams();
    const getBunker = JSON.parse(localStorage.getItem("bunker-" + name));

    const [bunkerName, setNewBunkerName] = useState(getBunker ? getBunker.name : "");
    const [bunkerDescription, setNewBunkerDescription] = useState(getBunker ? getBunker.description : "");

    const [bunkerRooms, setRooms] = useState(getBunker ? getBunker.rooms : []);
    const [newName, setNewName] = useState("");
    const [newNorth, setNewNorth] = useState("");
    const [newSouth, setNewSouth] = useState("");
    const [newEast, setNewEast] = useState("");
    const [newWest, setNewWest] = useState("");
    const [newRoomDescription, setNewRoomDescription] = useState("");
    const [newRoomItem, setNewRoomItem] = useState("None");
    const [newRoomFinalRoom, setNewRoomFinalRoom] = useState(false);

    const [bunkerItems, setItems] = useState(getBunker ? getBunker.items : []);




    //Adds a room to the bunkerRooms array
    function handleAddRoom(e) {
        e.preventDefault();
        if (newName === "" || newRoomDescription === "") {
            dispatch({ type: "OPEN", severity: "error", message: "Room name and description cannot be empty" });
            return;
        }
        if (newNorth === "" && newSouth === "" && newEast === "" && newWest === "") {
            dispatch({ type: "OPEN", severity: "error", message: "Room must have at least one exit" });
            return;
        }
        const newRoom = {
            name: newName,
            north: newNorth,
            south: newSouth,
            east: newEast,
            west: newWest,
            description: newRoomDescription,
            item: newRoomItem,
            finalRoom: newRoomFinalRoom
        };

        setRooms([...bunkerRooms, newRoom]);
        setNewName("");
        setNewNorth("");
        setNewSouth("");
        setNewEast("");
        setNewWest("");
        setNewRoomDescription("");
        setNewRoomItem("");
        setNewRoomFinalRoom(false);
    }

    //Deletes a room from the bunkerRooms array
    function handleRemoveRoom(index) {
        const newRooms = [...bunkerRooms];
        newRooms.splice(index, 1);
        setRooms(newRooms);
    }

    //Misc handle functions for the dialog boxes
    const handleBunkerInfoOpen = () => {
        setBunkerInfoOpen(true);
    };

    const handleBunkerInfoClose = () => {
        setBunkerInfoOpen(false);
    };




    //Builds the JSON object for the bunker
    function BuildBunker() {
        const bunker = {
            name: bunkerName,
            description: bunkerDescription,
            items: bunkerItems,
            rooms: bunkerRooms
        };

        return bunker;
    }

    //Saves the bunker to local storage
    function handleBunkerSave() {
        console.log("Trying to save bunker to local storage")
        if (bunkerName === "") {
            dispatch({ type: "OPEN", severity: "error", message: "Bunker name cannot be empty" });
            return;
        }
        if (bunkerRooms.length < 3) {
            dispatch({ type: "OPEN", severity: "error", message: "Bunker must have at least 2 rooms" });
            return;
        }
        console.log(bunkerRooms)
        localStorage.setItem("bunker-" + bunkerName, JSON.stringify(BuildBunker()));
        dispatch({ type: "OPEN", severity: "success", message: "Bunker saved" });
    }

    //Handles the logic for editing a room
    function handleEditRoom(index) {
        console.log("Wanting to edit room " + index + " " + bunkerRooms[index].name)

        if (newName === "") {
            const newRooms = [...bunkerRooms];
            const newRoom = newRooms[index];
            setNewName(newRoom.name);
            setNewNorth(newRoom.north);
            setNewSouth(newRoom.south);
            setNewEast(newRoom.east);
            setNewWest(newRoom.west);
            setNewRoomDescription(newRoom.description);
            setNewRoomItem(newRoom.item);
            setNewRoomFinalRoom(newRoom.finalRoom);
            handleRemoveRoom(index);
        }
    }

    //Renders the basic bunker info near the top of the page
    const getBasicBunkerInfo = () => {
        return (
            <div>
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                    <h2>Basic Bunker Info</h2>
                    <h4>Rooms: {bunkerRooms.length}</h4>
                    <TextField required margin="normal" id="outlined-basic" label="Bunker Name" variant="outlined" value={bunkerName} onChange={(e) => setNewBunkerName(e.target.value)} />
                    <TextField margin="normal" id="outlined-basic" label="Bunker Description" variant="outlined" value={bunkerDescription} onChange={(e) => setNewBunkerDescription(e.target.value)} />
                </Box>
            </div>
        );
    }

    //Runs a few logic checks to make sure the bunker is valid. Not 100% foolproof, but should catch most errors
    const handleTestBunker = () => {
        console.log("Trying to test bunker")
        dispatch(TestBunkerLogic(BuildBunker()));
    }

    return (
        <div>
            <h1>{getBunker ? "Edit Bunker" : "Create Bunker"}</h1>
            <Link to="/manage"><Button variant="contained">Back</Button></Link>
            <Button variant="contained" onClick={handleBunkerSave}>Save Bunker</Button>
            <Button variant="contained" onClick={handleBunkerInfoOpen}>Bunker Info</Button>
            <Button variant="contained" onClick={handleTestBunker}>Test Bunker</Button>
            
            <ItemManagement setItems={setItems} bunkerItems={bunkerItems}/>

            {/*Contains the dialog box for bunker information/requirements*/}
            <Dialog open={bunkerInfoOpen} onClose={handleBunkerInfoClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Bunker Info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This is a placeholder for bunker info.
                    </DialogContentText>
                </DialogContent>
            </Dialog>


            {getBasicBunkerInfo()}

            {/*Contains the input fields for creating a room*/}
            <h2>Rooms</h2>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                <TextField required size="small" margin="dense" id="outlined-basic" label="Room Name" variant="outlined" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="Description" variant="outlined" value={newRoomDescription} onChange={(e) => setNewRoomDescription(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="North Room" variant="outlined" value={newNorth} onChange={(e) => setNewNorth(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="South Room" variant="outlined" value={newSouth} onChange={(e) => setNewSouth(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="East Room" variant="outlined" value={newEast} onChange={(e) => setNewEast(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="West Room" variant="outlined" value={newWest} onChange={(e) => setNewWest(e.target.value)} />
                <FormControlLabel control={<Checkbox checked={newRoomFinalRoom} onChange={(e) => setNewRoomFinalRoom(e.target.checked)} />} label="Final Room" />
                <FormControl>
                    <InputLabel id="RoomItemLabel">Item</InputLabel>
                    <Select
                        labelId="RoomItemLabel"
                        id="select"
                        value={newRoomItem}
                        label="Room Item"
                        onChange={(e) => setNewRoomItem(e.target.value)}>
                        <MenuItem value={"None"}>None</MenuItem>
                        {Object.entries(bunkerItems).map(([key, value]) => (
                            <MenuItem key={key} value={value.name}>{value.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleAddRoom}>Add Room</Button>
            </Box>

            {/*Renders the rooms in a card format under room creation*/}
            {bunkerRooms.map((room, index) => (
                <Card sx={{ minWidth: 275 }} key={index}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Room {index + 1}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {room.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Item: {room.item}
                        </Typography>
                        <Typography variant="body2">
                            North: {room.north}
                        </Typography>
                        <Typography variant="body2">
                            South: {room.south}
                        </Typography>
                        <Typography variant="body2">
                            East: {room.east}
                        </Typography>
                        <Typography variant="body2">
                            West: {room.west}
                        </Typography>
                        <Button variant="contained" onClick={() => handleRemoveRoom(index)}>Remove Room</Button>
                        <Button variant="contained" onClick={() => handleEditRoom(index)}>Edit Room</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

}

export default CreateBunker;