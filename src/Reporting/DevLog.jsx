import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function DevLog() {

  return (
    <>
      <div>
        <Link to="/Reporting">
          <Button variant='contained'>Back</Button>
        </Link>
      </div>
      <div>
        <h2>Dev Log</h2>
        <p>Plan for this is to get commit history from GitHub and put it here as a log</p>
        <p>May be a short while before this is implemented, but it will give an easier log histroy for this game</p>
      </div>
    </>
  )
}

export default DevLog;