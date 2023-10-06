const API_KEY = 'f65307767e03462881b163921233009';
const searchQueryElement = document.getElementById('searchQuery');
const locationName = document.getElementById('locationName');
const weatherData = document.getElementById('conditionData');
const weatherImg = document.getElementById('weatherImg');
const tempDataF = document.getElementById('tempDataF');
const tempDataC = document.getElementById('tempDataC');
const windDataUS = document.getElementById('windDataUS');
const windDataEU = document.getElementById('windDataEU');
const errorTip = document.getElementById('errorTip');

tempDataC.style.display = 'none';
windDataEU.style.display = 'none';
tempDataF.style.display = 'block';
windDataUS.style.display = 'block';
errorTip.style.display = 'none';

async function getLocation() {
    errorTip.style.display = 'none';

    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchQueryElement.value}&aqi=no
    `,
        { mode: 'cors' }
    );
    if (!response.ok) {
        errorTip.style.display = 'block';
        return;
    }
    const data = await response.json();
    console.log(data);
    const location = data.location.name;
    const iconCode = data.current.condition.icon.split('/').pop();
    const weather = data.current.condition.text;
    const temperatureF = data.current.temp_f;
    const temperatureC = data.current.temp_c;

    const windSpeedUS = data.current.wind_mph;
    const windSpeedEU = data.current.wind_kph;

    locationName.innerText = location;
    weatherImg.src = `assets/${iconCode}`;
    weatherData.innerText = weather;
    tempDataF.innerText = temperatureF +'° F';
    tempDataC.innerText = temperatureC +'° C';
    windDataUS.innerText = windSpeedUS + ' MPH';
    windDataEU.innerText = windSpeedEU + ' KPH';

    tempDataC.style.display = 'none';
    windDataEU.style.display = 'none';
    tempDataF.style.display = 'block';
    windDataUS.style.display = 'block';
}

document.getElementById('mode').addEventListener('change', (event) => {
    const isChecked = event.target.checked;

    tempDataF.style.display = isChecked ? 'none' : 'block';
    windDataUS.style.display = isChecked ? 'none' : 'block';
    tempDataC.style.display = isChecked ? 'block' : 'none';
    windDataEU.style.display = isChecked ? 'block' : 'none';
});

document.getElementById('searchQuery').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getLocation();
        event.preventDefault();
    }
});
