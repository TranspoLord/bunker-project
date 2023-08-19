import { useState } from "react";

const useSnackBar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (message, severity) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  };

  return { open, message, severity, handleClose, handleOpen };
};

export default useSnackBar;
