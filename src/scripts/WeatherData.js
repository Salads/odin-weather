
class WeatherData {
	current;
	forecasts = [];

	setCurrentDay(dataDay) {
		this.current = dataDay;
	}

	addForecast(dataDay) {
		this.forecasts.push(dataDay);
	}
}

export { WeatherData };