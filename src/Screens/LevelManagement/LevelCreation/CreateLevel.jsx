import React, { useContext, useState } from "react";
import Header from "../../../UIElements/Header";
import RoomCard from "./RoomCard";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../../Services/SnackBar/SnackBarStoreContext";
import { LoadLevelFromLocalByName } from "../../../Services/LevelManagement/LevelManagerService";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Room } from "@mui/icons-material";

function CreateLevel(props) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [, dispatch] = useContext(Context);
  const bunker = LoadLevelFromLocalByName(name);
  const [showCancel, setShowCancel] = useState(false);

  const handleCancel = () => {
    console.log("Cancel");
    setShowCancel(true);
  };

  const handleSaveBunker = () => {
    console.log("Save bunker");
    dispatch({
      type: "OPEN",
      severity: "success",
      message: "Bunker saved successfully!",
    });
  };

  const room = {
    name: "Room 1",
    item: "Item 1",
    north: "Room 2",
    east: "Room 3",
    south: "Room 4",
    west: "Room 5",
    firstEnterDescription: "First Enter Description"
  };

  return (
    <>
      <Header />
      <Dialog open={showCancel} onClose={() => setShowCancel(false)}>
        <DialogTitle>Cancel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel? Any unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancel(false)}>Cancel</Button>
          <Button onClick={() => navigate("/manage")}>Yes</Button>
        </DialogActions>
      </Dialog>
      <div className="secondary-container-a">
        <div className="title-text">
          {bunker ? "Edit Bunker" : "Create Bunker"}
        </div>

        <div className="secondary-container-f">
          <div className="buttons-container">
            <div className="buttons-left-row">
              <button className="button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="button" onClick={handleSaveBunker}>
                Save Bunker
              </button>
              <button className="button" onClick={handleSaveBunker}>
                Test Bunker
              </button>
            </div>

            <div className="buttons-left-row">
              <button className="button" onClick={handleCancel}>
                Bunker Requirements
              </button>
              <button className="button" onClick={handleSaveBunker}>
                Room Requirements
              </button>
              <button className="button" onClick={handleSaveBunker}>
                Item Requirements
              </button>
            </div>

            <div className="buttons-left-row">
              <button className="button" onClick={handleCancel}>
                Create Item
              </button>
              <button className="button" onClick={handleSaveBunker}>
                Current Items
              </button>
            </div>

            <div className="secondary-text">
              <p>
                This page is still under construction! Please check back later!
              </p>
            </div>
          </div>
          <RoomCard room={room} />
        </div>
      </div>
    </>
  );
}

export default CreateLevel;
