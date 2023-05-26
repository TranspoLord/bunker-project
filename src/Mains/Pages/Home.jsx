import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';



function Home() {
  const [fileContents, setFileContents] = useState('');

  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        const response = await fetch('/BugReports.txt');
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
      </div>

      <div>
        <h2>Todo List</h2>
        <p>{fileContents}</p>
      </div>
    </>
  )
}

export default Home;