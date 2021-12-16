'use strict'

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
    var total = 0;
    var unfNames = [];
    for (var i = 0; i<dataParsed.length; i++) 
        unfNames[i] = dataParsed[i].professor["firstName"] + " " + dataParsed[i].professor["lastName"];

    var totals = [];
    var unfAp = []; 
    var unfA = []; 
    var unfAm = []; 
    var unfBp = []; 
    var unfB = []; 
    var unfBm = []; 
    var unfC = []; 
    var unfD = []; 
    var unfF = [];
    var counter = 0;
    for (var i = 0; i<dataParsed.length; i++) {
        unfAp[i] = 0;
        unfA[i] = 0;
        unfAm[i] = 0;
        unfBp[i] = 0;
        unfB[i] = 0;
        unfBm[i] = 0;
        unfC[i] = 0;
        unfD[i] = 0;
        unfF[i] = 0;
    }

    for (var element of dataParsed) {
        try {
            if (typeof element.grades["A+"] === "number") {
                total+=element.grades["A+"];
                unfAp[counter] = element.grades["A+"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["A"] === "number") {
                total+=element.grades["A"];
                unfA[counter] = element.grades["A"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["A-"] === "number") {
                total+=element.grades["A-"];
                unfAm[counter] = element.grades["A-"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["B+"] === "number") {
                total+=element.grades["B+"];
                unfBp[counter] = element.grades["B+"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["B"] === "number") {
                total+=element.grades["B"];
                unfB[counter] = element.grades["B"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["B-"] === "number") {
                total+=element.grades["B-"];
                unfBm[counter] = element.grades["B-"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["C+"] === "number") {
                total+=element.grades["C+"];
                unfC[counter] = element.grades["C+"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["C"] === "number") {
                total+=element.grades["C"];
                unfC[counter] = element.grades["C"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["C-"] === "number") {
                total+=element.grades["C-"];
                unfC[counter] = element.grades["C-"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["D+"] === "number") {
                total+=element.grades["D+"];
                unfD[counter] = element.grades["D+"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["D"] === "number") {
                total+=element.grades["D"];
                unfD[counter] = element.grades["D"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["D-"] === "number") {
                total+=element.grades["D-"];
                unfD[counter] = element.grades["D-"];
            }
        } catch (error) {}
        try {
            if (typeof element.grades["F"] === "number") {
                total+=element.grades["F"];
                unfF[counter] = element.grades["F"];
            }
        } catch (error) {}
        totals[counter] = total;
        total = 0;
        counter++;
    }

    counter = 0;
    var fNames = [];
    var fTotals = [];
    var isUnique = true;
    for (var i = 0; i<unfNames.length; i++) {
        for (var j = 0; j<fNames.length; j++) {
            if (unfNames[i] === fNames[j]) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            fNames[counter] = unfNames[i];
            fTotals[counter] = 0;
            counter++;
        }
        isUnique = true;
    }
    counter = 0;
    // for (var e of fNames)
    //     console.log(e);
    for (var i = 0; i<unfNames.length; i++) {
        for (var j = 0; j<fNames.length; j++) {
            if (unfNames[i] === fNames[j]) {
                fTotals[j] += totals[i];
                break;
            }
        }
    }

    // for (var e of fTotals)
    //     console.log(e);

    var ap = [];
    var a = [];
    var am = [];
    var bp = [];
    var b = [];
    var bm = [];
    var c = [];
    var d = []; 
    var f = [];
    for(var i = 0; i<fNames.length; i++) {
        ap[i] = 0;
        a[i] = 0;
        am[i] = 0;
        bp[i] = 0;
        b[i] = 0;
        bm[i] = 0;
        c[i] = 0;
        d[i] = 0;
        f[i] = 0;
    }

    counter = 0;
    for (var i = 0; i<unfNames.length; i++) {
        for (var j = 0; j<fNames.length; j++) {
            if (unfNames[i] === fNames[j]) {
                ap[j]+=unfAp[i];
                a[j]+=unfA[i];
                am[j]+=unfAm[i];
                bp[j]+=unfBp[i];
                b[j]+=unfB[i];
                bm[j]+=unfBm[i];
                c[j]+=unfC[i];
                d[j]+=unfD[i];
                f[j]+=unfF[i];
                break;
            }
        }
    }

    for (var i = 0; i<fNames.length; i++) {
        console.log(fNames[i] + " ");
    }
    console.log('\n')
    for (var i = 0; i<fNames.length; i++) {
        console.log(ap[i] * 100 / fTotals[i]);
    }
    console.log('\n')
    for (var i = 0; i<fNames.length; i++) {
        console.log(a[i] * 100 / fTotals[i]);
    }
    console.log('\n')
    for (var i = 0; i<fNames.length; i++) {
        console.log(am[i] * 100 / fTotals[i]);
    }
    console.log('\n')
    for (var i = 0; i<fNames.length; i++) {
        console.log(bp[i] * 100 / fTotals[i]);
    }
    console.log('\n')
    for (var i = 0; i<fNames.length; i++) {
        console.log(b[i] * 100 / fTotals[i]);
    }
    console.log('\n')
    for (var i = 0; i<fNames.length; i++) {
        console.log(bm[i] * 100 / fTotals[i]);
    }
    console.log('\n')
    for (var i = 0; i<fNames.length; i++) {
        console.log(c[i] * 100 / fTotals[i]);
    }
    console.log('\n')
    for (var i = 0; i<fNames.length; i++) {
        console.log(d[i] * 100 / fTotals[i]);
    }
    console.log('\n')
    for (var i = 0; i<fNames.length; i++) {
        console.log(f[i] * 100 / fTotals[i]);
    }
    console.log('\n')

    console.log(search);
})