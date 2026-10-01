
class WeatherDataDay {
	#dateTime;
	#temperature;
	#feelsLike;
	#humidity;
	#conditions;
	#icon;

	constructor(dateTime, temperature, feelslike, humidity, conditions, icon) {
		this.#assertWeatherDayData(dateTime, temperature, feelslike, humidity, conditions, icon);
		this.#dateTime = dateTime;
		this.#temperature = temperature;
		this.#feelsLike = feelslike;
		this.#humidity = humidity;
		this.#conditions = conditions;
		this.#icon = icon;
	}

	getDateTime() {
		return this.#dateTime;
	}

	getTemperature() {
		return this.#temperature;
	}

	getFeelsLike() {
		return this.#feelsLike;
	}

	getHumidity() {
		return this.#humidity;
	}

	getConditions() {
		return this.#conditions;
	}

	getIcon() {
		return this.#icon;
	}

	getClone() {
		return new WeatherDataDay(
			this.#dateTime, 
			this.#temperature, 
			this.#feelsLike, 
			this.#humidity, 
			this.#conditions, 
			this.#icon
		);
	}

	#assertWeatherDayData(dateTime, temperature, feelslike, humidity, conditions, icon) {
		if(dateTime?.constructor !== String) {
			throw new Error("dateTime is not a String!")
		}

		if(temperature?.constructor !== Number) {
			throw new Error("temperature is not a Number!")
		}

		if(feelslike?.constructor !== Number) {
			throw new Error("feelslike is not a Number!")
		}

		if(humidity?.constructor !== Number) {
			throw new Error("humidity is not a Number!")
		}

		if(conditions?.constructor !== String) {
			throw new Error("conditions is not a String!")
		}

		if(icon?.constructor !== String) {
			throw new Error("icon is not a String!")
		}
	}
};

export { WeatherDataDay };