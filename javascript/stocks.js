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

Promise.all(symbols.map(symbol => {
    return new Promise((resolve, reject) => {
        const previousHigh = localStorage.getItem(`${symbol}High`);
        const previousLow = localStorage.getItem(`${symbol}Low`);
        const previousColor = localStorage.getItem(`${symbol}Color`);

        if (previousHigh && previousLow) {
            resolve({ symbol, high: previousHigh, low: previousLow, color: previousColor });
        } else {
            fetchStockData(symbol)
                .then(data => resolve(data))
                .catch(error => {
                    console.error(`Error fetching data for ${symbol}: ${error}`);
                    resolve(null);  // Resolve with null to prevent Promise.all from rejecting
                });
        }
    });
}))
.then(results => {
    const stockInfo = document.getElementById('stockInfo');
    stockInfo.innerHTML = '';
    results.forEach(result => {
        if (result) {  // Check if result is not null
            const { symbol, high, low, color } = result;
            const symbolElement = document.createElement('div');
            symbolElement.innerHTML = `<strong>${symbol}</strong><br>high= ${high}, low= ${low}<br>`;
            symbolElement.style.color = color;
            stockInfo.appendChild(symbolElement);
        }
    });
})
.catch(error => console.error(`Error in Promise.all: ${error}`));