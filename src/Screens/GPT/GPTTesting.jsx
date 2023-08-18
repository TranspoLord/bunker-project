import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Header from "../../UIElements/Header";
import { GetGPTResponse } from "../../Services/GPT/GPTService";

function GPTTesting() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleGenerateResponse = async () => {
    setClicked(true);
    const response = await GetGPTResponse(prompt);
    setResponse(response);
  };

  return (
    <div>
      <Header />
      <div className="secondary-container-a">
        <div>
          <div className="title-text">GPT Testing</div>
          <div className="secondary-text">
            GPT works now! However, due to the API calls costing money, even
            though it's such a small amount
          </div>
          <div className="secondary-text">
            you will need to set your own API key. You can do that within
            settings.
          </div>
        </div>
        <div className="secondary-container-b">
          <textarea
          className="secondary-container-b-textarea"
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button variant="contained" onClick={handleGenerateResponse}>
            Generate Response
          </Button>
          <div className="secondary-title-centered">Generated Response</div>
          <div className="secondary-text">
            <p>GPT access is still a work in progress. Have issues with decrypting api key</p>
            {/* <p>{response ? response : clicked ? "Generating Response" : ""}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GPTTesting;
