export function getWeatherDescription(weatherCode) {

    if (weatherCode === 0) {
        return "Clear sky";
    }

    if (weatherCode === 1) {
        return "Mainly clear";
    }

    if (weatherCode === 2) {
        return "Partly cloudy";
    }

    if (weatherCode === 3) {
        return "Overcast";
    }

    if ([45, 48].includes(weatherCode)) {
        return "Fog";
    }

    if ([51, 53, 55].includes(weatherCode)) {
        return "Drizzle";
    }

    if ([56, 57].includes(weatherCode)) {
        return "Freezing drizzle";
    }

    if ([61, 63, 65].includes(weatherCode)) {
        return "Rain";
    }

    if ([66, 67].includes(weatherCode)) {
        return "Freezing rain";
    }

    if ([71, 73, 75].includes(weatherCode)) {
        return "Snow";
    }

    if (weatherCode === 77) {
        return "Snow grains";
    }

    if ([80, 81, 82].includes(weatherCode)) {
        return "Rain showers";
    }

    if ([85, 86].includes(weatherCode)) {
        return "Snow showers";
    }

    if (weatherCode === 95) {
        return "Thunderstorm";
    }

    if ([96, 99].includes(weatherCode)) {
        return "Thunderstorm with hail";
    }

    return "Unknown";
}


export function getWeatherIcon(weatherCode) {

    if (weatherCode === 0) {
        return "☀️";
    }

    if (weatherCode === 1) {
        return "🌤️";
    }

    if (weatherCode === 2) {
        return "⛅";
    }

    if (weatherCode === 3) {
        return "☁️";
    }

    if ([45, 48].includes(weatherCode)) {
        return "🌫️";
    }

    if ([51, 53, 55].includes(weatherCode)) {
        return "🌦️";
    }

    if ([61, 63, 65, 80, 81, 82].includes(weatherCode)) {
        return "🌧️";
    }

    if ([66, 67].includes(weatherCode)) {
        return "🌧️";
    }

    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
        return "🌨️";
    }

    if ([95, 96, 99].includes(weatherCode)) {
        return "⛈️";
    }

    return "❓";
}


export function createForecastData(daily) {

    const {
        time,
        temperature_2m_max,
        temperature_2m_min,
        weather_code
    } = daily;

    return time.map((date, index) => {

        return {
            date: date,
            temperatureMax: temperature_2m_max[index],
            temperatureMin: temperature_2m_min[index],
            weatherCode: weather_code[index]
        };

    });
}