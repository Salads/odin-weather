import "./styles.css";
import { WeatherApp } from "./scripts/WeatherApp.js";
import { VisualCrossingAPI } from "./scripts/VisualCrossingAPI.js";

const app = new WeatherApp(new VisualCrossingAPI());