console.log("jello")

var chartData = JSON.parse(sessionStorage.getItem("percentDataByProf"))
var possibleValues = JSON.parse(sessionStorage.getItem("allGrades"))

console.log(chartData)
console.log(possibleValues)



var seriesData = []
for (let index = 0; index < possibleValues.length; index++) {
    var grade = possibleValues[index];
    dataVals = []
    for (prof in chartData){
        if (chartData[prof][grade]) {
            dataVals.push(chartData[prof][grade]);
        }
        else {
            dataVals.push(0);
        }
    }
    seriesData.push({name: grade, data: dataVals})
    
}

console.log(seriesData)

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