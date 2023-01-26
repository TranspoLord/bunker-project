import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function RoomComponent(props) {
    const nameInput = useRef()
    const northInput = useRef()
    const southInput = useRef()
    const eastInput = useRef()
    const westInput = useRef()

    function saveRoom() {
        props.setBunker(prevBunker =>
        (
            {
                ...prevBunker, [nameInput.current.value]: {
                    "Name": nameInput.current.value,
                    "North": northInput.current.value,
                    "South": southInput.current.value,
                    "East": eastInput.current.value,
                    "West": westInput.current.value,
                }
            }
        )
        )
    }

    function removeRoom() {
        props.setBunker(prevBunker => {
            delete props[nameInput.current.value]
            return prevBunker
        })
    }

    return (
        <div>
            <input ref={nameInput} />
            <input ref={northInput} />
            <input ref={southInput} />
            <input ref={eastInput} />
            <input ref={westInput} />
            <button onClick={() => { saveRoom() }}>Save</button>
            <button onClick={() => { removeRoom() }}>Clear</button>
        </div>
    )
}


function CreateBunker(props) {
    const [bunker, setBunker] = useState({})
    let bunkerName = ""
    if (!props.isCreatingBunker) {
        bunkerName = "Editing"
    } else {
        bunkerName = "Creating"
    }
    const rooms = Object.keys(bunker).map((key) => {
        // return RoomComponent
        return (
            <div>
                <RoomComponent setBunker={setBunker} room={bunker[key]} />
            </div>
        )
    })

    return (
        <div>
            <h1>{bunkerName}</h1>
            <Link to="/">Home</Link>
            <RoomComponent setBunker={setBunker} />
            {rooms}
            {JSON.stringify(bunker)}
        </div>
    )

}

export default CreateBunker;