import "./style.scss";
import * as weather from "./modules/weather";

const searchLocation = "Carmichael";

async function getWeather(location) {
  const weatherDataRaw = await weather.getWeatherData(location);
  const weatherData = weather.processWeatherData(weatherDataRaw);
  console.log(weatherData);
}

getWeather(searchLocation);
