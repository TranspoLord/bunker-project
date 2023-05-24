import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import GameSettings from "./GameSettings";


const BunkerChoice = () => {

    const [bunkerList, setBunkerList] = useState([]);

    useEffect(() => {
        console.log("Loading bunkers from local storage")
        BunkerLoadFromLocal()
    }, []);

    function BunkerLoadFromLocal() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            console.log("Key: " + key)
            if (key.startsWith("bunker-")) {
                const bunkerName = key.substring('bunker-'.length);
                const dataString = localStorage.getItem(key);
                const data = JSON.parse(dataString);
                setBunkerList(bunkerList => bunkerList.concat(data))
            }
        }
        console.log("Bunker list: " + bunkerList)
    }

    function BunkerCard(bunker, index) {
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
                    <Link to={`/gameSettings/${bunker.name}`}>
                        <Button size="small" variant="outlined">Choose</Button>
                    </Link>
                </CardActions>
            </Card>
        );
    }


return (
    <div>
        <Link to="/game">
            <Button variant='contained'>Back</Button>
        </Link>
        {bunkerList.map((bunker, index) => (
            <div key={index}>
                {BunkerCard(bunker, index)}
            </div>
        ))}
    </div>
);

}
export default BunkerChoice;