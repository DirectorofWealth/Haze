# Haze 🌤️

Haze is a responsive weather dashboard built with **HTML, Vanilla JavaScript, Tailwind CSS, and Vite**. Users search for a city and receive current weather conditions, local date/time, feels-like temperature, and a 7-day forecast.

## Problem

Getting a quick, useful view of the weather can involve unnecessarily complex interfaces. Haze focuses on one simple task: **search for a city and understand its weather immediately**.

## Solution

Haze uses the Open-Meteo APIs in a simple data pipeline:

```text
City name
   ↓
Geocoding API
   ↓
Latitude + Longitude
   ↓
Forecast API
   ↓
Weather data
   ↓
Data transformation
   ↓
Responsive weather dashboard
```

The geocoding request resolves the city first because the forecast request requires latitude and longitude.

## Features

- City search
- Current temperature
- Feels-like temperature
- Wind speed
- Relative humidity
- Cloud cover
- Weather descriptions
- Weather icons mapped from WMO weather codes
- Local date and time
- City and country display
- 7-day forecast
- Loading state
- Error handling
- Stale-data clearing between searches
- Responsive Tailwind UI
- Vanilla JavaScript ES modules

## Tech Stack

- HTML5
- Vanilla JavaScript (ES6+)
- Tailwind CSS
- Vite
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

Haze deliberately uses no frontend framework. It demonstrates the JavaScript fundamentals that frameworks such as React build upon.

## Project Structure

```text
Haze/
├── index.html
├── src/
│   ├── js/
│   │   ├── api.js
│   │   ├── main.js
│   │   ├── ui.js
│   │   └── weatherHelpers.js
│   └── style.css
└── README.md
```

### `main.js`

Application controller. Handles form submission, validation, loading/error states, API calls, forecast-data creation, and UI updates.

### `api.js`

Contains external API requests:

- `getLocation(city)`
- `getWeather(latitude, longitude)`

### `weatherHelpers.js`

Contains weather-code interpretation and forecast-data transformation:

- `getWeatherDescription()`
- `getWeatherIcon()`
- `createForecastData()`

### `ui.js`

Contains DOM rendering functions:

- `displayLocation()`
- `displayCurrentWeather()`
- `displayForecast()`
- `clearWeatherDisplay()`

## Performance

The initial city search requires two dependent requests:

```text
city → coordinates → weather
```

Because the forecast request needs the coordinates returned by geocoding, these two requests cannot be fully parallelized for a new search.

Haze already minimizes the forecast payload by requesting only the weather fields it displays and uses `timezone=auto` so the returned forecast uses the searched location's local timezone.

Further production optimizations could include:

- caching recent city/weather responses
- autocomplete with debouncing
- backend/server-side caching
- avoiding repeated requests for identical searches
- adding stale-while-revalidate behavior for cached weather

## Location Edge Cases

A city can have the same name as its country, such as Luxembourg.

Haze keeps `name` and `country` as separate pieces of data rather than assuming identical strings mean the country should replace the city.

The UI can therefore represent:

```text
Luxembourg, Luxembourg
```

without losing the distinction between the city and country.

## Error Handling

Haze handles:

- empty searches
- cities that cannot be found
- failed geocoding requests
- failed forecast requests
- unexpected request failures

Before a new request, the previous weather display is cleared. If the request fails, the user sees an error instead of stale weather data.

## Loading State

While searching:

- the search button is disabled
- the button displays `Loading...`
- a loading message is displayed

The `finally` block restores the normal UI regardless of whether the request succeeds or fails.

## Weather Codes

Haze maps Open-Meteo WMO weather codes into human-readable descriptions and icons.

Examples:

| Code | Description |
|---:|---|
| 0 | Clear sky |
| 1 | Mainly clear |
| 2 | Partly cloudy |
| 3 | Overcast |
| 45, 48 | Fog |
| 51, 53, 55 | Drizzle |
| 61, 63, 65 | Rain |
| 71, 73, 75 | Snow |
| 80, 81, 82 | Rain showers |
| 95 | Thunderstorm |
| 96, 99 | Thunderstorm with hail |

## JavaScript Concepts Demonstrated

Haze demonstrates:

- DOM manipulation
- event listeners
- form handling
- Promises
- `async/await`
- Fetch API
- JSON parsing
- HTTP response validation
- `try/catch/finally`
- object destructuring
- array methods
- template literals
- ES modules
- API data transformation
- dynamic DOM creation
- UI state management
- loading and error states

## Running Locally

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Open the local URL provided by Vite.

## Portfolio Value

Haze is more than a weather UI. It demonstrates the ability to build an API-driven frontend from the ground up without depending on a framework.

The project shows practical understanding of:

1. Consuming external APIs
2. Handling asynchronous operations
3. Separating API, data, and UI responsibilities
4. Transforming external data into application-friendly structures
5. Managing loading and error states
6. Dynamically rendering data
7. Building responsive interfaces
8. Designing around real-world API edge cases

The architecture also provides a strong foundation for a future React implementation.

## Future Improvements

- Search autocomplete
- Recent searches
- Favorite cities
- Browser geolocation
- Celsius/Fahrenheit switching
- Sunrise and sunset
- Precipitation probability
- UV index
- Weather animations
- Improved accessibility
- Offline/PWA support
- Backend weather caching
- React implementation

## Developer
Reverence Anietie (Wealth)

## License

Learning and portfolio project.
