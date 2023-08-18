import React from "react";
import OpenAIHandler from "./OpenAIHandler";
import { DecryptData } from "../Encryption/Encryption";

export const GetGPTResponse = async (prompt) => {
  let activeKey = localStorage.getItem("activeOpenAiKey");
  if (activeKey === "local") {
    const openAI = new OpenAIHandler(GetApiKeyLocal());
    const response = await openAI.getChatResponse(prompt);
    return response;
  } else if (activeKey === "session") {
    const openAI = new OpenAIHandler(GetApiKeySession);
    const response = await openAI.getChatResponse(prompt);
    return response;
  } else {
    return "You may not have set an API key yet. Please go to Settings to set one.";
  }
};

export const GetApiKeyLocal = () => {
  return DecryptData(localStorage.getItem("openAIKey"));
};

export const GetApiKeySession = () => {
  return DecryptData(sessionStorage.getItem("openAIKey"));
};

export const UseOwnerKey = async (prompt) => {
  const openAI = new OpenAIHandler(process.env.REACT_APP_GPTApiKey);
  const response = openAI.getChatResponse(prompt);
  return response;
};
