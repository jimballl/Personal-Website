fetch('https://api.weatherapi.com/v1/current.json?key=3dae079290ce4dd2be630806240502&q=Boston')
    .then(response => response.json())
    .then(data => {
        const temperature = data.current.temp_f;
        const condition = data.current.condition.text;
        const isDay = data.current.is_day;

        let imageLoc;
        let imageMap = {
            'Clear': '/weather-images/sunny.png',
            'Cloudy': '/weather-images/cloudy.png',
            'Partly cloudy': '/weather-images/cloudy.png',
            'Overcast': '/weather-images/overcast.png',
            'Rain': '/weather-images/rain.png',
            'Snow': '/weather-images/snow.png'
        };

        if (isDay === 0) {
            imageLoc = '/weather-images/moon.png';
        } else {
            imageLoc = imageMap[condition] || '/weather-images/default.png';
        }

        document.getElementById('weatherData').innerHTML += `Temperature in Boston: ${temperature}°F<br>`;
        document.getElementById('weatherData').innerHTML += `Conditions in Boston: ${condition}<br>`;
        document.getElementById('weatherData').innerHTML += `<img src="${imageLoc}" width="15%" height="15%">`;    })
    .catch(error => {
        document.getElementById('weatherData').innerHTML = `Error: ${error.message}`;
    });