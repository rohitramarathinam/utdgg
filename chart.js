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


Highcharts.chart('container', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Grades By Professor'
    },
    xAxis: {
      categories: Object.keys(chartData)
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Percent of Students'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: seriesData
  });