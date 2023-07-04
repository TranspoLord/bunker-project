import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';



function Home() {
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

  return (
    <>
      <div>
        <Link to="/bunkerChoice">
          <Button variant='contained'>Enter Game</Button>
        </Link>

        <Link to="/manage">
          <Button variant='contained'>Manage Bunkers</Button>
        </Link>

        <Link to="/Reporting">
          <Button variant='contained'>Dev Log</Button>
        </Link>
      </div>

      <div>
        <h2>Hello!</h2>
        <p>This is a game I am working on. It is a text based game where you explore a bunker and try to survive.</p>
        <p>It is still in development, but I am working on it as much as I can.</p>
        <p>Feel free to play around with it! Feedback feature is planned to be added!</p>
        <p>Currently the UI is a bit lacking....a lot. lol. I'm working on backend dev first before prioritizing the UI</p>
        <p>NOTE: The game is kinda playable, so expect a lot of missing features and/or bugs. </p>. 
        <p>If you look in the Dev Log, you can see a rough ToDo List of bugs, qol, and planned updates!</p>
      </div>

    </>
  )
}

export default Home;