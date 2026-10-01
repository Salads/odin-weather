import "./assets/clear-day.png";
import "./assets/clear-night.png";
import "./assets/cloudy.png";
import "./assets/fog.png";
import "./assets/partly-cloudy-day.png";
import "./assets/partly-cloudy-night.png";
import "./assets/rain.png";
import "./assets/snow.png";
import "./assets/wind.png";

import "./styles.css";
import { WeatherApp } from "./scripts/WeatherApp.js";
import { VisualCrossingAPI } from "./scripts/VisualCrossingAPI.js";

const app = new WeatherApp(new VisualCrossingAPI());