import React, { useState } from "react";
import { Dropdown, Input, Button, Error, Text } from "../components";
import { filterFlightData } from "../utils/FlightUtils";
import AirportCodes from "../constants/AirportCodes";
import getAiResponse from "../services/GetAiResponse";

const AiFlights = () => {
  const [airportCode, setAirportCode] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      if (!airportCode || !question)
        throw new Error("Airport code and question required.");
      const airportData = filterFlightData(airportCode);
      const aiResponse = await getAiResponse({
        airportCode,
        airportData,
        question,
      });
      setResponse(aiResponse);
      setAirportCode("");
      setQuestion("");
      setError("");
    } catch (error) {
      console.log(error);
      setError("Failed to fetch results. Please try again.");
      setResponse("");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <>
      <Dropdown
        placeholder="Select an airport"
        options={AirportCodes}
        onChange={(val) => {
          setAirportCode(val);
        }}
      />
      <Input
        value={question}
        placeholder="Ask a question"
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        Submit
      </Button>
      {error && <Error>{error}</Error>}
      {response && (
        <>
          <Text>Response:</Text>
          <Text>{response}</Text>
        </>
      )}
    </>
  );
};

export default AiFlights;
