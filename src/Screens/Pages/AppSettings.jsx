import React, { useContext, useState } from "react";
import { Context } from "../../Services/SnackBar/SnackBarStoreContext";
import Header from "../../UIElements/Header";
import {
  ClearLocal,
  ClearSession,
  GetSessionOpenAIKey,
  SetSessionOpenAIKey,
} from "../../Services/Settings/AppSettingsService";

const AppSettings = () => {
  const [state, dispatch] = useContext(Context);
  const [showApiKeyDialog, setshowApiKeyDialog] = useState(false);
  const [showApiKeyListDialog, setshowApiKeyListDialog] = useState(false);

  const buttons = [{}];

  function clearSettings() {
    if (ClearLocal()) {
      dispatch({
        type: "OPEN",
        severity: "success",
        message: "Local Storage Cleared",
      });
    } else {
      dispatch({
        type: "OPEN",
        severity: "error",
        message: "Local Storage Not Cleared",
      });
    }
  }

  function clearSession() {
    if (ClearSession()) {
      dispatch({
        type: "OPEN",
        severity: "success",
        message: "Session Storage Cleared",
      });
    } else {
      dispatch({
        type: "OPEN",
        severity: "error",
        message: "Session Storage Not Cleared",
      });
    }
  }

  function toggleApiKeyDialog() {
    if (showApiKeyDialog) {
      dispatch({
        type: "OPEN",
        severity: "success",
        message: "Success",
      });
    }
    setshowApiKeyDialog(!showApiKeyDialog);
  }

  function toggleApiKeyListDialog() {
    setshowApiKeyListDialog(!showApiKeyListDialog);
  }


  return (
    <>
      <div className="secondary-container-c">
        <Header />
        <div className="title-text">App Settings</div>
        <div className="secondary-container-b">
          <div className="secondary-title">Storage Settings</div>
          <div className="settings-button">
            <button className="button" onClick={clearSettings}>
              Clear OpenAI Local Storage
            </button>
            <button className="button" onClick={clearSession}>
              Clear OpenAI Session Storage
            </button>
            <button className="button" onClick={toggleApiKeyDialog}>
              Set OpenAI API Key
            </button>
            <button className="button" onClick={toggleApiKeyListDialog}>
              List OpenAI API Keys
            </button>
          </div>
          <SetSessionOpenAIKey
            open={showApiKeyDialog}
            onClose={toggleApiKeyDialog}
          />
          <GetSessionOpenAIKey
            open={showApiKeyListDialog}
            onClose={toggleApiKeyListDialog}
          />
        </div>
        <p className="secondary-title">
          The plan for this page is to allow the user to set an OpenAI API Key
          so that they can use GPT for their own purposes. 
        </p>
      </div>
    </>
  );
};

export default AppSettings;
