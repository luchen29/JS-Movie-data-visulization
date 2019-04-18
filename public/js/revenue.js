var ctx = document.getElementById("canvasRevenue");
// create the dataset for ploting
var data = {
    datasets: [{
        data: [
            44.4,
            90.7,
            64.2,
            15.0,
            51.8,
            51.2,
            17.3,
            17.7,
            50.3,
            19.1
        ],
        backgroundColor: [
            "#e04e5c",
            "#f9923b",
            "#fcb844",
            "#ffc107",
            "#dfe271",
            "#b2ce67",
            "#86ce67",
            "#28a745",
            "#20c997",
            "#4be5c1"
        ],
        label: 'My dataset'
    }],
    labels: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Family",
        "Fantasy",
        "History",
        "Romance",
        "Sci-Fi",
        "Thriller"
    ]
};
var myChart = new Chart(ctx,{
    data: data,
    type: 'polarArea'
});

