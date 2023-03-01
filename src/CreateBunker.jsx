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
    const [itemPickups, setItemPickups] = useState("");
    const [alreadyPickedUp, setAlreadyPickedUp] = useState("");
    const [bacon, setBacon] = useState(false);
    const [itemNeeded, setItemNeeded] = useState("");
    const [itemPickupDescription, setItemPickupDescription] = useState("");
    const [itemIncludeDefaults, setItemIncludePickups] = useState(true);


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
        if (itemName === "" || itemDescription === "") {
            dispatch({ type: "OPEN", severity: "error", message: "Item name and description cannot be empty" });
            return;
        }
        const newItem = {
            name: itemName,
            description: itemDescription,
            required: itemRequired,
            pickups: itemPickups,
            defaultPickups: itemIncludeDefaults,
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
        if (bunkerRooms.length < 3) {
            dispatch({ type: "OPEN", severity: "error", message: "Bunker must have at least 2 rooms" });
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

    const handleItemPickupListDefault = (props) => {
        console.log("Changing default pickups")
        if (itemIncludeDefaults) {
            console.log("Changing to false")
            if (itemPickups === "") {
                dispatch({ type: "OPEN", severity: "error", message: "Cannot change default pickups when there are no custom pickups" });
                setItemIncludePickups(true);
            }
            else
                setItemIncludePickups(false);
        }
        else
            setItemIncludePickups(true);

    };

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

    const handleTestBunker = () => {
        console.log("Trying to test bunker")
        if (bunkerName === "") {
            dispatch({ type: "OPEN", severity: "error", message: "Bunker name cannot be empty" });
        }
        if (bunkerRooms.length < 2) {
            dispatch({ type: "OPEN", severity: "error", message: "Bunker must have at least 2 rooms" });
        }
        if (bunkerItems.length < 1) {
            dispatch({ type: "OPEN", severity: "error", message: "Bunker must have at least 1 item" });
        }
        for (let i = 0; i < bunkerRooms.length; i++) {
            if (bunkerRooms[i].north === bunkerRooms[i].name || bunkerRooms[i].south === bunkerRooms[i].name || bunkerRooms[i].east === bunkerRooms[i].name || bunkerRooms[i].west === bunkerRooms[i].name) {
                dispatch({ type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to itself" });
            }
        }
        console.log("Testing rooms")
        for (let i = 0; i < bunkerRooms.length; i++) {
            console.log("Testing room " + bunkerRooms[i].name)
            if (bunkerRooms[i].north !== "") {
                let roomNorthFound = false;
                console.log("Testing north in room " + bunkerRooms[i].name)
                for (let x = 0; x < bunkerRooms.length; x++) {
                    if (bunkerRooms[i].north === bunkerRooms[x].name) {
                        roomNorthFound = true;
                    }
                }
                if (!roomNorthFound) {
                    dispatch({ type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to a room that does not exist" });
                }
            }

            if (bunkerRooms[i].south !== "") {
                let roomSouthFound = false;
                console.log("Testing south in room " + bunkerRooms[i].name)
                for (let x = 0; x < bunkerRooms.length; x++) {
                    if (bunkerRooms[i].south === bunkerRooms[x].name) {
                        roomSouthFound = true;
                    }
                }
                if (!roomSouthFound) {
                    dispatch({ type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to a room that does not exist" });
                }
            }
            console.log("Testing east in room " + bunkerRooms[i].name)
            if (bunkerRooms[i].east !== "") {
                let roomEastFound = false;
                for (let x = 0; x < bunkerRooms.length; x++) {
                    if (bunkerRooms[i].east === bunkerRooms[x].name) {
                        roomEastFound = true;
                    }
                }
                if (!roomEastFound) {
                    dispatch({ type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to a room that does not exist" });
                }
            }
            console.log("Testing west in room " + bunkerRooms[i].name)
            if (bunkerRooms[i].west !== "") {
                let roomWestFound = false;
                for (let x = 0; x < bunkerRooms.length; x++) {
                    if (bunkerRooms[i].west === bunkerRooms[x].name) {
                        roomWestFound = true;
                    }
                }
                if (!roomWestFound) {
                    dispatch({ type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to a room that does not exist" });
                }
            }

        }

        console.log("Testing items")
        for (let i = 0; i < bunkerItems.length; i++) {
            let itemFound = false;
            for (let i = 0; i < bunkerRooms.length; i++) {
                if (bunkerRooms[i].item !== "") {
                    if (bunkerRooms[i].item === bunkerItems[i].name) {
                        console.log("Item " + bunkerItems[i].name + " is in room " + bunkerRooms[i].name)
                        itemFound = true;
                    }
                }
            }
            if (!itemFound) {
                dispatch({ type: "OPEN", severity: "warning", message: "Item " + bunkerItems[i].name + " is not in any room" });
            }
        }

    }

    return (
        <div>
            <h1>Create Bunker</h1>
            <Link to="/manage"><Button variant="contained">Back</Button></Link>
            <Button variant="contained" onClick={handleBunkerSave}>Save Bunker</Button>
            <Button variant="contained" onClick={handleItemOpen}>Create Item</Button>
            <Button variant="contained" onClick={handleBunkerInfoOpen}>Bunker Info</Button>
            <Button variant="contained" onClick={handleTestBunker}>Test Bunker</Button>

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
                            required
                            type="text"
                            fullWidth
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Item Description"
                            required
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={itemIncludeDefaults}
                                    onChange={() => handleItemPickupListDefault(props)}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Include Default Pickups"
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
                        <h3>Defaults</h3>
                        <p>Pickup List, Already Picked Up, Item Needed, and Item Pick Up all have default values. If you don't put anything in, they will be set to default. Defaults
                            are basic pickup words with the descriptions being the item name and the corresponding title.</p>
                        <h4>Item Name</h4>
                        <p>Is the name of the item</p>
                        <h4>Item Description</h4>
                        <p>Is a short description of the item. This will be played on entry to the room, when the item is available for pickup.</p>
                        <h4>Include Default Pickups</h4>
                        <p>If true, the default pickup words will be added to the pickup list. This will not matter if there is no user specified pickup words.</p>
                        <h4>Item Pickup List</h4>
                        <p>Is a list of words/sentences that can be used to pickup this item. Seperate each group with a comma.</p>
                        <h4>Already Picked Up Description</h4>
                        <p>This is a description that will be played if the player tries to pickup the item again.</p>
                        <h4>Item Needed Description</h4>
                        <p>This is a description that will be played if the player tries to aquire the item without having the required item that it needs.</p>
                        <h4>Item Picked Up Description</h4>
                        <p>This is a description that will be played when the player picks up the item.</p>
                        <h4>Bacon Item</h4>
                        <p>If true, the item will be required to complete the bunker. You can have none or all your items be required.</p>
                        <h4>Needed to Pickup</h4>
                        <p>This is the item that is required to pickup this item. If none is needed, leave blank.</p>

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
                        value={newRoomItem}
                        label="Room Item"
                        onChange={(e) => setItemRequired(e.target.value)}>
                        <MenuItem value={"None"}>None</MenuItem>
                        {Object.entries(bunkerItems).map(([key, value]) => (
                            <MenuItem value={value.name}>{value.name}</MenuItem>

                        ))}
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