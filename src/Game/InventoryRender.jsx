import React, { useState, useEffect, useRef } from 'react';

const InventoryRender = (props) => {
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        //Add any event listeners here that need rerenders
    }, [update]);

    const { IRBunker, IRDisplayActionMsg } = props;

    const DisplayActionMsg = () => {
        if (IRDisplayActionMsg) {
            return (
                <>
                    <div>
                        <p>{IRBunker.player.room?.item?.descItemPickup}</p>
                    </div>
                    <div>*********</div>
                </>
            );
        } else {
            return (
                <>
                </>
            );
        }
    }


    const DisplayInventory = () => {
        if (IRBunker.player.inventory.length > 0) {
            return (
                <>
                    <h3>Inventory</h3>
                    {
                        IRBunker.player.inventory.map(item =>
                            <div
                                key={item.name}>
                                <p>{item.name}</p>
                            </div>
                        )
                    }
                    <div>*********</div>
                </>
            );
        } else {
            return (
                <>
                </>
            );
        }
    }
    return (
        <>
            <DisplayActionMsg />
            <DisplayInventory />
        </>
    );
}


export default InventoryRender;
