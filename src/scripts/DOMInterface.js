import { EventfulObject } from "./EventfulObject.js";
import { generateForecastHTML, getQuotedImagePath } from "./generators/GenForecastDOM.js";

class DOMInterface extends EventfulObject {
	
	#ui = {
		searchBar : document.getElementById("search-bar"),
		searchButton : document.getElementById("search-button"),
		appContents : document.getElementById("app-contents"),
		currentCityName : document.getElementById("current-city-name"),
		currentTemperature : document.getElementById("current-temperature"),
		currentFeelsLike : document.getElementById("current-feels-like"),
		currentHumidity : document.getElementById("current-humidity"),
		currentConditionImg : document.getElementById("current-condition-img"),
		currentConditionLabel : document.getElementById("condition-label"),
		fButton : document.getElementById("unit-fahrenheit"),
		cButton : document.getElementById("unit-celsius"),
		forcastsContainer : document.getElementById("forecasts-container"),
	}

	constructor() {
		super();

		this.#ui.fButton.addEventListener("input", (e) => {
			if(this.#ui.fButton.checked) {
				this.emit("unitChanged", "f");
			}
		});

		this.#ui.cButton.addEventListener("input", (e) => {
			if(this.#ui.cButton.checked) {
				this.emit("unitChanged", "c");
			}
		});

		this.#ui.searchButton.addEventListener("click", (e) => {
			let locationText = this.#ui.searchBar.value.trim();
			if(locationText.length > 0) {
				this.emit("search", locationText);
			}
		});
	}

	update(location, weatherData, unit) {
		let currentData = weatherData.getCurrentDay();
		this.#clearForecasts();

		let curTemp = currentData.getTemperature();
		let curFeel = currentData.getFeelsLike();

		if(unit === "c") {
			curTemp = (5.0 / 9.0)*(curTemp - 32);
			curFeel = (5.0 / 9.0)*(curFeel - 32);
		}

		this.#ui.currentCityName.innerHTML = location;
		this.#ui.currentTemperature.innerHTML = `${curTemp}°`;
		this.#ui.currentFeelsLike
			.innerHTML = `Feels Like: ${curFeel}°`;
		this.#ui.currentHumidity
			.innerHTML = `Humidity: ${currentData.getHumidity()}%`;
		this.#ui.currentConditionLabel
			.innerHTML = `${currentData.getConditions()}`;
		this.#ui.currentConditionImg.src = `${getQuotedImagePath(currentData.getIcon())}`;

		// Create Forecasts
		let nForecasts = weatherData.getNumForecasts();
		for(let i = 0; i < nForecasts; i++) {
			let forecast = weatherData.getForecastAt(i);
			this.#addForecast(forecast);
		}
	}

	#clearForecasts() {
		this.#ui.forcastsContainer.innerHTML = "";
	}

	#addForecast(weatherDataDay) {
		let html = generateForecastHTML(weatherDataDay);
		let range = document.createRange();
		let fragment = range.createContextualFragment(html);
		this.#ui.forcastsContainer.appendChild(fragment);
	}
}

export { DOMInterface };