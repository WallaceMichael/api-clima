document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#city_name").value.trim();

  if (!cityName) {
    document.querySelector("#weather").classList.remove("show");
    showAlert("Você deve digitar o nome da cidade...");
    return;
  }

  const apiKey = "8a60b2de14f7a17c7a11706b2cfcd87c";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl),
    ]);

    const weatherJson = await weatherRes.json();
    const forecastJson = await forecastRes.json();

    if (weatherJson.cod === 200) {
      
      const next24h = forecastJson.list.slice(0, 8);

      const temps = [
        weatherJson.main.temp,
        ...next24h.map((item) => item.main.temp),
      ];

      const tempMax = Math.max(...temps);
      const tempMin = Math.min(...temps);

      showInfos({
        city: weatherJson.name,
        country: weatherJson.sys.country,
        temp: weatherJson.main.temp,
        tempMax,
        tempMin,
        description: weatherJson.weather[0].description,
        tempIcon: weatherJson.weather[0].icon,
        windSpeed: weatherJson.wind.speed,
        humidity: weatherJson.main.humidity,
      });
    } else {
      document.querySelector("#weather").classList.remove("show");
      showAlert(`
                Cidade não encontrada. Por favor, tente novamente.
                <img src="src/images/404.svg" alt="Not Found">
            `);
    }
  } catch (error) {
    showAlert("Erro ao buscar dados. Verifique sua conexão.");
  }
});

function showInfos(json) {
  showAlert("");

  document.querySelector("#weather").classList.add("show");
  document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
  document.querySelector("#temp_value").innerHTML =
    `${json.temp.toFixed(1).replace(".", ",")} <sup>°C</sup>`;
  document.querySelector("#description").innerHTML = json.description;
  document
    .querySelector("#temp_img")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`,
    );
  document.querySelector("#temp_max").innerHTML =
    `${json.tempMax.toFixed(1).replace(".", ",")} <sup>°C</sup>`;
  document.querySelector("#temp_min").innerHTML =
    `${json.tempMin.toFixed(1).replace(".", ",")} <sup>°C</sup>`;
  document.querySelector("#humidity").innerHTML = `${json.humidity}%`;
  document.querySelector("#wind_speed").innerHTML =
    `${json.windSpeed.toFixed(1).replace(".", ",")} km/h`;
}

function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg || "";
}
