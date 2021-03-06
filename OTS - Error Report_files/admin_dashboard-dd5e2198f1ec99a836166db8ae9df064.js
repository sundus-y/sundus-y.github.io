$(function () {
    // -----------------------
    // - MONTHLY SALES CHART -
    // -----------------------
    function drawSalesChart(data){
        // Get context with jQuery - using jQuery's .get() method.
        var salesChartCanvas = $('#salesChart').get(0).getContext('2d');
        // This will get the first returned node in the jQuery collection.
        var salesChart = new Chart(salesChartCanvas);

        var salesChartData = {
            labels: data['dates'],
            datasets: [
                {
                    label: 'Monthly Sales',
                    fillColor: 'rgb(210, 214, 222)',
                    strokeColor: 'rgb(210, 214, 222)',
                    pointColor: 'rgb(210, 214, 222)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgb(220,220,220)',
                    data: data['sales_data']
                }
            ]
        };

        var salesChartOptions = {
            // Boolean - If we should show the scale at all
            showScale               : true,
            // Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines      : false,
            // String - Colour of the grid lines
            scaleGridLineColor      : 'rgba(0,0,0,.05)',
            // Number - Width of the grid lines
            scaleGridLineWidth      : 1,
            // Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,
            // Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines  : true,
            // Boolean - Whether the line is curved between points
            bezierCurve             : true,
            // Number - Tension of the bezier curve between points
            bezierCurveTension      : 0.3,
            // Boolean - Whether to show a dot for each point
            pointDot                : true,
            // Number - Radius of each point dot in pixels
            pointDotRadius          : 4,
            // Number - Pixel width of point dot stroke
            pointDotStrokeWidth     : 1,
            // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,
            // Boolean - Whether to show a stroke for datasets
            datasetStroke           : true,
            // Number - Pixel width of dataset stroke
            datasetStrokeWidth      : 2,
            // Boolean - Whether to fill the dataset with a color
            datasetFill             : false,
            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio     : true,
            // Boolean - whether to make the chart responsive to window resizing
            responsive              : true
        };

        // Create the line chart
        salesChart.Line(salesChartData, salesChartOptions);
    }
    //TODO:  Make sure this doesn't run for non-admin accounts
    if($.find('.dashboard_index').length) {
        $('.dashboard_index').ready(function () {
            $.get('/dashboard/sales_chart_data', function (data) {
                data['sales_data'] = data['sales_data'].map(function (s) {
                    return parseFloat(s);
                });
                drawSalesChart(data);
            });
        });
    }
});

