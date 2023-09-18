import React, { useContext, useEffect, useState } from "react";
import Header from "../../../UIElements/Header";
import RoomCard from "./RoomCard";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../../Services/SnackBar/SnackBarStoreContext";
import { LoadLevelFromLocalByName } from "../../../Services/LevelManagement/LevelManagerService";

import Room from "../../../Models/Room";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Bunker from "../../../Models/Bunker";
import { GetItemListFromLevel } from "../../../Services/Storage/StorageService";


function CreateLevel(props) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [, dispatch] = useContext(Context);
  const bunker = LoadLevelFromLocalByName(name);
  const [showCancel, setShowCancel] = useState(false);
  const itemList = GetItemListFromLevel(name);
  
  const room = new Room();

  useEffect(() => {
    console.log("CreateLevel useEffect");
    room.name = "Room 1";
    room.item = "Item 1";
    room.north = "Room 2";
    room.east = "Room 3";
    room.south = "Room 4";
    room.west = "Room 5";
    room.firstEnterDescription = "First Enter Description";
  }, []);

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

  const handleNYI = () => {
    dispatch({
      type: "OPEN",
      severity: "error",
      message: "This feature is not yet implemented!",
    });
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
              <button className="button" onClick={handleNYI}>
                Test Bunker
              </button>
            </div>

            <div className="buttons-left-row">
              <button className="button" onClick={handleNYI}>
                Bunker Requirements
              </button>
              <button className="button" onClick={handleNYI}>
                Room Requirements
              </button>
              <button className="button" onClick={handleNYI}>
                Item Requirements
              </button>
            </div>

            <div className="buttons-left-row">
              <button className="button" onClick={handleNYI}>
                Create Item
              </button>
              <button className="button" onClick={handleNYI}>
                Current Items
              </button>
            </div>

            <div className="secondary-text">
              <p>
                This page is still under construction! Please check back later!
              </p>
            </div>
          </div>
          <RoomCard room={room} creating={true} itemList={itemList}/>
        </div>
      </div>
    </>
  );
}

export default CreateLevel;
