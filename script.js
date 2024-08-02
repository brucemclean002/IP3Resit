document.addEventListener('DOMContentLoaded', function() {
    // Fetch COVID-19 data
    fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
            const top10Countries = data.sort((a, b) => b.cases - a.cases).slice(0, 10);
            const labels = top10Countries.map(country => country.country);
            const cases = top10Countries.map(country => country.cases);
            
            const ctx = document.getElementById('covidChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total COVID-19 Cases',
                        data: cases,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });

    // Fetch weather data for map
    const map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const cities = ['London', 'New York', 'Tokyo', 'Sydney'];
    const apiKey = '99a8a3e7348687124a0143956396cef5';

    cities.forEach(city => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const marker = L.marker([data.coord.lat, data.coord.lon]).addTo(map);
                marker.bindPopup(`<b>${city}</b><br>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C`);
            });
    });
});

