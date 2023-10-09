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
    current: {
      lastUpdated: weatherData.current.last_updated,
      tempC: weatherData.current.temp_c,
      tempF: weatherData.current.temp_f,
      feelslikeC: weatherData.current.feelslike_c,
      feelslikeF: weatherData.current.feelslike_f,
      condition: weatherData.current.condition,
      windMPH: weatherData.current.wind_mph,
      windKPH: weatherData.current.wind_kph,
      windDir: weatherData.current.wind_dir,
      precipMM: weatherData.current.precip_mm,
      precipIN: weatherData.current.precip_in,
      humidity: weatherData.current.humidity,
      uv: weatherData.current.uv,
      isDay: weatherData.current.is_day,
    },
    forecast: [],
    location: {
      name: weatherData.location.name,
      region: weatherData.location.region,
      localtime: weatherData.location.localtime,
      country: weatherData.location.country,
    },
  };

  for (let i = 0; i < weatherData.forecast.forecastday.length; i += 1) {
    data.forecast[i] = {
      date: weatherData.forecast.forecastday[i].date,
      condition: weatherData.forecast.forecastday[i].day.condition,
      maxTempC: weatherData.forecast.forecastday[i].day.maxtemp_c,
      maxTempF: weatherData.forecast.forecastday[i].day.maxtemp_f,
      minTempC: weatherData.forecast.forecastday[i].day.mintemp_c,
      minTempF: weatherData.forecast.forecastday[i].day.mintemp_f,
    };
  }

  return data;
}

export default async function getWeather(location) {
  const weatherDataRaw = await getWeatherData(location);
  const data = processWeatherData(weatherDataRaw);

  return data;
}
