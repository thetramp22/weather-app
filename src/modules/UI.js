import { format, parseISO, isToday, isTomorrow } from "date-fns";
import conditionData from "../assets/data/weatherConditionCodes.json";
import Units from "./units";
import getWeather from "./weather";

const units = new Units();
let currentSearchLocation = "Los Angeles";

function updateLocationDisplay(location) {
  const { name, region, country } = location;
  const locationDisplay = document.getElementById("weatherLocation");

  locationDisplay.textContent = `${name}, ${region}`;
  if (country !== "United States of America") {
    locationDisplay.textContent += `, ${country}`;
  }
}

function getCondition(code, isDay) {
  const condition = conditionData.find((item) => item.code === code);
  return isDay === 1
    ? {
        icon: `./assets/images/weather/day/${condition.icon}.png`,
        text: condition.day,
      }
    : {
        icon: `./assets/images/weather/night/${condition.icon}.png`,
        text: condition.night,
      };
}

function setTempDisplay(tempC, tempF) {
  return units.tempUnits === "&deg;F"
    ? `${Math.floor(tempF)}°F`
    : `${Math.floor(tempC)}°C`;
}

function setSpeedDisplay(mph, kph) {
  return units.tempUnits === "&deg;F" ? `${mph}mph` : `${kph}kph`;
}

function setDistDisplay(inch, mm) {
  return units.tempUnits === "&deg;F" ? `${inch}in` : `${mm}mm`;
}

function updateCurrentDisplay(current) {
  const lastUpdated = document.getElementById("lastUpdated");
  const currentConditionIcon = document.getElementById("currentConditionIcon");
  const currentTemp = document.getElementById("currentTemp");
  const currentConditionText = document.getElementById("currentConditionText");
  const feelslike = document.getElementById("feelslike");
  const windSpeed = document.getElementById("windSpeed");
  const windDirection = document.getElementById("windDirection");
  const precip = document.getElementById("precip");
  const humidity = document.getElementById("humidity");
  const uv = document.getElementById("uv");

  lastUpdated.textContent = format(new Date(current.lastUpdated), "p");
  currentTemp.textContent = setTempDisplay(current.tempC, current.tempF);
  feelslike.textContent = setTempDisplay(
    current.feelslikeC,
    current.feelslikeF,
  );

  const currentCondition = getCondition(current.condition.code, current.isDay);
  currentConditionIcon.src = currentCondition.icon;
  currentConditionText.textContent = currentCondition.text;

  windSpeed.textContent = setSpeedDisplay(current.windMPH, current.windKPH);
  windDirection.textContent = current.windDir;
  precip.textContent = setDistDisplay(current.precipIN, current.precipMM);
  humidity.textContent = `${current.humidity}%`;
  uv.textContent = current.uv;
}

function getForecastDayName(date) {
  if (isToday(parseISO(date))) return "Today";
  if (isTomorrow(parseISO(date))) return "Tomorrow";
  return format(parseISO(date), "EEEE");
}

function updateForecastDisplay(forecast) {
  const forecastGrid = document.getElementById("forecastGrid");
  forecastGrid.innerHTML = "";

  for (let i = 0; i < forecast.length; i += 1) {
    const dayOfWeek = getForecastDayName(forecast[i].date);
    const condition = getCondition(forecast[i].condition.code, 1);
    const maxTemp = setTempDisplay(forecast[i].maxTempC, forecast[i].maxTempF);
    const minTemp = setTempDisplay(forecast[i].minTempC, forecast[i].minTempF);

    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast__card");
    forecastCard.innerHTML = `<p class="forecast__day">${dayOfWeek}</p>
    <div class="forecast__weather">
      <img
        src="${condition.icon}"
        class="forecast__condition-icon"
      />
      <p class="forecast__max-temp">High: <span>${maxTemp}</span></p>
      <p class="forecast__min-temp">Low: <span>${minTemp}</span></p>`;

    forecastGrid.appendChild(forecastCard);
  }
}

function searchLocation() {
  const DEFAULT_LOCATION = "Los Angeles";
  const locationToFind = document.getElementById("searchbar").value;
  currentSearchLocation = locationToFind;
  if (!locationToFind) return DEFAULT_LOCATION;
  return locationToFind;
}

async function updateUI() {
  const data = await getWeather(searchLocation());
  updateLocationDisplay(data.location);
  updateCurrentDisplay(data.current);
  updateForecastDisplay(data.forecast);
}

function toggleUnits() {
  const btn = document.getElementById("toggleFCBtn");
  if (units.getTempUnits() === "&deg;F") {
    btn.innerHTML = "&deg;C";
  } else {
    btn.innerHTML = "&deg;F";
  }

  units.toggleUnits();
  updateUI();
}

function initializeBtns() {
  const searchBtn = document.getElementById("searchBtn");
  const toggleFCBtn = document.getElementById("toggleFCBtn");
  const searchbar = document.getElementById("searchbar");

  searchBtn.addEventListener("click", updateUI);
  toggleFCBtn.addEventListener("click", toggleUnits);
  searchbar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      updateUI();
    }
  });
}

export { updateUI, initializeBtns };
