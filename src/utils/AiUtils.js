import { OpenAI } from "openai";

const getAiInstance = () => {
  const openaiApiKey = process.env.REACT_APP_OPENAI_API;
  return new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true,
  });
};

export const createChatCompletion = async ({ messages, temperature }) => {
  const openai = getAiInstance();
  const model = process.env.REACT_APP_OPENAI_MODEL;
  return await openai.chat.completions.create({
    model,
    messages,
    temperature,
    response_format: { type: "json_object" },
  });
};

export const extractContent = (chatCompletion) => {
  const jsonResponse = chatCompletion.choices[0]?.message?.content;
  if (!jsonResponse) {
    throw new Error("Invalid json response from chatGPT");
  }

  return JSON.parse(jsonResponse);
};
