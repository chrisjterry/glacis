import React, { useState } from "react";
import { Input, Button, FlightsTable, Error, Text } from "../components";
import { getFlightData } from "../utils/FlightUtils";

export default () => {
  const [airportCode, setAirportCode] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      const newData = await getFlightData(airportCode);
      setData(newData);
      setError(undefined);
    } catch {
      setError("Failed to fetch results. Please try again.");
      setData(undefined);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <>
      <Input
        value={airportCode}
        placeholder="Airport Code (e.g. LAX)"
        onChange={(e) => {
          setAirportCode(e.target.value);
        }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        Look Up Flights
      </Button>
      {error && <Error>{error}</Error>}
      {data && <FlightsTable data={data} />}
    </>
  );
};
