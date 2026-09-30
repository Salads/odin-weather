
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

function getQuotedImagePath(iconName) {
	return `"./assets/${iconName}.png"`;
}

function generateForecastHTML(dataDay) {
	return `
		<div>
	`;
}

export { generateForecastHTML };