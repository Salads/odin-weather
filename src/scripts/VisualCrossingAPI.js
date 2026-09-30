import { WeatherAPI } from "./WeatherAPI.js";

const ODIN_TOLD_ME_TO = "2CLWJ496AU9RG4SSJGBWT2NJZ";

class VisualCrossingAPI extends WeatherAPI {

	async fetchData(location) {
		try {
			const response = await fetch(this.getQueryString(location));
			if(!response.ok) {
				throw new Error(`Response not ok: ${response.status}`);
			}

			const result = await response.json();
			console.log(result);

			return result;
		}
		catch (error) {
			console.error(error.message);
		}
	}

	getQueryString(location) {
		return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=us&include=days%2Ccurrent&key=${ODIN_TOLD_ME_TO}&contentType=json`;
	}

}

export { VisualCrossingAPI };