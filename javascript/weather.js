fetch(`https://api.weatherapi.com/v1/current.json?key=3dae079290ce4dd2be630806240502&q=auto:ip&nocache=${new Date().getTime()}`)    
    .then(response => response.json())
    .then(data => {
        // Extracting the relevant data from the JSON object
        const temperature = data.current.temp_f;
        const condition = data.current.condition.text;
        const isDay = data.current.is_day;

        let imageLoc;
        let imageMap = {
            'Clear': '/weather-images/sunny.png',
            'Sunny' : '/weather-images/sunny.png',
            'Cloudy': '/weather-images/cloudy.png',
            'Partly cloudy': '/weather-images/cloudy.png',
            'Overcast': '/weather-images/overcast.png',
            'Rain': '/weather-images/rain.png',
            'Light rain': '/weather-images/light-rain.png',
            'Snow': '/weather-images/snow.png',
            'Mist': '/weather-images/mist.png',
        };

        // Setting the image based on the weather condition
        if (isDay === 0) {
            imageLoc = '/weather-images/moon.png';
        } else {
            imageLoc = imageMap[condition] || '/weather-images/cloudy.png';
        }
        var h2Element = document.querySelector('#weatherHeader');
        h2Element.innerHTML = `Local Weather`;
        document.getElementById('weatherData').innerHTML += `Temperature: ${temperature}°F<br>`;
        document.getElementById('weatherData').innerHTML += `Conditions: ${condition}<br>`;
        document.getElementById('weatherData').innerHTML += `<img src="${imageLoc}" width="15%" height="15%">`;    })
    .catch(error => {
        document.getElementById('weatherData').innerHTML = `Error: ${error.message}`;
    });