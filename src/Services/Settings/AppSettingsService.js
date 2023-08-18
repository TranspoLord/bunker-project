import React, { useContext, useEffect } from "react";
import { EncryptData, DecryptData } from "../Encryption/Encryption";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  InputLabel,
  Box,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";

export const ClearLocal = () => {
  console.log("ClearLocal");
  try {
    localStorage.removeItem("openai-key");
    return true;
  } catch (e) {
    console.log("ClearLocal Error", e);
    return false;
  }
};

export const ClearSession = () => {
  console.log("ClearSession");
  try {
    sessionStorage.removeItem("openai-key");
    return true;
  } catch (e) {
    console.log("ClearSession Error", e);
    return false;
  }

  
};

export const SetSessionOpenAIKey = ({ open, onClose }) => {
  const [textValue, setTextValue] = React.useState("");
  const [storeLocal, setStoreLocal] = React.useState(false);

  const setKey = () => {
    try {
      if (textValue === "") {
        alert("Key field cannot be empty");
      } else {
        if (storeLocal) {
          localStorage.setItem("openai-key", EncryptData(textValue));
          localStorage.setItem("activeOpenAiKey", "local");
          onClose();
        } else {
          sessionStorage.setItem("openai-key", EncryptData(textValue));
          sessionStorage.setItem("activeOpenAiKey", "session");
          onClose();
        }
      }
    } catch (e) {
      console.log("SetKey Error", e);
      onClose(); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Set Open AI Key</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To set your Open AI Key, please enter it here. We will never share
          your key with anyone. There can only be two keys, one stored locally
          and one stored in session. If you set a new key, the old one will be
          overwritten. Session keys are cleared when you close the tab or
          reload. Local keys are cleared when you clear your browser cache. Both
          keys are encrypted and stored in your browser data. Session keys will
          be used by default.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Open AI Key"
          type="text"
          fullWidth
          required
          onChange={(e) => setTextValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <InputLabel id="store-key-locally">Store Key Locally</InputLabel>
        <Checkbox
          checked={storeLocal}
          onChange={(e) => setStoreLocal(e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
          label="Store Key Locally"
        />
        <Button onClick={setKey} color="primary" margin="dense">
          Set Key
        </Button>
        <Button onClick={onClose} color="primary" margin="dense">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const GetSessionOpenAIKey = ({ open, onClose }) => {
  let [localKey, setLocalKey] = React.useState();
  let [sessionKey, setSessionKey] = React.useState();
  const [localKeyActive, setLocalKeyActive] = React.useState();
  const [sessionKeyActive, setSessionKeyActive] = React.useState();

  const getKeys = () => {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === "openai-key") {
          let data = localStorage.getItem(key);
          setLocalKey(DecryptData(data));
        }
      }

      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key === "openai-key") {
          let data = sessionStorage.getItem(key);
          setSessionKey(DecryptData(data));
        }
      }
    } catch (e) {
      console.log("GetKeys Error", e);
    }
  };

  function onCloseInternal() {
    setLocalKey(null);
    setSessionKey(null);
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onCloseInternal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Current Keys</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box sx={{ fontWeight: "bold", paddingTop: 1 }}>
            Local Key: (Will not be cleared on browser close)
          </Box>
          {localKey}
        </DialogContentText>
        <DialogActions>
          <FormControlLabel
            control={
              <CheckBox
                checked={localKeyActive}
                onClick={() => setLocalKeyActive(!localKeyActive)}
                color="primary"
                key="local-key"
              />
            }
            label="Use Local Key"
          />
        </DialogActions>
        <DialogContentText>
          <Box sx={{ fontWeight: "bold", paddingTop: 2 }}>
            Session Key: (Will be cleared on tab reload/close)
          </Box>
        </DialogContentText>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {sessionKey}
          <div
            style={{
              marginLeft: "auto",
              marginRight: "33px",
              marginTop: "5px",
            }}
          >
            <FormControlLabel
              control={
                <CheckBox
                  checked={sessionKeyActive}
                  onClick={() => setSessionKeyActive(!sessionKeyActive)}
                  color="primary"
                  key="session-key"
                />
              }
              label="Use Session Key"
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={getKeys} color="primary" margin="dense">
          Refresh
        </Button>
        <Button onClick={onClose} color="primary" margin="dense">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
