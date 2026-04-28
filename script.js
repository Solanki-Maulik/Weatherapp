const form = document.querySelector(".input");
const input = document.querySelector("#inputvalue");
const result = document.getElementById("weatherResult");

const apiKey = "dbf5373dc7cc45438a7171627262903"; // please use your own api key

form.addEventListener("submit", getWeather);

function getWeather(event) {
  event.preventDefault();

  const city = input.value.trim();

  if (city === "") {
    result.innerHTML = `<p style="color:yellow;">⚠️ Enter a city name</p>`;
    return;
  }

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then(res => res.json())
    .then(data => {

      // ❌ City not found
      if (data.error) {
        result.innerHTML = `<p>❌ City not found</p>`;
        return;
      }

      // ✅ Show weather
      result.innerHTML = `
        <p><strong>${data.location.name}, ${data.location.country}</strong></p>
        <p>🌡 Temp: ${data.current.temp_c}°C</p>
        <p>🌤 ${data.current.condition.text}</p>
        <p>💨 Wind: ${data.current.wind_kph} kph</p>
      `;
    })
    .catch(() => {
      result.innerHTML = `<p style="color:red;">⚠️ Error fetching data</p>`;
    });
}