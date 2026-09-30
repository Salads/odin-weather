
class WeatherDataDay {
	#dateTime;
	#temperature;
	#feelsLike;
	#humidity;
	#conditions;

	constructor(dateTime, temperature, feelslike, humidity, conditions) {
		this.#assertWeatherDayData(dateTime, temperature, feelslike, humidity, conditions);
		this.#dateTime = dateTime,
		this.#temperature = temperature;
		this.#feelsLike = feelslike;
		this.#humidity = humidity;
		this.#conditions = conditions;
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

	#assertWeatherDayData(dateTime, temperature, feelslike, humidity, conditions) {
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
	}
};

export { WeatherDataDay };