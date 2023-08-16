import React, { useContext } from "react";
import { Context } from "../Services/SnackBar/SnackBarStoreContext";
import Header from "../Views/Header";
import { ClearLocal } from "../Services/AppSettingsService";

const AppSettings = () => {
  const [state, dispatch] = useContext(Context);

  const buttons = [{}];

  function clearSettings() {
    if (ClearLocal()) {
      dispatch({
        type: "OPEN",
        severity: "success",
        message: "Local Storage Cleared",
      });
    }
  }

  return (
    <>
      <div className="secondary-container-a">
        <Header />
        <div className="title-text">
          <h1>App Settings</h1>
        </div>
        <div className="secondary-container-b">
          <div className="secondary-title">Storage Settings</div>
          <div className="settings-button">
            <button className="button" onClick={() => clearSettings}>
              Clear Local Storage
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSettings;
