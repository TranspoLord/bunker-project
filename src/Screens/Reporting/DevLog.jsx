import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import CommitHistory from "./CommitHistory";
import Header from "../../UIElements/Header";


function DevLog() {
  const handleClickGithubRepo = () => {
    window.open("https://github.com/TranspoLord/bunker-project");
  };

  return (
    <>
      <Header />
      <div className="secondary-container-b">
        <div className="title-text">
          Development History
        </div>
      </div>
      <div>
        <Button variant="contained" onClick={() => handleClickGithubRepo()}>
          GitHub Repo
        </Button>
        <h2>Dev Log</h2>
        <CommitHistory />
      </div>
    </>
  );
}

export default DevLog;
