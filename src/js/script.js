document.querySelector("#search").addEventListener("submit", (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value.trim();

    if (!cityName) {
        alert("Você deve digitar o nome de uma cidade para obter a previsão do tempo.");
        return;
    }

    console.log(cityName);
});