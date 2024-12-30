const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            display("Could not fetch weather data. Please try again.");
        }
    } else {
        display("Please enter a city.");
    }
});

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error("City not found");
    }
    const data = await response.json();
    return data;
}

async function displayWeatherInfo(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const weatherId = data.weather[0].id;
    const emoji = getWeatherEmoji(weatherId);

    card.style.display = "flex";
    card.innerHTML = `
        <h1 class="cityDisplay">${cityName}</h1>
        <p class="tempDisplay">${temperature}°C</p>
        <p class="humidityDisplay">Humidity: ${humidity}%</p>
        <p class="descDisplay">${description}</p>
        <p class="weatherEmoji">${emoji}</p>
    `;
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
    if (weatherId >= 300 && weatherId < 400) return "🌦️"; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return "🌧️"; // Rain
    if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
    if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere
    if (weatherId === 800) return "☀️"; // Clear sky
    if (weatherId > 800) return "☁️"; // Clouds
    return "🌍"; // Default emoji
}

function display(message) {
    const err = document.createElement("p");
    err.textContent = message;
    err.classList.add("errorDisplay");
    card.innerHTML = "";
    card.style.display = "flex";
    card.appendChild(err);
}
