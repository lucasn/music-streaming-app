const ctx = document.getElementById('gender-chart');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Homem', 'Mulher', 'Não-Binário'],
        datasets: [{
            data: [46, 49, 7],
            borderWidth: 0,
            backgroundColor: ['#3432A5', '#6B58A2', '#B74FA0']
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'white',
                    font: {
                        size: 10
                    }
                }
            }
        },
        cutout: '80%'
    }
    
});