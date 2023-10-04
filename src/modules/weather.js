async function getWeatherData(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=9334d9dae7704679aff195049230310&q=${location}&days=7&aqi=no&alerts=no`,
    { mode: "cors" },
  );
  const weatherData = await response.json();
  return weatherData;
}

function processWeatherData(weatherData) {
  const data = {
    tempC: weatherData.current.temp_c,
    tempF: weatherData.current.temp_f,
  };

  return data;
}

export { getWeatherData, processWeatherData };
