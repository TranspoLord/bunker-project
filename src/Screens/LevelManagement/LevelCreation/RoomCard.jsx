import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Room from "../../../Models/Room";
import Item from "../../../Models/Item";

function RoomCard({ room, creating, itemList }) {
  const [newRoom, setNewRoom] = React.useState(new Room());
  useEffect(() => {
    if (room) {
      setNewRoom(room);
    }
  }, [room]);

  const handleButtonClick = () => {
    console.log("Button clicked");
  };

  const creatingCard = () => {
    return (
      <div>
        <Card sx={{ minWidth: 275, marginRight: "18px" }}>
          <CardContent>
            <form>
              <Grid container spacing={3} marginBottom={3} alignItems="center">
                <Grid item xs={8}>
                  {" "}
                  {/* Adjust the column size as needed */}
                  <TextField
                    id="roomName"
                    label="Room Name"
                    variant="outlined"
                    value={room ? room.name : ""}
                    onChange={(e) => {
                      newRoom.name = e.target.value;
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  {" "}
                  {/* Adjust the column size as needed */}
                  <div className="button-container-right">
                    <button className="button-a" onClick={handleButtonClick}>
                      Save
                    </button>
                    <button className="button-a" onClick={handleButtonClick}>
                      Remove
                    </button>
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                spacing="5px"
                flexDirection="row"
                marginLeft="0px"
              >
                <TextField
                  id="northRoom"
                  label="Room to North"
                  variant="outlined"
                  sx={{ marginRight: "15px" }}
                  value={room ? room.north : ""}
                  onChange={(e) => {
                    newRoom.north = e.target.value;
                  }}
                />

                <TextField
                  id="eastRoom"
                  label="Room to East"
                  variant="outlined"
                  sx={{ marginRight: "15px" }}
                  value={room ? room.east : ""}
                  onChange={(e) => {
                    newRoom.east = e.target.value;
                  }}
                />

                <TextField
                  id="southRoom"
                  label="Room to South"
                  variant="outlined"
                  sx={{ marginRight: "15px" }}
                  value={room ? room.south : ""}
                  onChange={(e) => {
                    newRoom.south = e.target.value;
                  }}
                />

                <TextField
                  id="westRoom"
                  label="Room to West"
                  variant="outlined"
                  sx={{ marginRight: "15px" }}
                  value={room ? room.west : ""}
                  onChange={(e) => {
                    newRoom.west = e.target.value;
                  }}
                />
              </Grid>
              <Grid
                container
                spacing="5px"
                flexDirection="row"
                marginLeft="0px"
                marginTop="15px"
                
              >
                <FormControl>
                  <InputLabel id="itemLabel">Room Item</InputLabel>
                  <Select
                    labelId={`Room ${room.item ? 'Item' : ''}`}
                    id="roomItem"
                    fullWidth
                    style={{ minWidth: "130px" }}
                    value={room ? room.item : ""}
                    onChange={(e) => {
                      newRoom.item = e.target.value;
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid
                container
                spacing="5px"
                flexDirection="row"
                marginLeft="0px"
                marginTop="15px"
              >
                <TextField
                  id="firstEnterDescription"
                  label="First Time Enter Description"
                  variant="outlined"
                  fullWidth
                  value={room ? room.firstEnterDescription : ""}
                  onChange={(e) => {
                    newRoom.firstEnterDescription = e.target.value;
                  }}
                />
              </Grid>
              <Grid
                container
                spacing="5px"
                flexDirection="row"
                marginLeft="0px"
                marginTop="15px"
              >
                <TextField
                  id="AfterFirstEnterDescription"
                  label="Subsequent Enter Description"
                  variant="outlined"
                  fullWidth
                  value={room ? room.afterFirstEnterDescription : ""}
                  onChange={(e) => {
                    newRoom.afterFirstEnterDescription = e.target.value;
                  }}
                />
              </Grid>
              <Grid
                container
                spacing="5px"
                flexDirection="row"
                marginLeft="0px"
                marginTop="15px"
              >
                <TextField
                  id="roomDescription"
                  label="Room Description"
                  variant="outlined"
                  fullWidth
                  value={room ? room.roomDescription : ""}
                  onChange={(e) => {
                    newRoom.roomDescription = e.target.value;
                  }}
                />
              </Grid>
              
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  const listedCard = () => {
    return (
      <div>
        <Card sx={{ minWidth: 275, marginRight: "18px" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {room.name}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography variant="body2">Room Item: {room.item}</Typography>
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
    );
  };

  return creating ? creatingCard() : listedCard();
}

export default RoomCard;
