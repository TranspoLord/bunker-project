import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  LevelExportToJSON,
} from "../../Services/LevelManagement/LevelManagerService";

export const LevelCard = ({ bunker, onRemove } ) => {
  const [openWindow, setOpenWindow] = useState(false);

  const handleClose = () => {
    setOpenWindow(false);
  };

  const handleCloseRemove = () => {
    onRemove();
    setOpenWindow(false);
  };

  const handleBunkerDelete = () => {
    setOpenWindow(true);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bunker.name}
        </Typography>
        <Typography variant="body2">
          Room Count: {bunker.rooms.length}
        </Typography>
        <Typography variant="body2">
          Description: {bunker.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            LevelExportToJSON(bunker);
          }}
        >
          Export
        </Button>
        <Link to={`/manage/edit/${bunker.name}`}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              console.log("Edit bunker: ");
            }}
          >
            Edit
          </Button>
        </Link>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            handleBunkerDelete();
          }}
        >
          Delete
        </Button>
        <Dialog
          open={openWindow}
          onClose={handleClose}
          aria-labelledby="deleteBunker"
        >
          <DialogTitle id="deleteBunker">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will delete the bunker and all of its rooms.
            </DialogContentText>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCloseRemove}>Delete</Button>
          </DialogContent>
        </Dialog>
      </CardActions>
    </Card>
  );
};
