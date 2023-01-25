import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CreateBunker() {

    return (
        <div>
            <Link to="/manage">
                <button className="backButton">
                    Back
                </button>
            </Link>
            <h1>Create Bunker</h1>
        </div>
    )


}

export default CreateBunker;