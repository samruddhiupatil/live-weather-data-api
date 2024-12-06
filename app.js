document.getElementById('weather').addEventListener('submit', function(event)
{
    event.preventDefault();
    const city = document.getElementById('city').value;
    getCoordinatesOfCity(city);
});

function getCoordinatesOfCity(city){
    const geoUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', geoUrl, true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            const data = JSON.parse(xhr.responseText);
            if(data.length==0){
                document.getElementById('result').innerHTML = `<p class = error> City Not Found </p>`;
                return;
            }
            const {lat, lon} = data[0];
            getWeather(lat,lon);
        }
        else if(xhr.readyState==4){
            document.getElementById('result').innerHTML = `<p class = error> unable to fetch the coordinates </p>`;
        }
    };
    xhr.send();
}

function getWeather(lat, lon){
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', weatherUrl, true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            const data = JSON.parse(xhr.responseText);

            if(data.length==0){
                document.getElementById('result').innerHTML = `<p class ='error'> No city found </p>`;
            }
            else{
                const weather = data.current_weather;
                document.getElementById('result').innerHTML =` <h2>Current Weather</h2>
                 <p>Temperature: ${weather.temperature} °C</p>
                  <p>Windspeed: ${weather.windspeed} km/h</p>
                   <p>Condition Code: ${weather.weathercode}</p>`;
            }
        }
        else if(xhr.readyState==4){
            document.getElementById('result').innerHTML = `<p class="error">Unable to fetch weather data</p>`;
        }
    };
    xhr.send();
}