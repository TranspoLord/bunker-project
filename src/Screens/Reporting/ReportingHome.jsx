import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Header from '../../UIElements/Header';

function ReportingHome() {
    const [fileContents, setFileContents] = useState('');

    const buttons = [
        { name: 'Dev Log', link: '/Reporting/DevLog' },
         ];

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
            <Header buttons={buttons}/>

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