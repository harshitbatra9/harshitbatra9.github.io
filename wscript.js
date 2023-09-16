const api = {
    key: "ec58e4a9d54b7e7309746e98f0835185",
    base: "https://api.openweathermap.org/data/2.5/"
}

window.onload=getResults("jamnagar");


var city;
function getCoordintes() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	function success(pos) {
		var crd = pos.coords;
		var lat = crd.latitude.toString();
		var lng = crd.longitude.toString();
		var coordinates = [lat, lng];
		console.log(`Latitude: ${lat}, Longitude: ${lng}`);
		getCity(coordinates);
		return;

	}
	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
    call2("jamnagar");
    
  }

	navigator.geolocation.getCurrentPosition(success, error, options);
}
function displayError(message) {
  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.innerText = message;
  errorMessageElement.style.display = 'block'; // Show the error message
}

function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng =coordinates[1];
  
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.8605d539db394b8f3d1e4c8186edecf8&lat=" +lat + "&lon=" + lng + "&format=json", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        city3 = response.address;
        console.log(city3);
        var district = city3.city || city3.town || city3.village;
        if (district) {
            city = district;
            call2(city);
        } else {
            // District not found, use state
            city = city3.state;
            call2(city);
        }
    }
}
}

getCoordintes();
function call2(city){
  window.onload=getResults(city);
}
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  function getResults(query) {
    // Clear any previous error messages
    clearError();
  
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then((data) => {
        if (data.cod === '404') {
          // City not found, display an error message
          displayError('City not found. Please check the city name and try again.');
        } else {
          // City found, display weather data
          displayResults(data);
        }
      })
      .catch((error) => {
        // Handle other errors, e.g., network issues
        displayError('An error occurred while fetching weather data. Please try again later.');
      });
  }
  
  function clearError() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerText = ''; // Clear the error message
    errorMessageElement.style.display = 'none'; // Hide the error message
  }
  const imageUrls = [
    'clear.jpg',
    'clouds.jpg',
    'clouds2.jpg',
    'clouds3.jpg',
    'thunderstorm2.jpg',
    'rain.jpg',
    'snow.jpg',
    'haze.jpg',
    'fog.jpg',
    // Add URLs for other background images here
];
const preloadedImages = [];

imageUrls.forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
    preloadedImages.push(img);
});
  
  
function displayResults(weather) {
  console.log(weather);

  // Map weather conditions to background image URLs
  const backgroundImageUrls = {
      'Clear': 'clear.jpg',
      'Clouds': weather.clouds.all > 90 ? 'clouds3.jpg' : (weather.clouds.all > 70 ? 'clouds2.jpg' : 'clouds.jpg'),
      'Thunderstorm': 'thunderstorm2.jpg',
      'Drizzle': 'rain.jpg',
      'Rain': 'rain.jpg',
      'Snow': 'snow.jpg',
      'Haze': 'haze.jpg',
      'Fog': 'fog.jpg',
      'Mist': 'fog.jpg',
  };

  // Get the background image URL based on weather condition
  const backgroundUrl = backgroundImageUrls[weather.weather[0].main];

  // Set the background image using the preloaded image
  document.body.style.backgroundImage = `url('${backgroundUrl}')`;

  // ... Rest of your code to display weather information


    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    const word = weather.weather[0].description

    const capitalized =word.charAt(0).toUpperCase()+ word.slice(1)
    weather_el.innerText = capitalized;

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
    //const x=weather.sys.country
    //console.log(x)
    //if(x==='IN'){
      
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
  
    