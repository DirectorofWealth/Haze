const searchForm = document.querySelector("#searchForm");

const searchInput = document.querySelector("#searchInput");

const searchButton = document.querySelector("#searchButton");


function getWeatherDescription(weather_code) {

    if (weather_code === 0) {
        return "Clear sky";
    }

    if (weather_code === 1) {
        return "Mainly clear";
    }

    if (weather_code === 2) {
        return "Partly cloudy";
    }

    if (weather_code === 3) {
        return "Overcast";
    }

    return "Unknown";
}


searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = searchInput.value.trim();

    if (!city) {
        console.log("Please enter a city");
        return;
    }

    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const data = await response.json();

    console.log(data);

    const {
        latitude,
        longitude
    } = data.results[0];

    console.log(latitude);
    console.log(longitude);


    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m,weather_code`
    );

    const weatherData = await weatherResponse.json();

    console.log(weatherData);

    const {
        temperature_2m,
        relative_humidity_2m,
        cloud_cover,
        wind_speed_10m,
        weather_code
    } = weatherData.current;

    console.log(temperature_2m);
    console.log(relative_humidity_2m);
    console.log(cloud_cover);
    console.log(wind_speed_10m);


    document.querySelector("#temperature").textContent =
        `${temperature_2m}°C`;

    document.querySelector("#humidity").textContent =
        `${relative_humidity_2m}%`;

    document.querySelector("#cloud-cover").textContent =
        `${cloud_cover}%`;

    document.querySelector("#wind-speed").textContent =
        `${wind_speed_10m} km/h`;


    document.querySelector("#weather-info").hidden = false;


    const description = getWeatherDescription(weather_code);

    console.log(description);

    document.querySelector("#condition").textContent = description;
});