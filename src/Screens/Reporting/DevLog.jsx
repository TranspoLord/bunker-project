import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import CommitHistory from './CommitHistory';

function DevLog() {

  const handleClickGithubRepo = () => {
    window.open('https://github.com/TranspoLord/bunker-project');
  }

  return (
    <>
      <div>
        <Link to="/Reporting">
          <Button variant='contained'>Back</Button>
        </Link>
      </div>
      <div>
        <h1>Development History</h1>
        </div>
      <div>
        <Button variant='contained' onClick={() => handleClickGithubRepo()}>GitHub Repo</Button>
        <h2>Dev Log</h2>
        <CommitHistory />
      </div>
    </>
  )
}

export default DevLog;