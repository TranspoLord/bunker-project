import React, { useState, useEffect } from "react";
import Header from "../../UIElements/Header";

function ReportingHome() {
  const [fileContents, setFileContents] = useState("");

  const buttons = [{ name: "Commit History", link: "/Reporting/DevLog" },
  { name: "Trello Board", link: "https://trello.com/b/Ox5fOGv2/bunkerproject", external: true },
  { name: "Discussion Board", link: "https://github.com/TranspoLord/bunker-project/discussions", external: true }];

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
      <Header buttons={buttons} />

      <div className="secondary-container-a">
        <div className="title-text">Reporting</div>
        <div className="secondary-container-d">
          <div className="secondary-text">
            <p>
              There's lots planned for this page! As of now, you can view the 
              Dev Log, the Trello board, the Commit History, and the discussion board!
              Planned to add a bug report form right in the application!
            </p>
          </div>
        </div>
        <h2>Todo List</h2>
        <div className="secondary-text-a">
          <p>{fileContents}</p>
        </div>
      </div>
    </>
  );
}

export default ReportingHome;
