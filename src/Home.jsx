import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function Home() {

  return (
    <div>
      <Link to="/game">
        <Button variant='contained'>Enter Game</Button>
      </Link>

      <Link to="/manage">
        <Button variant='contained'>Manage Bunkers</Button>
      </Link>
    </div>
  )
}

export default Home;