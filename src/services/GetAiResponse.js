import { createChatCompletion, extractContent } from "../utils/AiUtils";

const GetAiResponse = async ({ airportCode, airportData, question }) => {
  const jsonResponseFormat = JSON.stringify({
    response: "The response to the user question.",
  });

  const systemPrompt =
    "You are a helpful assistant to a traveler. You have been asked to answer a question about a given airport using provided data and to provide a structured json formula response: " +
    jsonResponseFormat;

  const content = [
    {
      type: "text",
      text: userText,
    },
    {
      type: "text",
      text: "Here is airport code: " + airportCode,
    },
    {
      type: "text",
      text: "Here is data on the airport: " + JSON.stringify(airportData),
    },
    {
      type: "text",
      text: "Here is my question: " + question,
    },
  ];

  const chatResponse = await createChatCompletion({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: content,
      },
    ],
  });

  return extractContent(chatResponse).response;
};

const userText = `
  ### OBJECTIVE:
  - I am a traveler with a question about a specific airport.
  - You will use the airport code and provided data to answer my question.

  ### INPUTS:
  - **Airport Code**: I have provided the code of the airport in question.
  - **Airport Data**: I have provided flight data for the airport.
  - **Question**: I have provided the question you are answering.

  ### FINAL OUTPUT:
  - Provide a response to my question in string format.

  ### RULES:
  - Only use the provided data.
  - Do not use outside resources or make up information.
  - If the question cannot be answered with the given data, simply respond that you cannot answer the question.

  ### CONSIDERATIONS:
  - Ensure that you have answered all parts of the question.
  - If you cannot answer the question with the given data, explain what is preventing you from answering the question, e.g. missing data or incoherent question.
`;

export default GetAiResponse;
