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

		this.#dom.addEventListener("search", async (event) => {
			try {
				this.#weatherData = await this.#weatherAPI.fetchData(event.data);
				this.#dom.update(event.data, this.#weatherData);
			}
			catch(error) {
				console.error(`Search failed: ${error.message}`);
			}
		});

		this.#dom.addEventListener("unitChanged", () => {
			if(this.#weatherData) {
				this.#dom.update(this.#weatherData.getLocationName(), this.#weatherData);
			}
		});
	}

};

export { WeatherApp };