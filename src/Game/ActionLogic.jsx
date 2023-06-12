import React, { useState, useEffect, useRef } from 'react';

const ActionRender = (props) => {
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        //Add any event listeners here that need rerenders
    }, [update]);

    const { ARBunker, ARRoomItem, ARDisplayMsgBool } = props;

    const DisplayMsg = () => {
        
    }



    return (
        <>
            {ARDisplayMsgBool ? <DisplayMsg /> : null}
        </>
    );
}


export default ActionRender;
