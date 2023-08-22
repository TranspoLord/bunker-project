import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { LevelCard } from "./LevelCard";
import Header from "../../UIElements/Header";
import { Context } from "../../Services/SnackBar/SnackBarStoreContext";
import { LoadTestLevel } from "../../Services/LevelManagement/LevelManagerService";
import { handleFileChange } from "../../Services/LevelManagement/FileManagement";
import { RemoveLevel } from "../../Services/LevelManagement/LevelManagerService";

const LevelManager = () => {
  const [bunkerList, setBunkerList] = useState([]);
  const [, dispatch] = useContext(Context);
  const navigate = useNavigate();

  const handleRemoveLevel = (bunker, index) => {
    setBunkerList(RemoveLevel(index, dispatch, bunkerList));
  };

  return (
    <>
      <Header />
      <div className="secondary-container-a">
        <div className="title-text">Level Manager</div>
        <div className="secondary-container-d">
          <div className="buttons-left">
            <label htmlFor="fileInput">
              <Button
                variant="contained"
                onClick={() => {
                  document.getElementById("fileInput").click();
                }}
              >
                Load Bunker
              </Button>
            </label>{" "}
            <Link to="/manage/create">
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Create bunker");
                }}
              >
                Create Bunker
              </Button>
            </Link>
            <Link to="/manage/CreateLevel">
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Create bunker");
                }}
              >
                Create Bunker (New)
              </Button>
            </Link>
            <Button
              variant="contained"
              onClick={() => {
                setBunkerList(LoadTestLevel(bunkerList, dispatch));
              }}
            >
              Load Test Bunker
            </Button>
          </div>
          <div className="bunker-list">
            {bunkerList.map((bunker, index) => (
              <div key={index}>
                <LevelCard
                  bunker={bunker}
                  onRemove={() => {
                    handleRemoveLevel(bunker, index);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <input
          id="fileInput"
          type="file"
          accept="application/json, text/plain"
          style={{ display: "none" }}
          onChange={() =>
            bunkerList.concat(handleFileChange(dispatch, navigate))
          }
        />
      </div>
    </>
  );
};

export default LevelManager;
