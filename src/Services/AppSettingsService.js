import React, { useContext } from "react";


export const ClearLocal = () => {
  console.log("ClearLocal");
  try {
    localStorage.clear();
    return true;
  } catch (e) {
    console.log("ClearLocal Error", e);
    return false;
  }
};

