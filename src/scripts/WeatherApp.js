import { DOMInterface } from "./DOMInterface.js";
import { WeatherAPI } from "./WeatherAPI.js";

class WeatherApp {
	#weatherAPI;
	#dom;
	#weatherData;

	constructor(weatherAPI) {
		if(!(weatherAPI instanceof WeatherAPI)) {
			throw new Error("WeatherApp must be constructed with instance of WeatherAPI!");
		}

		this.#weatherAPI = weatherAPI;
		this.#dom = new DOMInterface();

		this.#dom.addEventListener("search", async (locationText) => {
			this.#weatherData = await this.#weatherAPI.fetchData(locationText);
			this.#dom.update(locationText, this.#weatherData);
		});

		this.#dom.addEventListener("unitChanged", () => {
			if(!this.#weatherData) {
				throw new Error("Unit Changed but no weather data!");
			}

			this.#dom.update(this.#dom.getLocationSearch(), this.#weatherData);
		});
	}

};

export { WeatherApp };