import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import GPTResponse from "../Services/GPT/GPT";

function GPTTesting() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleGenerateResponse = async () => {
    setClicked(true);
    const response = await GPTResponse(prompt);
    setResponse(response);
  };

  return (
    <>
      <div>
        <Link to="/Home">
          <Button variant="contained">Back</Button>
        </Link>
      </div>
      <div>
        <h1>GPT Testing</h1>
        <textarea
          placeholder="Enter your prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div>
        <Button disabled variant="contained" onClick={handleGenerateResponse}>
          Generate Response
        </Button>
        <div>
          <h2>Generated Response:</h2>
          <p>Currently borked</p>
          <p>{response ? response : clicked ? "Generating Response" : ""}</p>
        </div>
      </div>
    </>
  );
}

export default GPTTesting;
