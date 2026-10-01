
/*
class WeatherDataDay {
	dateTime;
	temperature;
	feelsLike;
	humidity;
	conditions;
};

snow	                Snow occurs throughout the period or the amount of snow is greater than zero
rain	                Rain occurs throughout the period or the amount of rainfall is greater than zero
fog	                    Visibility is low
wind	                Wind speed is high
cloudy	                Cloud cover is greater than 90%
partly-cloudy-day	    Cloud cover is greater than 20% during daytime
partly-cloudy-night	    Cloud cover is greater than 20% during nighttime
clear-day	            Cloud cover is less than 20% during daytime
clear-night             Cloud cover is less than 20% during nighttime

<a href="https://www.flaticon.com/authors/magnific">Icons created by Magnific - Flaticon</a>
*/

const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
function getDayName(dateTime) {
	const [y, m, d] = dateTime.slice(0, 10).split("-").map(Number);
	return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short" });
}

function getImagePath(iconName) {
	return `./assets/${iconName}.png`;
}

function generateForecastHTML(dataDay, unit) {

	let dateObj = new Date(dataDay.getDateTime());
	let dayStr = days[dateObj.getDay()];

	let curTemp = dataDay.getTemperature();
	let curFeel = dataDay.getFeelsLike();

	if(unit === "c") {
		curTemp = Math.round((5.0 / 9.0)*(curTemp - 32));
		curFeel = Math.round((5.0 / 9.0)*(curFeel - 32));
	}

	return `
<div class="forecast-container">
	<p class="forecast-day-text">${getDayName(dataDay.getDateTime())}</p>
	<p class="forecast-temp-text">${curTemp}°</p>
	<div class="forecast-details-container">
		<p class="forecast-feelslike">${curFeel}°</p>
		<span></span>
		<p class="forecast-humidity">${dataDay.getHumidity()}%</p>
		<span></span>
		<div class=condition-container>
			<p class="forecast-condition-text">${dataDay.getConditions()}</p>
			<img class="forecast-condition-img" src="${getImagePath(dataDay.getIcon())}">
		</div>
	</div>
</div>
	`;
}

export { generateForecastHTML, getImagePath };