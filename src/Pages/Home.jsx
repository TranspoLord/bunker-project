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
        <p>This is a game I am working on. It is a text based game where you manage a bunker and try to survive.</p>
        <p>It is still in development, but I am working on it as much as I can.</p>
        <p>Feel free to play around with it! Feedback feature is planned to be added!</p>
        <p>NOTE: The game is not playable at all. Currently, managing the bunkers, creating them, loading and exporting them into local storage</p>
        <p>is the only thing working at the moment. As I am only working on this during free time, I don't have an absolute ton of spare time to work on it. </p>. 
        <p>If you look in the Dev Log, you can see a rough ToDo List of bugs, qol, and planned updates!</p>
      </div>

    </>
  )
}

export default Home;