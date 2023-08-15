import React, { useState } from "react";

const DEFAULT_PARAMS = {
  model: "gpt-3.5-turbo",
  temperature: 0.9,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

async function GPTResponse(params = {}) {
  const apiKey = process.env.REACT_APP_GPTApiKey;
  console.log("ApiKey: ", apiKey);
  const params_ = { ...DEFAULT_PARAMS, ...params };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ${apiKey}',
    },
    body: JSON.stringify(params_),
  };

  console.log("Request: ", requestOptions)

  try {
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      requestOptions
    );
    const data = await response.json();
    return data.choices[0].text;
  } catch (error) {
    return "Error generating response";
  }
}

export default GPTResponse;
