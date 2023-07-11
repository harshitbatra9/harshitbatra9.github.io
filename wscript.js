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
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}
function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates[0];
	var lng = coordinates[1];
  
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.8605d539db394b8f3d1e4c8186edecf8&lat=" +lat + "&lon=" + lng + "&format=json", true);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
      
			city = response.address;
      console.log(city)
      if (city=== undefined) {
        city = response.address.municipality;
        call2(city);
      }
			else if(city=== undefined){
      city = response.address.city;
      
      call2(city);}
      else{
        city=response.address.state_district;
      }
			return;
		}
  }}

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
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    console.log(weather);
    console.log(weather.sys.sunrise);
    console.log(weather.wind.speed);
    console.log(weather.wind.gust);
    if(weather.weather[0].main=='Clear'){
        document.body.style.backgroundImage = "url('clear.jpg')";
        }
    else if(weather.weather[0].main=='Clouds'){
            document.body.style.backgroundImage = "url('clouds.jpg')";
            }
    else if(weather.weather[0].main=='Thunderstorm'){
    document.body.style.backgroundImage = "url('thunderstorm.jpg')";
    }
    else if(weather.weather[0].main=='Drizzle'){
        document.body.style.backgroundImage = "url('rain.jpg')";
        }
    else if(weather.weather[0].main=='Rain'){
        document.body.style.backgroundImage = "url('rain.jpg')";
         }
    else if(weather.weather[0].main=='Snow'){
            document.body.style.backgroundImage = "url('snow.jpg')";
            }
    else if(weather.weather[0].main=='Haze'){
            document.body.style.backgroundImage = "url('haze.jpg')";
            }

    else{
        document.body.style.backgroundImage = "url('fog.jpg')";
    }
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

    
    
    let feel=document.querySelector('.current .feelslike');
    feel.innerText=`Feels like ${Math.round(weather.main.feels_like)}°c`;
    let hum=document.querySelector('.current .humidity');
    hum.innerText=`Humidity : ${Math.round(weather.main.humidity)}%`;

    let weather_cloud = document.querySelector('.current .cloudcover');
    weather_cloud.innerText =` Cloud Cover : ${weather.clouds.all}%`;
    console.log(weather.wind.deg)
    
    let windspeed = document.querySelector('.current .winds');
    windspeed.innerText =` Wind Speed : ${Math.round(weather.wind.speed*3.6)}km/h ${getCardinalDirection(weather.wind.deg)} \n (Gust Speed :${Math.round(weather.wind.gust*3.6)}km/h)`;
    const x=weather.sys.country
    //if(x==="IN"){
    var timestamp=weather.sys.sunrise
    timestamp=timestamp*1000;
    date2 = new Date(timestamp);
    console.log(date2)
    let sunrise = document.querySelector('.current .sunrise');
    sunrise.innerText =` Sunrise Time : ${date2.getHours()}:${date2.getMinutes()}`;
    
    var timestamp=weather.sys.sunset
    timestamp=timestamp*1000;
    date2 = new Date(timestamp);
    let sunset = document.querySelector('.current .sunset');
    sunset.innerText =` Sunset Time : ${date2.getHours()}:${date2.getMinutes()}`;
    //}
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
