import { TextField, Box, Card, Button, CardContent, Typography, FormControl, DialogActions } from '@mui/material';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { InputLabel, MenuItem, Select, FormControlLabel, Checkbox } from '@mui/material';
import { Context } from './SnackBarStoreContext';

function CreateBunker(props) {
    const [state, dispatch] = useContext(Context);
    const [bunkerInfoOpen, setBunkerInfoOpen] = useState(false);

    const [bunkerName, setNewBunkerName] = useState("");
    const [bunkerDescription, setNewBunkerDescription] = useState("");

    const [bunkerRooms, setRooms] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNorth, setNewNorth] = useState("");
    const [newSouth, setNewSouth] = useState("");
    const [newEast, setNewEast] = useState("");
    const [newWest, setNewWest] = useState("");
    const [newRoomDescription, setNewRoomDescription] = useState("");
    const [newRoomItem, setNewRoomItem] = useState("");

    const [bunkerItems, setItems] = useState([]);
    const [itemInfoOpen, setItemInfoDialogOpen] = useState(false);
    const [openWindow, setOpenWindow] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemRequired, setItemRequired] = useState("");
    const [itemPickups, setItemPickups] = useState([]);
    const [alreadyPickedUp, setAlreadyPickedUp] = useState("");
    const [bacon, setBacon] = useState(false);
    const [itemNeeded, setItemNeeded] = useState("");
    const [itemPickupDescription, setItemPickupDescription] = useState("");


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

        setRooms([...bunkerRooms, newRoom]);
        setNewName("");
        setNewNorth("");
        setNewSouth("");
        setNewEast("");
        setNewWest("");
        setNewRoomDescription("");
        setNewRoomItem("");
    }

    function handleRemoveRoom(index) {
        const newRooms = [...bunkerRooms];
        newRooms.splice(index, 1);
        setRooms(newRooms);
    }

    function handleAddItem(e) {
        e.preventDefault();
        if (itemName === "" || itemDescription === "") { return; }
        const newItem = {
            name: itemName,
            description: itemDescription,
            required: itemRequired,
            pickups: itemPickups,
            descAlreadyHave: alreadyPickedUp,
            descItemNeeded: itemNeeded,
            descItemPickup: itemPickupDescription,
            baconItem: bacon,
        };

        setItems([...bunkerItems, newItem]);
        setItemName("");
        setItemDescription("");
        console.log("Item added" + newItem.name + " " + newItem.description + " " + newItem.required);
        dispatch({ type: "OPEN", severity: "success", message: "Item added" });
        handleCloseItem();
    }

    //TODO: Remove a specific item from the list

    const handleItemOpen = () => {
        setOpenWindow(true);
    };

    const handleCloseItem = () => {
        setOpenWindow(false);
    };

    const handleItemInfoOpen = () => {
        setItemInfoDialogOpen(true);
    };

    const handleItemInfoClose = () => {
        setItemInfoDialogOpen(false);
    };

    const handleBunkerInfoOpen = () => {
        setBunkerInfoOpen(true);
    };

    const handleBunkerInfoClose = () => {
        setBunkerInfoOpen(false);
    };

    

    function BuildBunkerJSON() {
        const bunker = {
            name: bunkerName,
            description: bunkerDescription,
            items: bunkerItems,
            rooms: bunkerRooms
        };

        return JSON.stringify(bunker);
    }

    function handleBunkerSave() {
        console.log("Trying to save bunker to local storage")
        if (bunkerName === "") {
            dispatch({ type: "OPEN", severity: "error", message: "Bunker name cannot be empty" });
            return;
        }
        console.log(bunkerRooms)
        localStorage.setItem("bunker-" + bunkerName, BuildBunkerJSON());
        dispatch({ type: "OPEN", severity: "success", message: "Bunker saved" });
    }

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
            handleRemoveRoom(index);
        }
    }

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

    return (
        <div>
            <h1>Create Bunker</h1>
            <Link to="/manage"><Button variant="contained">Back</Button></Link>
            <Button variant="contained" onClick={handleBunkerSave}>Save Bunker</Button>
            <Button variant="contained" onClick={handleItemOpen}>Create Item</Button>
            <Button variant="contained" onClick={handleBunkerInfoOpen}>Bunker Info</Button>
            <Dialog open={bunkerInfoOpen} onClose={handleBunkerInfoClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Bunker Info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This is a placeholder for bunker info.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
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
                        <TextField
                            margin="dense"
                            id="itemPickupsList"
                            label="Item Pickup List - Seperate with commas"
                            type="text"
                            fullWidth
                            value={itemPickups}
                            onChange={(e) => setItemPickups(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="alreadyPickedUp"
                            label="Already Picked Up Description"
                            type="text"
                            fullWidth
                            value={alreadyPickedUp}
                            onChange={(e) => setAlreadyPickedUp(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="itemNeeded"
                            label="Item Needed Description"
                            type="text"
                            fullWidth
                            value={itemNeeded}
                            onChange={(e) => setItemNeeded(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="itemPickupedUp"
                            label="Item Picked Up Description"
                            type="text"
                            fullWidth
                            value={itemPickupDescription}
                            onChange={(e) => setItemPickupDescription(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={bacon}
                                    onChange={(e) => setBacon(e.target.checked)}
                                    name="bacon"
                                    color="primary"
                                />
                            }
                            label="Bacon Item"
                        />
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Needed to Pickup</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={itemRequired}
                                label="Required Item"
                                onChange={(e) => setItemRequired(e.target.value.name)}
                            >
                                <MenuItem value={"None"}>None</MenuItem>
                                {Object.entries(bunkerItems).map(([key, value]) => (
                                    <MenuItem value={value.name}>{value.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={handleItemInfoOpen}>Item Info</Button>
                            <Button onClick={handleCloseItem}>Cancel</Button>
                            <Button onClick={handleAddItem} type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={itemInfoOpen} onClose={handleItemInfoClose} aria-labelledby="form-dialog-title">  
                <DialogTitle id="form-dialog-title">Item Info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Placeholder Text
                        Bacon Item means its required for endgame
                    </DialogContentText>
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
                        {Object.entries(bunkerItems).map(([key, value]) => (
                            <MenuItem value={value.name}>{value.name}</MenuItem>
                        ))}
                        <MenuItem value={"None"}>None</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleAddRoom}>Add Room</Button>
            </Box>
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
                        <Button variant="contained" onClick={() => handleEditRoom(index)}>Edit Room</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

}

export default CreateBunker;