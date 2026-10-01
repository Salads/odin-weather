import { WeatherAPI } from "./WeatherAPI.js";
import { WeatherData } from "./WeatherData.js";
import { WeatherDataDay } from "./WeatherDataDay.js";

const ODIN_TOLD_ME_TO = "2CLWJ496AU9RG4SSJGBWT2NJZ";

class VisualCrossingAPI extends WeatherAPI {

	async fetchData(location) {
		const response = await fetch(this.#getQueryString(location));
		
		if(!response.ok) {
			throw new Error(`Response not ok: ${response.status}`);
		}

		const responseJSON = await response.json();
		console.log(responseJSON);

		return this.#getWeatherDataFromResponse(responseJSON, location);
	}

	#getWeatherDataFromResponse(responseJSON, locationName) {
		/*
			NOTE(Salads): VisualCrossingAPI JSON Fields

			Current -> currentConditions object
			Days (forcasts) -> days array of objects

			----- Each Day Info -----
			date -> "datetime" (string date)
			tempurature -> "temp"
			feels like -> "feelslike"
			humidity -> "humidity"
			condition -> "conditions" (single string)
		*/
		let result = new WeatherData(locationName);
		let currentDayJSON = responseJSON.currentConditions;
		result.setCurrentDay(
			currentDayJSON.datetime,
			currentDayJSON.temp,
			currentDayJSON.feelslike,
			currentDayJSON.humidity,
			currentDayJSON.conditions,
			currentDayJSON.icon
		);

		for(let jsonForecastDay of responseJSON.days) {
			result.emplaceForecast(
				jsonForecastDay.datetime,
				jsonForecastDay.temp,
				jsonForecastDay.feelslike,
				jsonForecastDay.humidity,
				jsonForecastDay.conditions,
				jsonForecastDay.icon
			);
		}

		return result;
	}

	#getQueryString(location) {
		return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/next7days?unitGroup=us&include=days%2Ccurrent&key=${ODIN_TOLD_ME_TO}&contentType=json`;
	}

}

export { VisualCrossingAPI };