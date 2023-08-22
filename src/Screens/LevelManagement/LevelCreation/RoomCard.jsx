import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

function RoomCard({ room, creating }) {
  useEffect(() => {
    if (creating) {
      console.log("Creating room");
    } else if (!creating && room) {
      console.log("Editing room");
    } else {
      console.log("Room Card");
      roomCard();
    }
  }, []);

  const roomCard = () => {
    return (
      <>
        <div>
          <Card sx={{ minWidth: 275, marginRight: "18px" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {room.name}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <Typography variant="body2">
                    Room Item: {room.item}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">North: {room.north}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">East: {room.east}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">South: {room.south}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">West: {room.west}</Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" sx={{ marginTop: "15px" }}>
                First Enter Description: {room.firstEnterDescription}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const updatingRoom = (roomVars) => {

  }


};

export default RoomCard;
