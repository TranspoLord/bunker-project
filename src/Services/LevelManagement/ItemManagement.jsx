import { React } from "react";
import { useState, useContext } from "react";
import { Box, ListItemButton } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Context } from "../SnackBar/SnackBarStoreContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function ItemManagement({ bunkerItems, setItems }) {
  const [state, dispatch] = useContext(Context);

  const [itemInfoOpen, setItemInfoDialogOpen] = useState(false);
  const [itemCreationOpen, setOpenWindow] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemRequired, setItemRequired] = useState("");
  const [itemPickups, setItemPickups] = useState("");
  const [alreadyPickedUp, setAlreadyPickedUp] = useState("");
  const [bacon, setBacon] = useState(false);
  const [itemNeeded, setItemNeeded] = useState("");
  const [itemPickupDescription, setItemPickupDescription] = useState("");
  const [itemIncludeDefaults, setItemIncludePickups] = useState(true);
  const [itemListOpen, setItemListOpen] = useState(false);
  const [itemListExpanded, setItemListExpanded] = useState(false);
  const [itemSecondaryDelete, setItemSecondaryDelete] = useState(false);
  const [itemIncludeNameInPickups, setItemIncludeNameInPickups] =
    useState(true);

  //Adds an item to the bunkerItems array
  function handleAddItem(e) {
    e.preventDefault();
    if (itemName === "" || itemDescription === "") {
      dispatch({
        type: "OPEN",
        severity: "error",
        message: "Item name and description cannot be empty",
      });
      return;
    }
    if (itemIncludeNameInPickups) {
      itemPickups.push(itemName);
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
    console.log(
      "Item added" +
        newItem.name +
        " " +
        newItem.description +
        " " +
        newItem.required
    );
    dispatch({ type: "OPEN", severity: "success", message: "Item added" });
    handleCloseItem();
  }

  //Removes an item from the bunkerItems array
  function handleDeleteItem(index) {
    const newItems = [...bunkerItems];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  //Handles the logic for including default pickups
  const handleItemPickupListDefault = () => {
    console.log("Changing default pickups");
    if (itemIncludeDefaults) {
      console.log("Changing to false");
      if (itemPickups === "") {
        dispatch({
          type: "OPEN",
          severity: "error",
          message:
            "Cannot change default pickups when there are no custom pickups",
        });
        setItemIncludePickups(true);
      } else setItemIncludePickups(false);
    } else setItemIncludePickups(true);
  };

  //Misc handle functions for the dialog boxes
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

  const handleItemListOpen = () => {
    setItemListOpen(true);
  };

  const handleItemListClose = () => {
    setItemListOpen(false);
  };

  const handleItemListExpand = () => {
    setItemListExpanded(!itemListExpanded);
  };

  const handleItemSecondaryDeleteOpen = () => {
    setItemSecondaryDelete(true);
  };

  const handleItemSecondaryDeleteClose = () => {
    setItemSecondaryDelete(false);
  };

  return (
    <>
      <div className="secondary-container-d">
        <div className="buttons-left-row">
          <Button variant="contained" onClick={handleItemOpen}>
            Create Item
          </Button>
          <Button variant="contained" onClick={handleItemListOpen}>
            Item List
          </Button>
        </div>
      </div>
      {/*Contains the dialog box for item creation*/}
      <Dialog
        open={itemCreationOpen}
        onClose={handleCloseItem}
        aria-labelledby="form-dialog-title"
      >
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
              key="name"
              label="Name"
              required
              type="text"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              key="description"
              label="Description"
              required
              type="text"
              fullWidth
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />

            <TextField
              margin="dense"
              id="itemPickupsList"
              key="itemPickupsList"
              label="Pickup Word List - Seperate with commas"
              type="text"
              fullWidth
              value={itemPickups}
              onChange={(e) => setItemPickups(e.target.value)}
            />
            <div style={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemIncludeDefaults}
                    onChange={() => handleItemPickupListDefault()}
                    name="checkedB"
                    color="primary"
                    key="itemIncludeDefaults"
                  />
                }
                label="Include Default Pickups"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemIncludeNameInPickups}
                    onChange={() =>
                      setItemIncludeNameInPickups(!itemIncludeNameInPickups)
                    }
                    name="checkedC"
                    color="primary"
                    key="itemIncludeNameInPickups"
                  />
                }
                label="Include Item Name in Pickups"
              />
            </div>
            <TextField
              margin="dense"
              id="itemPickedUp"
              key="itemPickedUp"
              label="Picked Up Description"
              type="text"
              fullWidth
              value={itemPickupDescription}
              onChange={(e) => setItemPickupDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              id="alreadyPickedUp"
              key="alreadyPickedUp"
              label="Already Picked Up Description"
              type="text"
              fullWidth
              value={alreadyPickedUp}
              onChange={(e) => setAlreadyPickedUp(e.target.value)}
            />
            <TextField
              margin="dense"
              id="itemNeeded"
              key="itemNeeded"
              label="Item Needed Description"
              type="text"
              fullWidth
              value={itemNeeded}
              onChange={(e) => setItemNeeded(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="select-label">Item Needed to Pickup</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                key="select"
                value={itemRequired}
                label="Required Item"
                onChange={(e) => setItemRequired(e.target.value.name)}
              >
                {Object.entries(bunkerItems).map(([key, value]) => (
                  <MenuItem key={key} value={value.name}>
                    {value.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={bacon}
                  onChange={(e) => setBacon(e.target.checked)}
                  name="bacon"
                  color="primary"
                  key="bacon"
                />
              }
              label="Bacon Item"
            />
            <DialogActions>
              <Button onClick={handleItemInfoOpen}>Item Info</Button>
              <Button onClick={handleCloseItem}>Cancel</Button>
              <Button onClick={handleAddItem} type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/*Contains the dialog box for item information/requirements*/}
      <Dialog
        open={itemInfoOpen}
        onClose={handleItemInfoClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Item Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h3>Defaults</h3>
            <p>
              Pickup List, Already Picked Up, Item Needed, and Item Pick Up all
              have default values. If you don't put anything in, they will be
              set to default. Defaults are basic pickup words with the
              descriptions being the item name and the corresponding title.
            </p>
            <h4>Item Name</h4>
            <p>Is the name of the item</p>
            <h4>Item Description</h4>
            <p>
              Is a short description of the item. This will be played on entry
              to the room, when the item is available for pickup.
            </p>
            <h4>Include Default Pickups</h4>
            <p>
              If true, the default pickup words will be added to the pickup
              list. This will not matter if there is no user specified pickup
              words.
            </p>
            <h4>Item Pickup List</h4>
            <p>
              Is a list of words/sentences that can be used to pickup this item.
              Seperate each group with a comma.
            </p>
            <h4>Already Picked Up Description</h4>
            <p>
              This is a description that will be played if the player tries to
              pickup the item again.
            </p>
            <h4>Item Needed Description</h4>
            <p>
              This is a description that will be played if the player tries to
              aquire the item without having the required item that it needs.
            </p>
            <h4>Item Picked Up Description</h4>
            <p>
              This is a description that will be played when the player picks up
              the item.
            </p>
            <h4>Bacon Item</h4>
            <p>
              If true, the item will be required to complete the bunker. You can
              have none or all your items be required.
            </p>
            <h4>Needed to Pickup</h4>
            <p>
              This is the item that is required to pickup this item. If none is
              needed, leave blank.
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/*Contains the dialog box for the item list*/}
      <Dialog
        open={itemListOpen}
        onClose={handleItemListClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Item List</DialogTitle>
        <DialogContent>
          <div>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-label="main item list"
            >
              {Object.entries(bunkerItems).map(([key, value]) => (
                <div key={key}>
                  <Box sx={{ display: "flex" }}>
                    <ListItemText primary={value.name}></ListItemText>
                    <ListItemButton onClick={handleItemListExpand}>
                      {itemListExpanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </Box>
                  <Collapse in={itemListExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4, display: "block" }}>
                        <p>
                          <b>Description: </b>
                          {value.description}
                        </p>
                        <p>
                          <b>Pickup Words: </b>
                          {value.pickups}
                        </p>
                        <p>
                          <b>Already Picked Up Description: </b>
                          {value.descAlreadyHave}
                        </p>
                        <p>
                          <b>Item Needed Description: </b>
                          {value.descItemNeeded}
                        </p>
                        <p>
                          <b>Item Picked Up Description: </b>
                          {value.descItemPickup}
                        </p>
                        <p>
                          <b>Bacon Item: </b>
                          {value.baconItem ? "Yes" : "No"}
                        </p>
                        <p>
                          <b>Item Required: </b>
                          {value.required}
                        </p>
                      </ListItemButton>
                      <Button onClick={handleItemSecondaryDeleteOpen}>
                        Delete Item
                      </Button>
                      <Dialog
                        open={itemSecondaryDelete}
                        onClose={handleItemSecondaryDeleteClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="form-dialog-title">
                          Delete Item
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this item?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleItemSecondaryDeleteClose}>
                            Cancel
                          </Button>
                          <Button onClick={() => handleDeleteItem(key)}>
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </List>
                  </Collapse>
                </div>
              ))}
            </List>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ItemManagement;
