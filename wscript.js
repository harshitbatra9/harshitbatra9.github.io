const api = {
  key: "ec58e4a9d54b7e7309746e98f0835185",
  base: "https://api.openweathermap.org/data/2.5/"
}

window.onload=getResults2("jamnagar");

getCoordintes();
const imageObjects = [];
const imageUrls2 = ['rain1.png', 'rain2.png', 'cloud1.png', 'cloud2.png', 'snow.png', 'wind.png'];
function preloadImages(urls) {
  for (const url of urls) {
    const img = new Image();
    img.src = url;
    imageObjects.push(img);
  }
}
preloadImages(imageUrls2);

var city;
function getCoordintes() {
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};  function success(pos) {
  var crd = pos.coords;
  var lat = crd.latitude.toString();
  var lon = crd.longitude.toString();

  window.lat = lat;
  window.lon = lon;
  getResults(lat, lon);
  
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    
    showHourlyWeatherForCity("jamnagar", 'today');
    searchbox.value='jamnagar';
}

navigator.geolocation.getCurrentPosition(success, error, options);
}
function getResults(lat, lon) {

clearError();
fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
    .then((weather) => {
        return weather.json();
    })
    .then((data) => {
        if (data.cod === '404') {
      
            displayError('City not found. Please check the city name and try again.');
        } else {
            
            displayResults(data);
            showHourlyWeather('today');
        }
    })
    
}

function displayError(message) {
const errorMessageElement = document.getElementById('error-message');
errorMessageElement.innerText = message;
errorMessageElement.style.display = 'block'; 
}

function call2(city){
window.onload=getResults2(city);
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults2(searchbox.value);
    
  }
}
function getResults2(query) {
  clearError();

  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then((data) => {
      if (data.cod === '404') {
        
        displayError('City not found. Please check the city name and try again.');
      } else {
        
        displayResults(data);
        showHourlyWeatherForCity(query, 'today');
      }
    })
    .catch((error) => {
   
      displayError('An error occurred eather data. Please try again later.');
    });
}




function clearError() {
  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.innerText = ''; 
  errorMessageElement.style.display = 'none'; 
}
const imageUrls = [
  'clear.jpg',
  'clouds.jpg',
  'clouds2.jpg',
  'clouds3.jpg',
  'thunderstorm2.jpg',
  'rain1.jpg',
  'snow.jpg',
  'haze.jpg',
  'fog.jpg',
 
];
const preloadedImages = [];

imageUrls.forEach((imageUrl) => {
  const img = new Image();
  img.src = imageUrl;
  preloadedImages.push(img);
});


function displayResults(weather) {
console.log(weather);

const backgroundImageUrls = {
    'Clear': 'clear.jpg',
    'Clouds': weather.clouds.all > 90 ? 'clouds3.jpg' : (weather.clouds.all > 70 ? 'clouds2.jpg' : 'clouds.jpg'),
    'Thunderstorm': 'thunderstorm2.jpg',
    'Drizzle': 'rain1.jpg',
    'Rain': 'rain1.jpg',
    'Snow': 'snow.jpg',
    'Haze': 'haze.jpg',
    'Fog': 'fog.jpg',
    'Mist': 'fog.jpg',
};
const backgroundUrl = backgroundImageUrls[weather.weather[0].main];

document.body.style.backgroundImage = `url('${backgroundUrl}')`;



  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);


  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather span');
  const word = weather.weather[0].description

  const capitalized =word.charAt(0).toUpperCase()+ word.slice(1)
  weather_el.innerText  =`${capitalized}`;

  /*if(weather.weather[0].main=='Rain'){
    let temp2 = document.querySelector('.current .rain');
  temp2.innerHTML = `${(weather.rain.1h)}<span>mm in 1h</span>`;
     }*/
     if (weather.rain && weather.rain['1h']){
      const totalRainfallToday = weather.rain['1h'];
      let rainfallElement = document.querySelector('.current .rainfall2');
      rainfallElement.innerText = `Total Rain in last 1 Hour: ${totalRainfallToday} mm`;
    }
    else{
      let rainfallElement = document.querySelector('.current .rainfall2');
      rainfallElement.innerText = ``;
    }
    
  let feel=document.querySelector('.current .feelslike');
  feel.innerText=`Feels like ${Math.round(weather.main.feels_like)}°c`;
  let hum=document.querySelector('.current .humidity');
  hum.innerText=`Humidity : ${Math.round(weather.main.humidity)}%`;

  let weather_cloud = document.querySelector('.current .cloudcover');
  weather_cloud.innerText =` Cloud Cover : ${weather.clouds.all}%`;
  
  let change=document.querySelector('.current .change');
  change.innerText=`(Wind Direction: ${weather.wind.deg}°)`;
  let windspeed = document.querySelector('.current .winds');
  if(weather.wind.gust>0)
  windspeed.innerText =` Wind Speed : ${Math.round(weather.wind.speed*3.6)}km/h ${getCardinalDirection(weather.wind.deg)} \n (Gust Speed :${Math.round(weather.wind.gust*3.6)}km/h)`;
  else
  windspeed.innerText =` Wind Speed : ${Math.round(weather.wind.speed*3.6)}km/h ${getCardinalDirection(weather.wind.deg)}`;

  var timestamp=weather.sys.sunrise
  timestamp=timestamp-19800+weather.timezone
  timestamp=timestamp*1000;
  
  var date2 = new Date(timestamp);
  let sunrise = document.querySelector('.current .sunrise');
  if(date2.getMinutes()<10){
    var y='0'+date2.getMinutes();}
    else
    y=date2.getMinutes();
  sunrise.innerText =` Sunrise Time : ${date2.getHours()}:${y} `;
  
  var timestamp=weather.sys.sunset
  timestamp=timestamp-19800+weather.timezone
  var date4=new Date(weather.timezone)
  
  hrs=Math.floor(date4/3600);
  min2=date4%3600;
  min2=min2/60;
  console.log(hrs)
  console.log(min2)
  if(min2==0)
  min2='0'+min2;
  if(hrs>=0)
  hrs='+'+hrs
  timestamp=timestamp*1000;
  date2 = new Date(timestamp);
  let sunset = document.querySelector('.current .sunset');
  if(date2.getMinutes()<10){
  var y='0'+date2.getMinutes();}
  else
  y=date2.getMinutes();
  sunset.innerText =` Sunset Time : ${date2.getHours()}:${y} \n(GMT ${hrs}:${min2})`;
  
  
}
function getCardinalDirection(angle) {
  const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
  return directions[Math.round(angle / 45) % 8];
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  
  return `${day} ${date} ${month} ${year} `;
  
}
const todayButton = document.getElementById('today-button');
const tomorrowButton = document.getElementById('tomorrow-button');
const dayAfterButton = document.getElementById('day-after-button');
const dayAfterTomorrowButton = document.getElementById('day-after-tomorrow-button');

function formatDateToDdMm(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  return `${day}/${month}`;
}

const today = new Date();
const dayAfterDate = new Date(today.getTime() + 2*24 * 60 * 60 * 1000);
const dayAfterTomorrowDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

// Update the button text directly
dayAfterButton.textContent = ` ${formatDateToDdMm(dayAfterDate)}`;
dayAfterTomorrowButton.textContent = `${formatDateToDdMm(dayAfterTomorrowDate)}`;


todayButton.addEventListener('click', () => {
  if (searchbox.value) {
    showHourlyWeatherForCity(searchbox.value, 'today');
  } else {
    showHourlyWeather('today');
  }
});

tomorrowButton.addEventListener('click', () => {
  if (searchbox.value) {
    showHourlyWeatherForCity(searchbox.value, 'tomorrow');
  } else {
    showHourlyWeather('tomorrow');
  }
});

dayAfterButton.addEventListener('click', () => {
  if (searchbox.value) {
    showHourlyWeatherForCity(searchbox.value, 'dayAfter');
  } else {
    showHourlyWeather('dayAfter');
  }
});

dayAfterTomorrowButton.addEventListener('click', () => {
  if (searchbox.value) {
    showHourlyWeatherForCity(searchbox.value, 'dayAfterTomorrow');
  } else {
    showHourlyWeather('dayAfterTomorrow');
  }
});


function showHourlyWeatherForCity(city, day) {
  

  const forecastUrl = `${api.base}forecast?q=${city}&units=metric&APPID=${api.key}`;

  fetch(forecastUrl)
  .then((response) => response.json())
  .then((data) => {
    const cityTimeZoneOffset = data.city.timezone;
    const adjustedHourlyData = adjustTimestamps(data.list, cityTimeZoneOffset);

    const hourlyData = filterHourlyData(adjustedHourlyData, day);

    displayHourlyWeather(hourlyData);
  })
  .catch((error) => {
    console.error(error);
  });
}
function showHourlyWeather(day) {
  const forecastUrl = `${api.base}forecast?lat=${window.lat}&lon=${window.lon}&units=metric&APPID=${api.key}`;
  
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      const cityTimeZoneOffset = data.city.timezone;
      const adjustedHourlyData = adjustTimestamps(data.list, cityTimeZoneOffset);

      const hourlyData = filterHourlyData(adjustedHourlyData, day);
      
      displayHourlyWeather(hourlyData);
    })
    .catch((error) => {
      console.error(error);
    });
}
function adjustTimestamps(hourlyData, timeZoneOffset) {
  return hourlyData.map((entry) => {
    
    var adjustedTimestamp = entry.dt - 19800 + timeZoneOffset;
    
    adjustedTimestamp=new Date(adjustedTimestamp);
    
    entry.dt = adjustedTimestamp;
    return entry;
  });
}

function filterHourlyData(hourlyData, day) {
  const now = new Date();
  
  const filteredData = [];

  for (const entry of hourlyData) {
    const entryDate = new Date(entry.dt * 1000);
    if (isSameDay(entryDate, now, day)) {
      filteredData.push(entry);
    }
  }

  return filteredData;
}

function isSameDay(date1, date2, day) {
  if (day === 'today') {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  } else if (day === 'tomorrow') {
    const tomorrow = new Date(date2.getTime() + 24 * 60 * 60 * 1000);
    return (
      date1.getFullYear() === tomorrow.getFullYear() &&
      date1.getMonth() === tomorrow.getMonth() &&
      date1.getDate() === tomorrow.getDate()
    );
  } else if (day === 'dayAfter') {
    const dayAfter = new Date(date2.getTime() + 2 * 24 * 60 * 60 * 1000);
    return (
      date1.getFullYear() === dayAfter.getFullYear() &&
      date1.getMonth() === dayAfter.getMonth() &&
      date1.getDate() === dayAfter.getDate()
    );
  }
  else if (day === 'dayAfterTomorrow') {
    const dayAfterTomorrow = new Date(date2.getTime() + 3 * 24 * 60 * 60 * 1000);
    return (
      date1.getFullYear() === dayAfterTomorrow.getFullYear() &&
      date1.getMonth() === dayAfterTomorrow.getMonth() &&
      date1.getDate() === dayAfterTomorrow.getDate()
    );
  }

  return false;
}
function displayHourlyWeather(hourlyData) {
  const hourlyWeatherContainer = document.getElementById('hourly-weather');
  hourlyWeatherContainer.innerHTML = '';

  hourlyData.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const hour = date.getHours();
    const snowVolume = entry.snow ? entry.snow['3h'] || 0 : 0;
    const temperature = entry.main.temp;
    const description = entry.weather[0].description;
    const rainVolume = entry.rain ? entry.rain['3h'] || 0 : 0; 

    const hourlyWeatherItem = document.createElement('div');
    hourlyWeatherItem.classList.add('hourly-data');

    const hourElement = document.createElement('div');
    hourElement.classList.add('hour');
    hourElement.textContent = `${hour}:00`;
    const temperatureElement = document.createElement('div');
    temperatureElement.classList.add('temperature');
    temperatureElement.textContent = `${Math.round(temperature)}°C`;

    


    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('description');
    const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    descriptionElement.textContent = capitalizedDescription;
    
    const weatherIconElement = document.createElement('img');
    weatherIconElement.classList.add('weather-icon');
    if (description.includes('rain')) {
      const rainVolume = entry.rain ? entry.rain['3h'] || 0 : 0;
      if (rainVolume < 5) {
        weatherIconElement.src = 'rain1.png';
      } else {
        weatherIconElement.src = 'rain.png';
      }
    } else if (description.includes('clear')) {
      weatherIconElement.src = 'sun.png';
    } else if (description.includes('clouds')) {
      const cloudCover = entry.clouds ? entry.clouds.all || 0 : 0;
      if (cloudCover < 70) {
        weatherIconElement.src = 'cloud1.png';
      } else {
        weatherIconElement.src = 'cloud.png';
      }}else if (description.includes('snow')) {
      weatherIconElement.src = 'snow.png';
    } else {
      weatherIconElement.src = 'sun.png'; 
    }
    var windSpeed = entry.wind ? entry.wind.speed || 0 : 0;
    
    hourlyWeatherItem.appendChild(hourElement);
    hourlyWeatherItem.appendChild(temperatureElement);
    hourlyWeatherItem.appendChild(weatherIconElement);
    hourlyWeatherItem.appendChild(descriptionElement);
    if (rainVolume > 0) { 
      const rainElement = document.createElement('div');
      rainElement.classList.add('rain');
      rainElement.textContent = `Rain: ${rainVolume} mm`; 
      rainElement.style.fontSize = '11px';
      hourlyWeatherItem.appendChild(rainElement); 
    }
    if (snowVolume > 0) { 
      const snowElement = document.createElement('div');
      snowElement.classList.add('Snow');
      snowElement.textContent = `Snow: ${snowVolume} mm`; 
      snowElement.style.fontSize = '11px'
      hourlyWeatherItem.appendChild(snowElement); 
    }
    if (windSpeed > 8.33) {
      const windIconElement = document.createElement('img');
      weatherIconElement.src = 'wind.png';
      const windElement = document.createElement('div');
      windElement.classList.add('wind');
      windElement.textContent = `Wind: ${Math.round(windSpeed*3.6)}kmph`; 
      windElement.style.fontSize = '10px';
      hourlyWeatherItem.appendChild(windElement); 
    }
    hourlyWeatherContainer.appendChild(hourlyWeatherItem);

  });

  hourlyWeatherContainer.classList.remove('hidden');
}

const hourlyWeatherContainer = document.getElementById('hourly-weather');
hourlyWeatherContainer.classList.add('hidden');

