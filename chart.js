'use strict'

var chartData = JSON.parse(sessionStorage.getItem("percentDataByProf"))
var possibleValues = JSON.parse(sessionStorage.getItem("allGrades"))

var seriesData = []
for (let index = 0; index < possibleValues.length; index++) {
    var grade = possibleValues[index];
    var dataVals = []
    for (var prof in chartData){
        if (chartData[prof][grade]) {
            dataVals.push(chartData[prof][grade]);
        }
        else {
            dataVals.push(0);
        }
    }
    seriesData.push({name: grade, data: dataVals})
    
}

// Found on Highchart website

Highcharts.chart('container', {
    chart: {
      type: 'bar',
      scrollablePlotArea: {
        minHeight: 700,
        scrollPositionY: 1,
        opacity: 100
      }
    },
    title: {
      text: 'Grades By Professor'
    },
    xAxis: {
      categories: Object.keys(chartData),
      labels: {
      	padding: 0,
				style: {
        	fontSize: '6px'
        }
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Percent of Students'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.1f}% </b><br/>',
      shared: false
  },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        // WORK ON IN FUTURE -> Labels that interact with legend selected
        // dataLabels: {
        //   enabled: true,
        //   format:'<div style="width: 20px; height: 20px; overflow: hidden; border-radius: 50%; margin-left: -25px">'
        // }
      }
    },
    series: seriesData
  });