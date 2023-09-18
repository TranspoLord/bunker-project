//If this doesnt work or complains about the button, try changing file name
//to .jsx instead of .js
import { Button } from "@mui/material";

export const handleFileChange = (dispatch, navigate, event) => {
  let bunker = null;
  let data = null;
  try {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      data = JSON.parse(text);
      if (data.name && data.rooms && data.description) {
        localStorage.setItem("bunker-" + data.name, text);
        dispatch({
          type: "OPEN",
          severity: "success",
          message: "Bunker loaded           ",
          button: (
            <Button
              sx={{ color: "text.disabled" }}
              onClick={() => {
                navigate("/manage/edit/" + data.name);
              }}
            >
              Edit
            </Button>
          ),
        });
        bunker = data;
      }
    };
    reader.readAsText(file);
    return bunker;
  } catch (err) {
    console.log("Error in handleFileChange: " + err);
  }
  return data;
};
