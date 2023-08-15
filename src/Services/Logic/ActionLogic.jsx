import React, { useState, useEffect, useRef} from 'react';
import { Link, useParams } from 'react-router-dom';

const ActionLogic = (props) => {
    //React variables
    const { name } = useParams();
    const [update, setUpdate] = useState(0);

    //Main/Reference variables
    const [bunker, setBunker] = useState(null);
    const [messages, setMessages] = useState([]);

    //Input and logic variables
    const playerInput = useRef();
    const [lastCommand, setLastCommand] = useState('');


    useEffect(() => {
        //Add any event listeners here that need rerenders
    }, [update]);

    //Handles the pickup command logic for items
    const createPickups = (item, room) => {
        const pickups = item?.pickups?.reduce((prev, curr) => {
            prev[curr.toLowerCase()] = () => {
                //Pickup word accepted
                const successful = bunker.player.pickupItem(item);
                if (successful) {
                    //Remove item from room and add to inventory
                    room.removeItem()
                    setMessages(prev => [...prev, item.descItemPickup])
                } else {
                    //Another item is needed
                    setMessages(prev => [...prev, item.descItemNeeded])
                }
                return successful;
            }
            return prev;
        }, {});
    }

    //Handles the already have command logic for items
    const createAlreadyHaves = (removedItem) => {
        const alreadyHaves = removedItem?.pickups?.reduce((prev, curr) => {
            prev[curr.toLowerCase()] = () => {
                console.log(removedItem.descAlreadyHave);
                setMessages(prev => [...prev, removedItem.descAlreadyHave])
            }
            return prev;
        }, {});
    }


    //Handles the logic for what happens right after submitting a command
    const handleSubmit = (e) => {
        e.preventDefault();

        //Get input and get fresh references to room
        const text = playerInput.current.value.toLowerCase().trim();
        console.log("Command: ", text);
        let room = bunker.player.getRoom();
        let item = room.getItem();

        //Pickup command logic
        const pickups = createPickups(item, room);

        //Already have command logic
        const removedItem = room.getRemovedItem();
        const alreadyHaves = createAlreadyHaves(removedItem);

        //Default pickup command logic
        let defaultPickUp;
        if (!item?.pickups) {
            defaultPickUp = {
                "pickup": () => {
                    console.log('pickup');
                    setMessages(prev => [...prev, 'No Item Found!'])
                },
            }
        }

        const commands = {
            ...pickups,
            ...alreadyHaves,
            ...defaultPickUp,
            "north": () => {
                //If the last command was north and the room is final, go to final room
                if (lastCommand === 'north' && room.north && room.north.isFinal) {
                    //Go to this room
                    bunker.north();

                    //Clear messages and last command
                    setMessages([]);
                    setLastCommand('');

                    //Run final room logic
                    finalRoomLogic();
                } //If the room is final but the last command wasn't north, ask if they want to go to final room
                else if (room.north && room.north.isFinal) {
                    setLastCommand('north');
                    setMessages(prev => [...prev, "You are heading towards the last room! Are you sure you want to go that way? (Type last command to confirm)"]);
                } //If the room isn't final, go to the next room
                else if (room.north) {
                    console.log('going north');
                    bunker.north();
                    setMessages([]);
                    setLastCommand('');
                } //If there is no room, tell the user they can't go that way
                else {
                    setMessages(prev => [...prev, "You can't go that way!"]);
                }
            },
            "east": () => { //Same logic as north
                if (lastCommand === 'east' && room.east && room.east.isFinal) {
                    bunker.east();
                    setMessages([]);
                    setLastCommand('');
                    finalRoomLogic();
                }
                else if (room.east && room.east.isFinal) {
                    setLastCommand('east');
                    setMessages(prev => [...prev, "You are heading towards the last room! Are you sure you want to go that way? (Type last command to confirm)"]);
                }
                else if (room.east) {
                    console.log('going east');
                    bunker.east();
                    setMessages([]);
                    setLastCommand('');
                }
                else {
                    setMessages(prev => [...prev, "You can't go that way!"]);
                }
            },
            "south": () => { //Same logic as north
                if (lastCommand === 'south' && room.south && room.south.isFinal) {
                    bunker.south();
                    setMessages([]);
                    setLastCommand('');
                    finalRoomLogic();
                }
                else if (room.south && room.south.isFinal) {
                    setLastCommand('south');
                    setMessages(prev => [...prev, "You are heading towards the last room! Are you sure you want to go that way? (Type last command to confirm)"]);
                }
                else if (room.south) {
                    console.log('going south');
                    bunker.south();
                    setMessages([]);
                    setLastCommand('');
                }
                else {
                    setMessages(prev => [...prev, "You can't go that way!"]);
                }
            },
            "west": () => { //Same logic as north
                if (lastCommand === 'west' && room.west && room.west.isFinal) {
                    bunker.west();
                    setMessages([]);
                    setLastCommand('');
                    finalRoomLogic();
                }
                else if (room.west && room.west.isFinal) {
                    setLastCommand('west');
                    setMessages(prev => [...prev, "You are heading towards the last room! Are you sure you want to go that way? (Type last command to confirm)"]);
                }
                else if (room.west) {
                    console.log('going west');
                    bunker.west();
                    setMessages([]);
                    setLastCommand('');
                }
                else {
                    setMessages(prev => [...prev, "You can't go that way!"]);
                }
            },
            "inventory": () => {
                console.log('inventory');
                setMessages(prev => [...prev, bunker.player.getInventory()])
            }
        };

        //If the command is in the commands object
        if (commands[text]) {
            //Run the command
            commands[text]();
        } //If the command is not in the commands object, tell the user it is invalid
        else {
            setMessages(prev => [...prev, "Invalid command!"]);
        }

        //Clear input
        playerInput.current.value = '';
    }

    //Handles the logic for the final room
    const finalRoomLogic = () => {
        //Get the final room
        const finalRoom = bunker.player.getRoom();
        
    } 

    return (
        <>

        </>
    );
}


export default ActionLogic;
