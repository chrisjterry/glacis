export const getFlightData = async (airportCode) => {
  const data = {};
  const apiKey = process.env.REACT_APP_FLIGHT_API;
  const url = `https://api.flightapi.io/compschedule/${apiKey}?mode=arrivals&iata=${airportCode}`;
  const res = await fetch(url);
  const json = await res.json();

  for (const obj of json) {
    const arrivals = obj.airport.pluginData.schedule.arrivals.data;

    for (const arrival of arrivals) {
      const country = arrival.flight.airport.origin.position.country.name;
      if (!data[country]) {
        data[country] = 1;
      } else {
        data[country] = data[country] + 1;
      }
    }
  }

  return Object.keys(data).map((country) => {
    return {
      country,
      flights: data[country],
    };
  });
};
