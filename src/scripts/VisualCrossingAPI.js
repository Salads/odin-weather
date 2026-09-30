import { WeatherAPI } from "./WeatherAPI.js";
import { WeatherData } from "./WeatherData.js";
import { WeatherDataDay } from "./WeatherDataDay.js";

const ODIN_TOLD_ME_TO = "2CLWJ496AU9RG4SSJGBWT2NJZ";

class VisualCrossingAPI extends WeatherAPI {

	async fetchData(location) {
		try {
			const response = await fetch(this.#getQueryString(location));
			if(!response.ok) {
				throw new Error(`Response not ok: ${response.status}`);
			}

			const responseJSON = await response.json();
			console.log(result);

			return this.#getWeatherDataFromResponse(responseJSON);
		}
		catch (error) {
			console.error(error.message);
		}
	}

	#getWeatherDataFromResponse(responseJSON) {
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
		let result = new WeatherData();
		result.setCurrentDay(this.#getDataDay(responseJSON.currentConditions));
		for(let jsonForecastDay of responseJSON.days) {
			result.addForecast(this.#getDataDay(jsonForecastDay));
		}
	}

	#getDataDay(json) {
		let result = new WeatherDataDay();
		result.dateTime = json.datetime;
		result.temperature = json.temp;
		result.feelsLike = json.feelslike;
		result.humidity = json.humidity;
		result.conditions = json.conditions;
		return result;
	}

	#getQueryString(location) {
		return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=us&include=days%2Ccurrent&key=${ODIN_TOLD_ME_TO}&contentType=json`;
	}

}

export { VisualCrossingAPI };