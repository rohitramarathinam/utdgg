'use strict'

function sum(dictVals){
    var sum = 0;
    for(var i in dictVals){
        sum += dictVals[i];
    }
    return sum;
}

function convertValues(dictVals){
    var finalVals = {};
    for(var i in dictVals){
        finalVals[i] = parseInt(dictVals[i]);
    }
    return finalVals;
}

const searchForm = document.getElementById("class_search")

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
}

searchForm.addEventListener("submit", function(e){
    e.preventDefault()
    var search = document.getElementById("query").value
    var dataParsed = JSON.parse(httpGet(`https://4i5536aptc.execute-api.us-east-2.amazonaws.com/section?search=${search}&sortDirection=DESC&sortField=year`));
    var allData = []
    for (let index = 0; index < dataParsed.length; index++) {
        var dataByTerm = {};
        try{dataByTerm['course'] = dataParsed[index].course.prefix + " " + dataParsed[index].course.number;} catch(e){}
        try{dataByTerm['courseSection'] = dataParsed[index].number;} catch(e){}
        try{dataByTerm['courseTerm'] = dataParsed[index].course.semester.name;} catch(e){}
        try{dataByTerm['prof'] = dataParsed[index].professor.lastName + ', ' + dataParsed[index].professor.firstName;} catch(e){}
        try{dataByTerm['grades'] = convertValues(dataParsed[index].grades);} catch(e){}
        try{dataByTerm['totalStudents'] = sum(dataByTerm['grades']);} catch(e){}
        allData.push(dataByTerm);
    }
    console.log(allData)
})