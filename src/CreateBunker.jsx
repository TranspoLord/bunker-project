import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function CreateBunker(props){
    const [bunkerBool, setBunkerBool] = useState(props.isCreatingBunker);
    const [selectedBunker, setSelectedBunker] = useState(null);
    const [bunkerSaved, setBunkerSaved] = useState(false);
    const [bunkerName, setNewBunkerName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNorth, setNewNorth] = useState("");
    const [newSouth, setNewSouth] = useState("");
    const [newEast, setNewEast] = useState("");
    const [newWest, setNewWest] = useState("");
    const [newDescription, setNewDescription] = useState("");

    function handleAddRoom (e) {
        e.preventDefault();
        const newRoom = {
            name: newName,
            north: newNorth,
            south: newSouth,
            east: newEast,
            west: newWest,
            description: newDescription
        };

        setRooms([...rooms, newRoom]);
        setNewName("");
        setNewNorth("");
        setNewSouth("");
        setNewEast("");
        setNewWest("");
        setNewDescription("");
    }

    function handleRemoveRoom (index) {
        const newRooms = [...rooms];
        newRooms.splice(index, 1);
        setRooms(newRooms);
    }

    function handleBunkerSave() {
        //Save bunker to local storage here
        console.log("Saving bunker to local storage")
        console.log(rooms)
        localStorage.setItem("bunker" + bunkerName, JSON.stringify(rooms))
        setBunkerBool(false)
        setBunkerSaved(true)
    }

    return (
        <div>
            <h1>{bunkerBool ? 'Creating' : bunkerSaved ? 'Editing - Saved' : 'Editing'}</h1>
            <Link to="/manage">
                <button>Back</button></Link>
            <button className = "bunkerSave" onClick={() => handleBunkerSave()}>Save</button>
            <input
                type="text"
                placeholder="Bunker Name"
                value={bunkerName}
                onChange={(e) => setNewBunkerName(e.target.value)}
            />
            <form onSubmit={handleAddRoom}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="North"
                    value={newNorth}
                    onChange={(e) => setNewNorth(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="South"
                    value={newSouth}
                    onChange={(e) => setNewSouth(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="East"
                    value={newEast}
                    onChange={(e) => setNewEast(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="West"
                    value={newWest}
                    onChange={(e) => setNewWest(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <button type="submit">Add Room</button>
            </form>
            {rooms.map((room, index) => (
                <div key={index} className = "roomCards">
                    <h3>{room.name}</h3>
                    <p>{room.north}</p>
                    <p>{room.south}</p>
                    <p>{room.east}</p>
                    <p>{room.west}</p>
                    <p>{room.description}</p>
                    <button onClick={() => handleRemoveRoom(index)}>Delete</button>
                </div>
            ))}
        </div>
    );

}


// function RoomComponent(props) {
//     const nameInput = useRef()
//     const northInput = useRef()
//     const southInput = useRef()
//     const eastInput = useRef()
//     const westInput = useRef()

//     function saveRoom() {
//         props.setBunker(prevBunker =>
//         (
//             {
//                 ...prevBunker, [nameInput.current.value]: {
//                     "Name": nameInput.current.value,
//                     "North": northInput.current.value,
//                     "South": southInput.current.value,
//                     "East": eastInput.current.value,
//                     "West": westInput.current.value,
//                 }
//             }
//         )
//         )
//     }

//     function removeRoom() {
//         props.setBunker(prevBunker => {
//             delete props[nameInput.current.value]             
//         })
//     }

//     return (
//         <div>
//             <input ref={nameInput} />
//             <input ref={northInput} />
//             <input ref={southInput} />
//             <input ref={eastInput} />
//             <input ref={westInput} />
//             <button onClick={() => { saveRoom() }}>Save</button>
//             <button onClick={() => { removeRoom() }}>Clear</button>
//         </div>
//     )
// }


// function CreateBunker(props) {
//     const [bunker, setBunker] = useState({})
//     let bunkerName = ""
//     if (!props.isCreatingBunker) {
//         bunkerName = "Editing"
//     } else {
//         bunkerName = "Creating"
//     }
//     const rooms = Object.keys(bunker).map((key) => {
//         // return RoomComponent
//         return (
//             <div>
//                 <RoomComponent setBunker={setBunker} room={bunker[key]} />
//             </div>
//         )
//     })

//     return (
//         <div>
//             <h1>{bunkerName}</h1>
//             <Link to="/">Home</Link>
//             <RoomComponent setBunker={setBunker} />
//             {rooms}
//             {JSON.stringify(bunker)}
//         </div>
//     )

// }

export default CreateBunker;