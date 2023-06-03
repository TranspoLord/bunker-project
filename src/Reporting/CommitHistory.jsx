import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommitHistory = () => {
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                const response = await axios.get('https://api.github.com/repos/TranspoLord/bunker-project/commits');
                setCommits(response.data);
            }
            catch (error) {
                console.error('Error catching commits:', error);
            }
        };

        fetchCommits();
    }, []);

    return (
        <div>
            {commits.map(commit => (
                <div key={commit.sha}>
                    <h3>{commit.commit.message}</h3>
                    <p>Author: {commit.commit.author.name}</p>
                    <p>Date: {commit.commit.author.date}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default CommitHistory;