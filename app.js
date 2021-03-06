'use strict'

//Intended order of grades
const gradesOrder = ["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","CR","F","W","NC","I"]

// Sums only the values in a given dictionary
function sum(dictVals){
    var sum = 0;
    for(var i in dictVals){
        sum += dictVals[i];
    }
    return sum;
}

// Converts all values of a dictionary to integers
function convertValues(dictVals){
    var finalVals = {};
    for(var i in dictVals){
        finalVals[i] = parseInt(dictVals[i]);
    }
    return finalVals;
}

const searchForm = document.getElementById("class_search")

// Makes get request when search query is given
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
}

// Gaters search data and gives output
searchForm.addEventListener("submit", function(e){
    e.preventDefault()
    var search = document.getElementById("query").value
    var dataParsed = JSON.parse(httpGet(`https://4i5536aptc.execute-api.us-east-2.amazonaws.com/section?search=${search}&sortDirection=DESC&sortField=year`));
    var allData = []
    var dataByProf = {}
    var percentDataByProf = {}
    var allGrades = []

    for (let index = 0; index < dataParsed.length; index++) {
        var dataByTerm = {};

        // Data is formatted into the allData Array 
        try{dataByTerm['course'] = dataParsed[index].course.prefix + " " + dataParsed[index].course.number;} catch(e){}
        try{dataByTerm['courseSection'] = dataParsed[index].number;} catch(e){}
        try{dataByTerm['courseTerm'] = dataParsed[index].course.semester.name;} catch(e){}
        try{dataByTerm['prof'] = dataParsed[index].professor.lastName + ', ' + dataParsed[index].professor.firstName;} catch(e){}
        try{dataByTerm['grades'] = convertValues(dataParsed[index].grades);} catch(e){}
        try{dataByTerm['totalStudents'] = sum(dataByTerm['grades']);} catch(e){}
        allData.push(dataByTerm);

        // Data is organized by professor
        try{dataByProf[dataByTerm['prof']].push(dataByTerm['grades']);} catch(e){if (!(dataByProf[dataByTerm['prof']])) {dataByProf[dataByTerm['prof']] = [dataByTerm['grades']];};}
    }
    
    // Consolidates data by professor
    for (var prof in dataByProf){
        percentDataByProf[prof] = {}
        for (let grades = 0; grades < dataByProf[prof].length; grades++){
            for (var grade in dataByProf[prof][grades]){
                if (!(percentDataByProf[prof][grade])){
                    allGrades.push(grade);
                    percentDataByProf[prof][grade] = dataByProf[prof][grades][grade];
                }
                else{
                    percentDataByProf[prof][grade] += dataByProf[prof][grades][grade];
                }
            }
        }
    }

    // Removes Duplicates from allGrades

    allGrades = [...new Set(allGrades)]
    
    // Reorders Grades
    var allGradesFinal = []
    for (let index = 0; index < gradesOrder.length; index++) {
        const g = gradesOrder[index];
        if (allGrades.includes(g)){
            allGradesFinal.push(g);
        }        
    }

    // Data is organized by professor and the percent students that recieved each grade
    for (prof in percentDataByProf){
        var totalPeople = sum(percentDataByProf[prof])
        for (grade in percentDataByProf[prof]){
            percentDataByProf[prof][grade] = (percentDataByProf[prof][grade]*100.0)/totalPeople
        }
    }

    // Sort data by professor last name
    var percentDataByProfSorted = Object.keys(percentDataByProf).sort().reduce((accumulator, index) => (accumulator[index] = percentDataByProf[index], accumulator), {});

    sessionStorage.setItem("percentDataByProf", JSON.stringify(percentDataByProfSorted))
    sessionStorage.setItem("allGrades", JSON.stringify(allGradesFinal))
    window.open("chart.html", "_self")
})