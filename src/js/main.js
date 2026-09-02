import {
    getLocation,
    getWeather
} from "./api.js";

import {
    createForecastData
} from "./weatherHelpers.js";

import {
    displayLocation,
    displayCurrentWeather,
    displayForecast
} from "./ui.js";


const searchForm =
    document.querySelector("#searchForm");

const searchInput =
    document.querySelector("#searchInput");

const errorMessage =
    document.querySelector("#error-message");

const searchButton =
    document.querySelector("#searchButton");


searchForm.addEventListener("submit", async (event) => {

    event.preventDefault();
    
    searchButton.disabled = true;
    searchButton.textContent = "Loading...";


    try {

        const city =
            searchInput.value.trim();


        if (!city) {
            throw new Error("Please enter a city");
        }


        errorMessage.hidden = true;


        const location =
            await getLocation(city);


        const weather =
            await getWeather(
                location.latitude,
                location.longitude
            );


        const forecast =
            createForecastData(weather.daily);


        displayLocation(
            location,
            weather
        );


        displayCurrentWeather(
            weather
        );


        displayForecast(
            forecast
        );


    } catch (error) {

        errorMessage.textContent =
            error.message;

        errorMessage.hidden = false;

        console.log(
            `Error: ${error.message}`
        );
    }

});