import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Header from "./../Views/Header";

const OpenAIHandler = require("../Services/GPT/OpenAIHandler");

function GPTTesting() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [clicked, setClicked] = useState(false);
  const openAI = new OpenAIHandler();

  const handleGenerateResponse = async () => {
    setClicked(true);
    const response = await openAI.getChatResponse(prompt);
    setResponse(response);
  };

  return (
    <>
      <Header />
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
          <p>GPT Response works now! However, due the api calls actually costing money, even though it is a small amount,
            I have disabled the button. Currently implementing a way for the user to add their own api key from OpenAI
            so that they can use their own account to generate responses. You can find this in Settings. It does
            NOT work yet.
          </p>
          <p>{response ? response : clicked ? "Generating Response" : ""}</p>
        </div>
      </div>
    </>
  );
}

export default GPTTesting;
