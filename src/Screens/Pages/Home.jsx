import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../UIElements/styles.css";

function Home() {
  const [fileContents, setFileContents] = useState("");

  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        const response = await fetch("/TextFiles/BugReports.txt");
        const text = await response.text();
        setFileContents(text);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchFileContents();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="button-container">
          <Link to="/bunkerChoice" className="button">
            Enter Game
          </Link>

          <Link to="/manage" className="button">
            Manage Bunkers
          </Link>

          <Link to="/Reporting" className="button">
            Dev Log
          </Link>

          <Link to="/AppSettings" className="button">
            Settings
          </Link>

          <Link to="/GPTTesting" className="button">
            GPT Testing
          </Link>
        </div>

        <div className="text-container">
          <h2>Hello!</h2>
          <p>
            This is a game I am working on. It is a text-based game where you
            explore a bunker and try to survive.
          </p>
          <p>
            It is still in development, but I am working on it as much as I can.
          </p>
          <p>
            Feel free to play around with it! Feedback feature is planned to be
            added!
          </p>
          <p>
            Currently, the UI is a bit lacking... a lot. I'm working on backend
            development first before prioritizing the UI.
          </p>
          <p>
            NOTE: The game is kind of playable, so expect a lot of missing
            features and/or bugs.
          </p>
          <p>
            If you look in the Dev Log, you can see a rough ToDo List of bugs,
            quality of life improvements, and planned updates!
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
