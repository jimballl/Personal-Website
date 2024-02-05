function fetchStockData(symbol) {
    fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&outputsize=1&apikey=0e09059a18f449fdb80eea4352472ea4`)
        .then(response => response.json())
        .then(data => {
            const high = parseFloat(data.values[0].high).toFixed(2);
            const low = parseFloat(data.values[0].low).toFixed(2);

            const previousHigh = localStorage.getItem(`${symbol}High`);
            const previousLow = localStorage.getItem(`${symbol}Low`);

            // Determine the color based on the comparison of new and previous values
            let color = '';
            if (previousHigh && previousLow) {
                if (high > previousHigh || low < previousLow) {
                    color = 'green';
                } else if (high < previousHigh || low > previousLow) {
                    color = 'red';
                }
            }
            
            
            // Store the current color, high and low values in localStorage
            localStorage.setItem(`${symbol}High`, high);
            localStorage.setItem(`${symbol}Low`, low);
            localStorage.setItem(`${symbol}Color`, color);

            document.getElementById('stockInfo').innerHTML += `<strong>${symbol}</strong><br>high= ${high}, low= ${low}<br>`;
            document.getElementById('stockInfo').style.color = color;
        })
        document.getElementById('stockInfo').innerHTML = `Error: ${error.message}`;
}

const symbols = ['QQQ', 'AAPL', 'MSFT'];

symbols.forEach((symbol, index) => {
    // If the current symbol is the first one in the array, clear the innerHTML
    if (index === 0) {
        document.getElementById('stockInfo').innerHTML = '';
    }
    // Retrieve the previous high and low values from localStorage
    const previousHigh = localStorage.getItem(`${symbol}High`);
    const previousLow = localStorage.getItem(`${symbol}Low`);
    const previousColor = localStorage.getItem(`${symbol}Color`)? localStorage.getItem(`${symbol}Color`): 'black';

    if (previousHigh && previousLow) {
        // If previous high and low values exist in localStorage, display them
        document.getElementById('stockInfo').innerHTML += `<strong>${symbol}</strong><br>high= ${previousHigh}, low= ${previousLow}<br>`;
        document.getElementById('stockInfo').style.color = previousColor;
    } else {
        fetchStockData(symbol);
    }

    // Fetch stock data every _ minutes
    setInterval(() => fetchStockData(symbol), 3600000);
});