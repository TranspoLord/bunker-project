import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';




function ReportingHome() {
    const [fileContents, setFileContents] = useState('');

    useEffect(() => {
        const fetchFileContents = async () => {
            try {
                const response = await fetch('/TextFiles/BugReports.txt');
                const text = await response.text();
                setFileContents(text);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchFileContents();
    }, []);

    const handleClickTrelloBoard = () => {
        window.open('https://trello.com/b/Ox5fOGv2/bunkerproject');
    }


    return (
        <>
            <div>
                <Link to="/">
                    <Button variant='contained'>Back</Button>
                </Link>

                <Link to="/Reporting/DevLog">
                    <Button variant='contained'>Dev Log</Button>
                </Link>
            </div>

            <div>
                <h2>Reporting</h2>
                <p>Plan for this page is to be the home page for feedback, bug reporting, todo list, and dev log...and possibly more</p>
            </div>

            <div>
                <h2>Todo List</h2>
                <Button variant='contained' onClick={() => handleClickTrelloBoard()}>Trello Board</Button>
                <p>{fileContents}</p>
            </div>
        </>
    )
}

export default ReportingHome;