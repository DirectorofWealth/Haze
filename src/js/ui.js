import {
    getWeatherDescription,
    getWeatherIcon
} from "./weatherHelpers.js";


export function displayLocation(location, weather) {

    const {
        name,
        country
    } = location;

    const {
        weather_code,
    } = weather.current;

    const targetTimezone = weather.timezone


    document.querySelector("#title-display").hidden = true;

    document.querySelector("#weather-info").hidden = false;

    document.querySelector("#current-details").hidden = false


    document.querySelector("#current-icon").textContent =
        getWeatherIcon(weather_code);


    document.querySelector("#current-city").innerHTML =
        `${name}, <span class= "text-yellow-200"> ${country}</span>`;



    const now = new Date();

    const formattedDate =
        now.toLocaleDateString("en-US", {
            weekday : "long",
            month: "long",
            day: "numeric",
            timezone: targetTimezone
        });


    const formattedTime =
        now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            timezone: targetTimezone

        });


    document.querySelector("#current-time").textContent =
        `${formattedDate} ${formattedTime}`;


    document.querySelector("#current-condition").textContent =
        getWeatherDescription(weather_code);
}


export function displayCurrentWeather(weather) {

    const {
        temperature_2m,
        apparent_temperature,
        relative_humidity_2m,
        cloud_cover,
        wind_speed_10m
    } = weather.current;


    document.querySelector("#temperature").textContent =
        `${temperature_2m}°C`;

    document.querySelector("#feels-like").textContent =
        `${apparent_temperature}°C`;


    document.querySelector("#humidity").textContent =
        `${relative_humidity_2m}%`;


    document.querySelector("#cloud-cover").textContent =
        `${cloud_cover}%`;


    document.querySelector("#wind-speed").textContent =
        `${wind_speed_10m} km/h`;
}


export function displayForecast(forecast) {

    const forecastContainer =
        document.querySelector("#forecast-container");


    forecastContainer.innerHTML = "";


    forecast.forEach(day => {

        const card = document.createElement("div");


        const dayName =
            new Date(`${day.date}T12:00:00`)
                .toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric"

                });


        card.className = "text-center mb-2";


        card.innerHTML = `

            <p class="text-sm text-zinc-300">
                ${dayName}
            </p>

            <div class="my-4 text-4xl">
                ${getWeatherIcon(day.weatherCode)}
            </div>

            <p class="text-sm text-zinc-400">
                ${getWeatherDescription(day.weatherCode)}
            </p>

            <div>

                <span class="font-semibold text-lg">
                    ${Math.round(day.temperatureMax)}°
                </span>

                <span class="text-zinc-400 text-sm">
                    ${Math.round(day.temperatureMin)}°
                </span>

            </div>

        `;


        forecastContainer.appendChild(card);
    });
}


export function clearWeatherDisplay() {

    document.querySelector("#current-details").hidden = true;

    document.querySelector("#weather-info").hidden = true;

    document.querySelector("#title-display").hidden = false;

}