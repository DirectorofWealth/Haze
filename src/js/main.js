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
    displayForecast,
    clearWeatherDisplay
} from "./ui.js";


const searchForm =
    document.querySelector("#searchForm");

const searchInput =
    document.querySelector("#searchInput");

const errorMessage =
    document.querySelector("#error-message");

const loadingMessage =
    document.querySelector("#loading-message");

const searchButton =
    document.querySelector("#searchButton");


searchForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    loadingMessage.hidden = false;

    searchButton.disabled = true;
    searchButton.textContent = "Loading...";
    
    errorMessage.hidden = true;
    errorMessage.textContent = "";

    clearWeatherDisplay();
    

    try {

        const city =
            searchInput.value.trim();


        if (!city) {
            throw new Error("Please enter a city");
        }


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

        clearWeatherDisplay();

        errorMessage.textContent =
            error.message;

        errorMessage.hidden = false;

        console.log("SEARCH ERROR:", error.message);


    } finally {

        searchButton.disabled = false;
        searchButton.textContent = "Search"

        loadingMessage.hidden = true;


        searchInput.value = "";

    }

});