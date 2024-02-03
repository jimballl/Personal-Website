function fetchStockData(symbol) {
    fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&outputsize=1&apikey=0e09059a18f449fdb80eea4352472ea4`)
        .then(response => response.json())
        .then(data => {
            const high = parseFloat(data.values[0].high).toFixed(2);
            const low = parseFloat(data.values[0].low).toFixed(2);
            
            // Store the current high and low values in localStorage
            localStorage.setItem(`${symbol}High`, high);
            localStorage.setItem(`${symbol}Low`, low);

            document.getElementById('stockInfo').innerHTML += `<strong>${symbol}</strong><br>high= ${high}, low= ${low}<br>`;
        })
        .catch(error => console.error('Error:', error));
}

const symbols = ['QQQ', 'AAPL', 'MSFT'];

symbols.forEach(symbol => {
    // Retrieve the previous high and low values from localStorage
    const previousHigh = localStorage.getItem(`${symbol}High`);
    const previousLow = localStorage.getItem(`${symbol}Low`);

    if (previousHigh && previousLow) {
        // If previous high and low values exist in localStorage, display them
        document.getElementById('stockInfo').innerHTML += `<strong>${symbol}</strong><br>high= ${previousHigh}, low= ${previousLow}<br>`;
    } else {
        fetchStockData(symbol);
    }

    // Fetch stock data every hour
    setInterval(() => fetchStockData(symbol), 3600000); // 3600000 milliseconds = 1 hour
});