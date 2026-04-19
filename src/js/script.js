document.querySelector("#search").addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value.trim();

    if (!cityName) {
        document.querySelector('#weather').classList.remove('show');
        showAlert("Você deve digitar o nome da cidade...");
        return;
    }

    const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
    const apiUrlkey = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const results = await fetch(apiUrlkey);
        const json = await results.json();

        if (json.cod === 200) {
            showInfos({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity
            });
        } else {
            // Caso a API retorne 404 ou outro erro
            document.querySelector('#weather').classList.remove('show');
            showAlert(`
                
                Cidade não encontrada. Por favor, tente novamente.
                <img src="src/images/404.svg" alt="Not Found" >
                
                `);
        }
    } catch (error) {
        showAlert("Erro ao buscar dados. Verifique sua conexão.");
    }
});

function showInfos(json) {
    showAlert(""); // Limpa alertas anteriores

    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).replace('.', ',')} <sup>°C</sup>`;
    
    // CORREÇÃO AQUI: Mudamos para coincidir com o ID do HTML
    document.querySelector('#description').innerHTML = json.description;
    
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind_speed').innerHTML = `${json.windSpeed.toFixed(1).replace('.', ',')} km/h`;
}

function showAlert(msg) {
    
    if (!msg) {
        document.querySelector('#alert').innerHTML = "";
    } else {
        document.querySelector('#alert').innerHTML = msg;
    }

    document.querySelector('#alert').innerHTML = msg;

}