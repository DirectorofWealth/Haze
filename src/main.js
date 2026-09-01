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

    if (weather_code === 51 || weather_code === 53 || weather_code === 55) {
        return "Drizzle";
    }

    if (weather_code === 61 || weather_code === 63 || weather_code === 65) {
        return "Rain";
    }

    if (weather_code === 71 || weather_code === 73 || weather_code === 75) {
        return "Snow";
    }

    if (weather_code === 80 || weather_code === 81 || weather_code === 82) {
        return "Rain showers";
    }

    if (weather_code === 95) {
        return "Thunderstorm";
    }

    return "Unknown";
}


searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const city = searchInput.value.trim();

        if (!city) {
            console.log("Please enter a city");
            return;
        }
    
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );


        if (!response.ok) {
            throw new Error("Couldn't fetch location data");
        }
    
        const data = await response.json();
    
        if (!data.results || data.results.length === 0) {
            throw new Error("City not found");
        }
    
    
        const {
            latitude,
            longitude
        } = data.results[0];
    
    
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m,weather_code&daily=temperature_2m_max,weather_code&forecast_days=7`
        );
    
        const weatherData = await weatherResponse.json();
    
    
        if (!weatherResponse.ok) {
            throw new Error("Couldn't fetch weather data");
        }
    
    
        const {
            temperature_2m,
            relative_humidity_2m,
            cloud_cover,
            wind_speed_10m,
            weather_code
        } = weatherData.current;


        const {
            time,
            temperature_2m_max,
            weather_code: dailyWeatherCodes
        } = weatherData.daily;
        
        
        const forecast = time.map((date, index) => {
        
            return {
                date: date,
                temperature: temperature_2m_max[index],
                weatherCode: dailyWeatherCodes[index]
            };
        
        });
        
        
        const forecastContainer = document.querySelector("#forecast-container");
        
        forecastContainer.innerHTML = "";
        
        
        forecast.map(day => {
        
            const card = document.createElement("div");
        
            const dayName = new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short"
            });
        
            card.innerHTML = `
                <p>${dayName}</p>
                <p>${day.temperature}°C</p>
                <p>${getWeatherDescription(day.weatherCode)}</p>
            `;
        
            forecastContainer.appendChild(card);
        
        });
    
    
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
    
        // console.log(description);
    
        document.querySelector("#condition").textContent = description;
   
   
    } catch (error) {
        console.log(`Error: ${error.message}`);

    }

});