import {
    getWeatherDescription,
    getWeatherIcon
} from "./weatherHelpers.js";


export function displayLocation(location, weather) {

    const {
        name
    } = location;

    const {
        weather_code,
        time
    } = weather.current;


    document.querySelector("#title-display").hidden = true;

    document.querySelector("#weather-info").hidden = false;

    document.querySelector("#current-details").hidden = false


    document.querySelector("#current-icon").textContent =
        getWeatherIcon(weather_code);


    document.querySelector("#current-city").textContent =
        name;



    const date = new Date(time);

    const formattedDate =
        date.toLocaleDateString("en-US", {
            weekday: "long"
        });


    const formattedTime =
        date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit"
        });


    document.querySelector("#current-time").textContent =
        `${formattedDate} ${formattedTime}`;


    document.querySelector("#current-condition").textContent =
        getWeatherDescription(weather_code);
}


export function displayCurrentWeather(weather) {

    const {
        temperature_2m,
        relative_humidity_2m,
        cloud_cover,
        wind_speed_10m
    } = weather.current;


    document.querySelector("#temperature").textContent =
        `${temperature_2m}°C`;


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
                    weekday: "short"
                });


        card.className = "text-center";


        card.innerHTML = `

            <p class="text-sm text-zinc-300">
                ${dayName}
            </p>

            <div class="my-4 text-4xl">
                ${getWeatherIcon(day.weatherCode)}
            </div>

            <div>

                <span class="font-semibold">
                    ${Math.round(day.temperatureMax)}°
                </span>

                <span class="text-zinc-400">
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