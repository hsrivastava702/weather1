// Get the elements from the HTML
var inputval = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var icon = document.querySelector('#weather-icon');

var apik = "2b86887e1b30b49f794e935b352ada69";

// Kelvin to Celsius conversion
function convertion(val) {
  return (val - 273).toFixed(2);
}

// Fetch weather data and display
btn.addEventListener('click', function() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputval.value + '&appid=' + apik)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        var nameval = data.name;
        var descrip = data.weather[0].description;
        var tempature = data.main.temp;
        var wndspd = data.wind.speed;
        var iconCode = data.weather[0].icon;

        city.textContent = `City: ${nameval}`;
        temp.textContent = `Temperature: ${convertion(tempature)} °C`;
        description.textContent = `Conditions: ${descrip}`;
        wind.textContent = `Wind Speed: ${wndspd} km/h`;
        // Update weather icon
        var iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        icon.src = iconUrl;
        icon.alt = 'Weather Icon';
      } 
      
      else {
        city.textContent = 'City not found';
        temp.textContent = '';
        description.textContent = '';
        wind.textContent = '';
        icon.src = '';
        icon.alt = '';
      }
    })
    .catch(err => alert('There was an error fetching weather data'));
});
