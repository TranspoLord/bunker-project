


const TestBunkerLogic = (props) => {
    const bunkerName = props.name;
    const bunkerRooms = props.rooms;
    const bunkerItems = props.items;

    console.log("Trying to test bunker in TestBunkerLogic.js")
    if (bunkerName === "") {
        return { type: "OPEN", severity: "error", message: "Bunker name cannot be empty" };
    }
    if (bunkerRooms.length < 2) {
        return { type: "OPEN", severity: "error", message: "Bunker must have at least 2 rooms" };
    }
    if (bunkerItems.length < 1) {
        return { type: "OPEN", severity: "error", message: "Bunker must have at least 1 item" };
    }
    for (let i = 0; i < bunkerRooms.length; i++) {
        if (bunkerRooms[i].north === bunkerRooms[i].name || bunkerRooms[i].south === bunkerRooms[i].name || bunkerRooms[i].east === bunkerRooms[i].name || bunkerRooms[i].west === bunkerRooms[i].name) {
            return { type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to itself" };
        }
    }
    console.log("Testing rooms")
    for (let i = 0; i < bunkerRooms.length; i++) {
        console.log("Testing room " + bunkerRooms[i].name)
        if (bunkerRooms[i].north !== "") {
            let roomNorthFound = false;
            console.log("Testing north in room " + bunkerRooms[i].name)
            for (let x = 0; x < bunkerRooms.length; x++) {
                if (bunkerRooms[i].north === bunkerRooms[x].name) {
                    roomNorthFound = true;
                }
            }
            if (!roomNorthFound) {
                return { type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to a room that does not exist" };
            }
        }

        if (bunkerRooms[i].south !== "") {
            let roomSouthFound = false;
            console.log("Testing south in room " + bunkerRooms[i].name)
            for (let x = 0; x < bunkerRooms.length; x++) {
                if (bunkerRooms[i].south === bunkerRooms[x].name) {
                    roomSouthFound = true;
                }
            }
            if (!roomSouthFound) {
                return { type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to a room that does not exist" };
            }
        }
        console.log("Testing east in room " + bunkerRooms[i].name)
        if (bunkerRooms[i].east !== "") {
            let roomEastFound = false;
            for (let x = 0; x < bunkerRooms.length; x++) {
                if (bunkerRooms[i].east === bunkerRooms[x].name) {
                    roomEastFound = true;
                }
            }
            if (!roomEastFound) {
                return { type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to a room that does not exist" };
            }
        }
        console.log("Testing west in room " + bunkerRooms[i].name)
        if (bunkerRooms[i].west !== "") {
            let roomWestFound = false;
            for (let x = 0; x < bunkerRooms.length; x++) {
                if (bunkerRooms[i].west === bunkerRooms[x].name) {
                    roomWestFound = true;
                }
            }
            if (!roomWestFound) {
                return { type: "OPEN", severity: "error", message: "Bunker room " + bunkerRooms[i].name + " has an exit to a room that does not exist" };
            }
        }

    }

    console.log("Testing items")
    for (let i = 0; i < bunkerItems.length; i++) {
        let itemFound = false;
        for (let i = 0; i < bunkerRooms.length; i++) {
            if (bunkerRooms[i].item !== "") {
                if (bunkerRooms[i].item === bunkerItems[i].name) {
                    console.log("Item " + bunkerItems[i].name + " is in room " + bunkerRooms[i].name)
                    itemFound = true;
                }
            }
        }
        if (!itemFound) {
            return { type: "OPEN", severity: "warning", message: "Item " + bunkerItems[i].name + " is not in any room" };
        }
    }

}

export default TestBunkerLogic;