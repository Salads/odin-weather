import { EventfulObject } from "./EventfulObject.js";
import { generateForecastHTML, getImagePath } from "./generators/GenForecastDOM.js";

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

	#unit = "f";
	#contentsVisible = false;

	constructor() {
		super();

		this.#ui.fButton.addEventListener("input", (e) => {
			if(this.#ui.fButton.checked) {
				let oldUnit = this.#unit;
				this.#unit = "f";

				if(oldUnit !== this.#unit) {
					this.emit("unitChanged");
				}
			}
		});

		this.#ui.cButton.addEventListener("input", (e) => {
			if(this.#ui.cButton.checked) {
				let oldUnit = this.#unit;
				this.#unit = "c";

				if(oldUnit !== this.#unit) {
					this.emit("unitChanged");
				}
			}
		});

		this.#ui.searchButton.addEventListener("click", (e) => {
			let locationText = this.#ui.searchBar.value.trim();
			if(locationText.length > 0) {
				this.emit("search", locationText);
			}
		});

		// One-time unit update.
		if(this.#ui.fButton.checked) {
			this.#unit = "f";
		}
		else if (this.#ui.cButton.checked ){
			this.#unit = "c";
		}
	}

	update(location, weatherData) {
		let currentData = weatherData.getCurrentDay();
		this.#clearForecasts();

		let curTemp = currentData.getTemperature();
		let curFeel = currentData.getFeelsLike();

		if(this.#unit === "c") {
			curTemp = Math.round((5.0 / 9.0)*(curTemp - 32));
			curFeel = Math.round((5.0 / 9.0)*(curFeel - 32));
		}

		this.#ui.currentCityName.innerHTML = location;
		this.#ui.currentTemperature.innerHTML = `${curTemp}°`;
		this.#ui.currentFeelsLike
			.innerHTML = `Feels Like: ${curFeel}°`;
		this.#ui.currentHumidity
			.innerHTML = `Humidity: ${currentData.getHumidity()}%`;
		this.#ui.currentConditionLabel
			.innerHTML = `${currentData.getConditions()}`;
		this.#ui.currentConditionImg.src = `${getImagePath(currentData.getIcon())}`;

		// Create Forecasts
		let nForecasts = weatherData.getNumForecasts();
		let maxForecasts = Math.min(5, nForecasts);

		for(let i = 1; i < nForecasts && i <= maxForecasts; i++) {
			let forecast = weatherData.getForecastAt(i);
			this.#addForecast(forecast);
		}
	}

	getLocationSearch() {
		return this.#ui.searchBar.value.trim();
	}

	revealContents() {
		if(this.#contentsVisible) {
			return;
		}
		this.#contentsVisible = true;

		this.#ui.appContents.classList.remove("is-hidden");
		this.#ui.appContents.classList.add("is-entering");

		requestAnimationFrame(() => {
			this.#ui.appContents.classList.remove("is-entering");
		});
	}

	#clearForecasts() {
		this.#ui.forcastsContainer.innerHTML = "";
	}

	#addForecast(weatherDataDay) {
		let html = generateForecastHTML(weatherDataDay, this.#unit);
		let range = document.createRange();
		let fragment = range.createContextualFragment(html);
		this.#ui.forcastsContainer.appendChild(fragment);
	}
}

export { DOMInterface };