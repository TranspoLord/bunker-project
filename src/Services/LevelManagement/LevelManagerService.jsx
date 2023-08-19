import { useState } from "react";
import TestBunker from "../../TextFiles/Abandoned Test Bunker Full.json";
import { saveAs } from "file-saver";

export const LoadLevelsFromLocal = () => {
  const [bunkerList, setBunkerList] = useState([]);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log("Key: " + key);
    if (key.startsWith("bunker-")) {
      const dataString = localStorage.getItem(key);
      const data = JSON.parse(dataString);
      setBunkerList((bunkerList) => bunkerList.concat(data));
    }
  }
  console.log("Bunker list: " + bunkerList);
  return bunkerList;
};

export const LoadLevelFromLocalByName = (name) => {
  const dataString = localStorage.getItem("bunker-" + name);
  const data = JSON.parse(dataString);

  if (data === null) {
    return null;
  } else {
    return data;
  }
};

export const LevelExportToJSON = (bunker, dispatch) => {
  const fileName = bunker.name + "-bunker.json";
  const fileData = JSON.stringify(bunker);
  const fileToSave = new Blob([fileData], { type: "application/json" });
  saveAs(fileToSave, fileName);
  dispatch({ type: "OPEN", severity: "success", message: "Bunker exported" });
};

export const RemoveLevel = (index, dispatch, bunkerList) => {
  const newBunkers = [...bunkerList];
  try {
    localStorage.removeItem("bunker-" + bunkerList[index].name);
    newBunkers.splice(index, 1);
    dispatch({ type: "OPEN", severity: "success", message: "Bunker deleted" });
    return newBunkers;
  } catch (err) {
    dispatch({
      type: "OPEN",
      severity: "error",
      message: "Error deleting bunker",
    });
    console.log(err);
  }
};

export const LoadTestLevel = (bunkerList, dispatch) => {
  const text = JSON.stringify(TestBunker);
  const data = JSON.parse(text);
  let tempBunkerList = bunkerList;
  localStorage.setItem("bunker-" + data.name, text);
  dispatch({
    type: "OPEN",
    severity: "success",
    message: "Test Bunker Loaded",
  });
  tempBunkerList = (tempBunkerList) => tempBunkerList.concat(data);
  return tempBunkerList;
};
