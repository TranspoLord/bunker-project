import { TextField, Box, Card, Button, CardContent, Typography, FormControl, DialogActions } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SnackBar from './SnackBar';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { Input, InputLabel, MenuItem, Select } from '@mui/material';

function CreateBunker(props) {
    const [bunkerBool, setBunkerBool] = useState(props.isCreatingBunker);
    const [selectedBunker, setSelectedBunker] = useState(null);
    const [bunkerSaved, setBunkerSaved] = useState(false);
    const [bunkerName, setNewBunkerName] = useState("");
    const [bunkerDescription, setNewBunkerDescription] = useState("");

    const [rooms, setRooms] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNorth, setNewNorth] = useState("");
    const [newSouth, setNewSouth] = useState("");
    const [newEast, setNewEast] = useState("");
    const [newWest, setNewWest] = useState("");
    const [newRoomDescription, setNewRoomDescription] = useState("");
    const [newRoomItem, setNewRoomItem] = useState("");

    const [items, setItems] = useState([]);
    const [openWindow, setOpenWindow] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemRequired, setItemRequired] = useState("");

    function handleAddRoom(e) {
        e.preventDefault();
        if (newName === "" || newRoomDescription === "") { return; }
        const newRoom = {
            name: newName,
            north: newNorth,
            south: newSouth,
            east: newEast,
            west: newWest,
            description: newRoomDescription,
            item: newRoomItem
        };

        setRooms([...rooms, newRoom]);
        setNewName("");
        setNewNorth("");
        setNewSouth("");
        setNewEast("");
        setNewWest("");
        setNewRoomDescription("");
        setNewRoomItem("");
    }

    function handleRemoveRoom(index) {
        const newRooms = [...rooms];
        newRooms.splice(index, 1);
        setRooms(newRooms);
    }

    function handleAddItem(e) {
        e.preventDefault();
        if (itemName === "" || itemDescription === "") { return; }
        const newItem = {
            name: itemName,
            description: itemDescription,
            required: itemRequired
        };

        setItems([...items, newItem]);
        setItemName("");
        setItemDescription("");
        console.log("Item added" + newItem.name + " " + newItem.description + " " + newItem.required);
        handleCloseItem();
    }

    const handleItemOpen = () => {
        setOpenWindow(true);
    };

    const handleCloseItem = () => {
        setOpenWindow(false);
    };

    function handleBunkerSave() {
        //Save bunker to local storage here
        console.log("Saving bunker to local storage")
        console.log(rooms)
        localStorage.setItem("bunker-" + bunkerName, JSON.stringify(rooms))
        localStorage.setItem("bunker-" + bunkerName + "-items", JSON.stringify(items))
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
                    <TextField margin="normal" id="outlined-basic" label="Bunker Description" variant="outlined" value={bunkerDescription} onChange={(e) => setNewBunkerDescription(e.target.value)} />
                </Box>
            </div>
        );
    }

    const getItemsFromLocalStorage = () => {
        const items = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("bunker-" + bunkerName + "-items")) {
                items.push(JSON.parse(localStorage.getItem(key)));
            }
        }
        setItems(items);
        return items;
    }

    return (
        <div>
            <h1>Create Bunker</h1>
            <Link to="/manage"><Button variant="contained">Back</Button></Link>
            <Button variant="contained" onClick={handleBunkerSave}>Save Bunker</Button>
            <Button variant="contained" onClick={handleItemOpen}>Create Item</Button>
            <Dialog open={openWindow} onClose={handleCloseItem} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new item for your bunker.
                    </DialogContentText>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Item Name"
                            type="text"
                            fullWidth
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Item Description"
                            type="text"
                            fullWidth
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Needed to Pickup</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={itemRequired}
                                label="Required Item"
                                onChange={(e) => setItemRequired(e.target.value)}
                            >
                                <MenuItem value={"None"}>None</MenuItem>
                                {Object.entries(items).map(([key, value]) => (
                                    <MenuItem value={value.name}>{value.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={handleCloseItem}>Cancel</Button>
                            <Button onClick={handleAddItem} type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            {getBasicBunkerInfo()}
            <h2>Rooms</h2>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                <TextField required size="small" margin="dense" id="outlined-basic" label="Room Name" variant="outlined" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="Description" variant="outlined" value={newRoomDescription} onChange={(e) => setNewRoomDescription(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="North Room" variant="outlined" value={newNorth} onChange={(e) => setNewNorth(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="South Room" variant="outlined" value={newSouth} onChange={(e) => setNewSouth(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="East Room" variant="outlined" value={newEast} onChange={(e) => setNewEast(e.target.value)} />
                <TextField size="small" margin="dense" id="outlined-basic" label="West Room" variant="outlined" value={newWest} onChange={(e) => setNewWest(e.target.value)} />
                <FormControl>
                    <InputLabel id="RoomItemLabel">Item</InputLabel>
                    <Select
                        labelId="RoomItemLabel"
                        id="select"
                        value={itemRequired}
                        label="Room Item"
                        onChange={(e) => setItemRequired(e.target.value)}>
                        {Object.entries(items).map(([key, value]) => (
                            <MenuItem value={value.name}>{value.name}</MenuItem>
                        ))}
                        <MenuItem value={"None"}>None</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleAddRoom}>Add Room</Button>
            </Box>
            {rooms.map((room, index) => (
                <Card sx={{ minWidth: 275 }} key={index}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Room {index + 1}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {room.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {room.item.name}
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
                    </CardContent>
                </Card>
            ))}
        </div>
    );

}

export default CreateBunker;