var canvas = document.getElementById("canvasGenres");

// Apply multiply blend when drawing datasets
var multiply = {
  beforeDatasetsDraw: function(chart, options, el) {
    chart.ctx.globalCompositeOperation = 'multiply';
  },
  afterDatasetsDraw: function(chart, options) {
    chart.ctx.globalCompositeOperation = 'source-over';
  },
};

// Gradient color - 2010 to  2020
var gradientThisWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
gradientThisWeek.addColorStop(0, '#5555FF');
gradientThisWeek.addColorStop(1, '#9787FF');

// Gradient color - 1990 to 2000
var gradientPrevWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
gradientPrevWeek.addColorStop(0, '#FF55B8');
gradientPrevWeek.addColorStop(1, '#FF8787');


var config = {
    type: 'line',
    data: {
        labels:['Animation', 'Adventure', 'Romance', 'Comedy', 'Action', 'Family','History', 'Drama', 'Crime', 'Fantasy', 'Science Fiction','Thriller', 'Music', 'Horror', 'Documentary', 'Mystery', 'Western','War', 'TV Movie', 'Foreign'],
        datasets: [
          {
              label: 'This week',
              data: [364, 418, 408, 2346, 1313, 230, 119, 3965, 372, 170, 192, 913, 95, 833, 1460, 176, 42, 103, 121, 21],
              backgroundColor: gradientThisWeek,
              borderColor: 'transparent',
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: '#FFFFFF',
              lineTension: 0.40,
          },
          {
              label: 'Previous week',
              data: [152, 252, 210, 1295, 798, 69, 48, 1891, 212, 147, 106, 202, 53, 260, 228, 70, 26, 43, 79, 13],
              backgroundColor: gradientPrevWeek,
              borderColor: 'transparent',
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: '#FFFFFF',
              lineTension: 0.40,
          }
          ]
        },
    options: {
        elements: { 
          point: {
            radius: 0,
            hitRadius: 5, 
            hoverRadius: 5 
          } 
        },
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                display: false,
            }],
            yAxes: [{
                display: false,
                ticks: {
                  beginAtZero: true,
                },
            }]
        }
    },
    plugins: [multiply],
};

window.chart = new Chart(canvas, config);