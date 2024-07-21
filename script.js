document.addEventListener('DOMContentLoaded', function() {
    // Fetch COVID-19 data
    fetch('https://api.covid19api.com/summary')
        .then(response => response.json())
        .then(data => {
            const labels = data.Countries.map(country => country.Country);
            const cases = data.Countries.map(country => country.TotalConfirmed);
            
            const ctx = document.getElementById('covidChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Confirmed COVID-19 Cases',
                        data: cases,
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
    const map = L.map('map').setView([51.505, -0.09], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const cities = ['London', 'New York', 'Tokyo', 'Sydney'];
    cities.forEach(city => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`)
            .then(response => response.json())
            .then(data => {
                const marker = L.marker([data.coord.lat, data.coord.lon]).addTo(map);
                marker.bindPopup(`<b>${city}</b><br>Temperature: ${data.main.temp}K`);
            });
    });
});
