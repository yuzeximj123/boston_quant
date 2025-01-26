document.addEventListener("DOMContentLoaded", function () {
    const weatherElement = document.getElementById("weatherForecast");
    const dateElement = document.getElementById("currentDate");
    const apiKey = "1e6fa05222f54bdabf3151400252501"; // Replace with your WeatherAPI key
    const location = "Boston"; // Change to your desired location

    // Function to fetch and display the weather
    async function fetchWeather() {
        try {
            console.log("Fetching weather data..."); // Debug log
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Weather data fetched successfully:", data); // Debug log

            const weatherDescription = data.current.condition.text;
            const windSpeed = data.current.wind_kph;
            const temperature = data.current.temp_c;
            const humidity = data.current.humidity;

            weatherElement.innerHTML = `
                <span style="font-style: italic;">Weather forecast for the next 24 hours: ${weatherDescription}</span><br>
                <span>Wind: ${windSpeed} km/h; Temp: ${temperature}°C; Hum: ${humidity}%</span>
            `;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            weatherElement.innerHTML = `<span style="font-style: italic; color: red;">Failed to load weather data</span>`;
        }
    }

    // Function to display the current live date
    function displayCurrentDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString("en-US", options);
        console.log("Current date generated:", formattedDate); // Debug log
        dateElement.textContent = `Boston, MA - ${formattedDate}`;
    }

    // Call the functions
    displayCurrentDate();
    fetchWeather();
});
