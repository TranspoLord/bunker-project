import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../UIElements/Header";

function ReportingHome() {
  const [fileContents, setFileContents] = useState("");

  const buttons = [{ name: "Dev Log", link: "/Reporting/DevLog" }];

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

  const handleClickTrelloBoard = () => {
    window.open("https://trello.com/b/Ox5fOGv2/bunkerproject");
  };

  return (
    <>
      <Header buttons={buttons} />

      <div className="secondary-container-a">
        <div className="title-text">Reporting</div>
        <div className="secondary-container-d">
          <div className="secondary-text">
            <p>
              Plan for this page is to be the home page for feedback, bug
              reporting, todo list, and dev log...and possibly more
            </p>
          </div>
        </div>
        <h2>Todo List</h2>
        <div className="secondary-text-a">
          <div className="buttons-left-row">
            <Button
              variant="contained"
              onClick={() => handleClickTrelloBoard()}
            >
              Trello Board
            </Button>
          </div>
          <p>{fileContents}</p>
        </div>
      </div>
    </>
  );
}

export default ReportingHome;
