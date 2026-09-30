import { WeatherDataDay } from "./WeatherDataDay.js";

class WeatherData {
	#current;
	#forecasts = [];

	setCurrentDay(dateTime, temperature, feelslike, humidity, conditions, icon) {
		this.#assertWeatherDayData(dateTime, temperature, feelslike, humidity, conditions, icon);
		this.current = new WeatherDataDay(dateTime, temperature, feelslike, humidity, conditions, icon);
	}

	getCurrentDay() {
		return structuredClone(this.#current);
	}

	emplaceForecast(dateTime, temperature, feelslike, humidity, conditions, icon) {
		this.#assertWeatherDayData(dateTime, temperature, feelslike, humidity, conditions, icon);
		this.#forecasts.push(new WeatherDataDay(dateTime, temperature, feelslike, humidity, conditions, icon));
	}

	getForecastAt(idx) {
		structuredClone(this.#forecasts[idx]);
	}

	getNumForecasts() {
		return this.#forecasts.length;
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
}

export { WeatherData };