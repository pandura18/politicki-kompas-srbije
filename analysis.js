// ===============================
// DETALJNA ANALIZA
// ===============================


const economicQuestions = [];

for(let i=0;i<=9;i++){
    economicQuestions.push(i);
}

// Društvo (10-19)
const socialQuestions = [];

for(let i=10;i<=19;i++){
    socialQuestions.push(i);
}

// Spoljna politika (20-24)
const foreignQuestions = [];

for(let i=20;i<=24;i++){
    foreignQuestions.push(i);
}

// Globalizam (25-29)
const globalQuestions = [];

for(let i=25;i<=29;i++){
    globalQuestions.push(i);
}



// ===============================
// RAČUNANJE OBLASTI
// ===============================


function calculateCategoryScore(party, categoryQuestions){

    let totalDifference = 0;
    let count = 0;


    for(let i = 0; i < activeQuestions.length; i++){

        let originalQuestion = activeQuestions[i];


        if(categoryQuestions.includes(originalQuestion)){


            let difference = Math.abs(
                userAnswers[i] - party.answers[originalQuestion]
            );


            totalDifference += difference;
            count++;

        }

    }


    if(count === 0){
        return 0;
    }


    let maxDifference = count * 4;


    let score =
    ((maxDifference - totalDifference) * 100) / maxDifference;


return Number(score.toFixed(2));

}



// ===============================
// ISPIS REZULTATA
// ===============================


function printResults(id, data){


    let box = document.getElementById(id);


    box.innerHTML = "";


    data.forEach(function(item,index){


        box.innerHTML += `

        <div class="analysis-item">

            <b>${index+1}.</b>
            ${item.name}

            <strong>
            ${item.score}%
            </strong>

        </div>

        `;


    });


}



// ===============================
// OTVARANJE ANALIZE
// ===============================


function showAnalysis(){


    resultScreen.classList.add("hidden");

    analysisScreen.classList.remove("hidden");

console.log(activeQuestions.length);
    console.log(userAnswers.length);

    let economicResults = [];
    let socialResults = [];
    let foreignResults = [];
let globalResults = [];



    parties.forEach(function(party){


        economicResults.push({

            name: party.name,

            score: calculateCategoryScore(
                party,
                economicQuestions
            )

        });



        socialResults.push({

            name: party.name,

            score: calculateCategoryScore(
                party,
                socialQuestions
            )

        });



foreignResults.push({

    name: party.name,

    score: calculateCategoryScore(
        party,
        foreignQuestions
    )

});

globalResults.push({

    name: party.name,

    score: calculateCategoryScore(
        party,
        globalQuestions
    )

});



    });



    economicResults.sort((a,b)=>b.score-a.score);

    socialResults.sort((a,b)=>b.score-a.score);

    foreignResults.sort((a,b)=>b.score-a.score);

globalResults.sort((a,b)=>b.score-a.score);



    printResults(
        "economic-results",
        economicResults
    );


    printResults(
        "social-results",
        socialResults
    );


printResults(
    "foreign-results",
    foreignResults
);

printResults(
    "global-results",
    globalResults
);


}



// ===============================
// DUGME DETALJNA ANALIZA
// ===============================


document
.getElementById("analysis-btn")
.onclick = function(){

    showAnalysis();

};




// ===============================
// NAZAD NA REZULTATE
// ===============================


document
.getElementById("back-results-btn")
.onclick=function(){


    analysisScreen.classList.add("hidden");


    resultScreen.classList.remove("hidden");


};

const scaleScreen = document.getElementById("scale-screen");


document.getElementById("scale-btn").onclick=function(){

    analysisScreen.classList.add("hidden");

    scaleScreen.classList.remove("hidden");


    showIdeologyScale();

};


// =====================================
// 2D POLITIČKA POZICIJA
// Ekonomija + Društvene vrednosti
// =====================================

function totalPosition(economic, social){

    // Progresivna levica
    if(economic <= -2 && social < -5)
        return "Progresivna levica";

    // Socijaldemokrata
    if((economic <= -3 && social >= -5 && social <= 5) || ( economic < -2 && economic >= -4 && social >= 2 && social <= 5))
        return "Socijaldemokrata";

    // Socijalni konzervativac
    if(economic <= -2 && social > 5)
        return "Socijalni konzervativac";

    // Liberal
    if((economic >= 3 && social <= -2) || ( economic <= 3 && economic > -2 && social < -5))
        return "Liberal";

    // Centrista
    if(economic > -3 && economic < 3 &&
       social >= -5 && social < 2)
        return "Centrista";

    // Desni centar
    if((economic >= 3 && social > -2 && social <= 5) || ( economic <= 3 && economic >= -2 && social <= 5 && social >= 2))
        return "Desni centar";

    // Desnica
    if(economic > -2 && social > 5)
        return "Desnica";


}



function economicPosition(value){

    if(value <= -7.14) return "Velika državna intervencija";
    if(value <= -4.29) return "Leva ekonomija";
    if(value <= -1.43) return "Socijalno-tržišna ekonomija";
    if(value <= 1.43) return "Mešovita ekonomija";
    if(value <= 4.29) return "Tržišna ekonomija";
    if(value <= 7.14) return "Slobodna tržišna ekonomija";

    return "Liberalni kapitalizam";

}



function socialPosition(value){

    if(value <= -7.14) return "Vrlo liberalno";
    if(value <= -4.29) return "Liberalno";
    if(value <= -1.43) return "Umereno liberalno";
    if(value <= 1.43) return "Centar";
    if(value <= 4.29) return "Umereno konzervativno";
    if(value <= 7.14) return "Konzervativno";

    return "Vrlo konzervativno";

}



function foreignPosition(value){

    if(value <= -7.14) return "Izrazito prozapadno";
    if(value <= -4.29) return "Prozapadno";
    if(value <= -1.43) return "Umereno prozapadno";
    if(value <= 1.43) return "Balansirano";
    if(value <= 4.29) return "Umereno proruski";
    if(value <= 7.14) return "Proruski";

    return "Izrazito proruski";

}

function globalPosition(value){

    if(value <= -7.14) return "Izraziti globalizam";
    if(value <= -4.29) return "Globalizam";
    if(value <= -1.43) return "Umereni globalizam";
    if(value <= 1.43) return "Balansirano";
    if(value <= 4.29) return "Umereni suverenizam";
    if(value <= 7.14) return "Suverenizam";

    return "Izraziti suverenizam";

}

// =====================================
// IDEOLOŠKA POZICIJA ISPITANIKA
// =====================================


// pitanja koja idu u pozitivnom smeru
const positiveQuestions = [
    0,7,12,13,15,16,17,18,19,22,23,24,25,26,27,28,29
];



// računanje oblasti

function calculatePosition(questionIndexes){

    let positiveSum = 0;
    let negativeSum = 0;

    let positiveCount = 0;
    let negativeCount = 0;

    for(let i = 0; i < activeQuestions.length; i++){

        let originalQuestion = activeQuestions[i];

        if(!questionIndexes.includes(originalQuestion)){
            continue;
        }

        let answer = userAnswers[i];

        if(answer === undefined){
            continue;
        }

        if(positiveQuestions.includes(originalQuestion)){

            positiveSum += answer;
            positiveCount++;

        }else{

            negativeSum += answer;
            negativeCount++;

        }

    }

    if(positiveCount + negativeCount === 0){
        return 0;
    }

    let score =
    (((positiveSum - 3*positiveCount) -
      (negativeSum - 3*negativeCount))*5)
    /(positiveCount + negativeCount);

    return Number(score.toFixed(2));

}






// sve oblasti


function calculateUserIdeology(){


return {


total:
calculatePosition([
0,1,2,3,4,5,6,7,8,9,
10,11,12,13,14,15,16,17,18,19,
20,21,22,23,24,
25,26,27,28,29
]),


economic:
calculatePosition([
0,1,2,3,4,5,6,7,8,9,
]),


social:
calculatePosition([
10,11,12,13,14,15,16,17,18,19
]),


foreign:
calculatePosition([
20,21,22,23,24
]),

global:
calculatePosition([
25,26,27,28,29
]),


};


}
function showIdeologyScale(){


let table=document.getElementById("scale-table");

table.innerHTML="";



// ISPITANIK

let userIdeology = calculateUserIdeology();



let userTotal = userIdeology.total;
let userEco = userIdeology.economic;
let userSocial = userIdeology.social;
let userforeign=userIdeology.foreign;
let userGlobal=userIdeology.global;


// ovde ćemo kasnije ubaciti računanje iz odgovora
// za sada ostavljamo tvoje vrednosti



let rows=[];



rows.push({

name:"Ispitanik",

total:totalPosition(
    userEco,
    userSocial
),

economic:economicPosition(userEco),

social:socialPosition(userSocial),

foreign:foreignPosition(userforeign),
global:globalPosition(userGlobal)

});



// STRANKE


parties.forEach(function(party){


rows.push({

name:party.name,

total: totalPosition(
    party.economic,
    party.social
),

economic:economicPosition(party.economic),

social:socialPosition(party.social),

foreign:foreignPosition(party.foreign),
global:globalPosition(party.global)

});


});





rows.forEach(function(row){


table.innerHTML += `

<tr>

<td>${row.name}</td>

<td>${row.total}</td>

<td>${row.economic}</td>

<td>${row.social}</td>

<td>${row.foreign}</td>
<td>${row.global}</td>

</tr>


`;

});


}
document.getElementById("back-analysis-btn").onclick=function(){

    scaleScreen.classList.add("hidden");

    analysisScreen.classList.remove("hidden");

};

document.getElementById("back-analysis-btn").onclick = function(){

    scaleScreen.classList.add("hidden");
    analysisScreen.classList.remove("hidden");

};

const graphScreen = document.getElementById("graph-screen");

document.getElementById("graph-btn").onclick = function(){

    scaleScreen.classList.add("hidden");
    graphScreen.classList.remove("hidden");

    drawIdeologyChart();
	createLegend();
	createLegend2D();

};

document.getElementById("back-scale-btn").onclick = function(){

    graphScreen.classList.add("hidden");
    scaleScreen.classList.remove("hidden");

};

function drawIdeologyChart(){

    const canvas = document.getElementById("ideologyChart");

    if(!canvas){
        console.log("NEMA CANVAS");
        return;
    }

    console.log("CANVAS:", canvas);

    const ctx = canvas.getContext("2d");

    if(!ctx){
        console.log("NEMA CONTEXT");
        return;
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    // margina
    const m = 60;

    // pozadina
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,w,h);

    // mreža
    ctx.strokeStyle = "#dddddd";

    for(let i=0;i<=10;i++){

        let x = m + (w-2*m)*i/10;
        let y = m + (h-2*m)*i/10;

        ctx.beginPath();
        ctx.moveTo(x,m);
        ctx.lineTo(x,h-m);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(m,y);
        ctx.lineTo(w-m,y);
        ctx.stroke();

    }

    // glavne ose
    ctx.strokeStyle="black";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(w/2,m);
    ctx.lineTo(w/2,h-m);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(m,h/2);
    ctx.lineTo(w-m,h/2);
    ctx.stroke();

    ctx.lineWidth=1;

    // nazivi osa
    ctx.font="16px Arial";
    ctx.fillStyle="black";

    ctx.fillText("Leva ekonomija",20,h/2-10);
    ctx.fillText("Tržišna ekonomija",w-180,h/2-10);

    ctx.save();
    ctx.translate(15,h-60);
    ctx.rotate(-Math.PI/2);
    ctx.fillText("Liberalno",0,0);
    ctx.restore();

    ctx.save();
    ctx.translate(15,130);
    ctx.rotate(-Math.PI/2);
    ctx.fillText("Konzervativno",0,0);
    ctx.restore();

    // pretvaranje koordinata
    function X(value){

        return m + ((value+10)/20)*(w-2*m);

    }

    function Y(value){

        return h-m - ((value+10)/20)*(h-2*m);

    }

    // korisnik

const user = calculateUserIdeology();

console.log("CRTAM KORISNIKA", user);


ctx.fillStyle="red";

ctx.beginPath();

ctx.arc(
    X(user.economic),
    Y(user.social),
    8,
    0,
    Math.PI*2
);

ctx.fill();


ctx.fillStyle="black";
ctx.font="14px Arial";

ctx.fillText(
    "Vi",
    X(user.economic)+10,
    Y(user.social)-10
);



// stranke

parties.forEach(function(party){


    ctx.fillStyle = party.color || "blue";


    ctx.beginPath();

    ctx.arc(
        X(party.economic),
        Y(party.social),
        6,
        0,
        Math.PI*2
    );

    ctx.fill();


});

drawLineChart(
"economicChart",
"economic",
"Leva ekonomija",
"Tržišna ekonomija"
);


drawLineChart(
"socialChart",
"social",
"Liberalno",
"Konzervativno"
);


drawLineChart(
"foreignChart",
"foreign",
"Prozapadno",
"Proruski"
);

drawLineChart(
"globalChart",
"global",
"Globalizam",
"Suverenizam"
);

}

function drawLineChart(canvasID, field, leftText, rightText){

    let canvas = document.getElementById(canvasID);

    if(!canvas) return;

    let ctx = canvas.getContext("2d");

    let x1 = 100;
    let x2 = 700;
    let y = 70;


    // =========================
    // PODACI STRANAKA
    // =========================

    let partyPoints = [];


    function X(value){
        return x1 + ((value + 10) / 20) * (x2 - x1);
    }


    // =========================
    // CRTANJE
    // =========================

    function draw(){

        ctx.clearRect(0, 0, canvas.width, canvas.height);


        // linija

        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();


        // sredina

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(400, 50);
        ctx.lineTo(400, 90);
        ctx.stroke();


        // =========================
        // STRANKE
        // =========================

        partyPoints = [];


        parties.forEach(function(party){

            let value = Number(party[field]);

            if(isNaN(value)) return;


            let point = {

                x: X(value),
                y: y,
                value: value,
                name: party.name,
                color: party.color || "blue"

            };


            partyPoints.push(point);


            ctx.fillStyle = point.color;

            ctx.beginPath();

            ctx.arc(
                point.x,
                point.y,
                7,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });


        // =========================
        // ISPITANIK
        // =========================

        let user = calculateUserIdeology();

        let userValue = Number(user[field]);


        ctx.fillStyle = "red";

        ctx.beginPath();

        ctx.arc(
            X(userValue),
            y,
            9,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.fillStyle = "black";
        ctx.font = "14px Arial";

        ctx.fillText(
            "VI",
            X(userValue) + 12,
            y - 12
        );


        // =========================
        // NAZIVI OSA
        // =========================

        ctx.font = "16px Arial";
        ctx.fillStyle = "black";

        ctx.fillText(
            leftText,
            x1 - 30,
            130
        );

        ctx.fillText(
            rightText,
            x2 - 100,
            130
        );

    }


    draw();


    // =========================
// MOUSEOVER
// =========================

const tooltip = document.getElementById("chart-tooltip");


canvas.onmousemove = function(event){

    let rect = canvas.getBoundingClientRect();

    let mouseX =
        (event.clientX - rect.left) *
        (canvas.width / rect.width);

    let mouseY =
        (event.clientY - rect.top) *
        (canvas.height / rect.height);


    // pronađi SVE stranke blizu miša

    let found = partyPoints.filter(function(point){

        let distance = Math.sqrt(

            Math.pow(mouseX - point.x, 2) +
            Math.pow(mouseY - point.y, 2)

        );

        return distance <= 15;

    });


    if(found.length === 0){

        tooltip.style.display = "none";

        canvas.style.cursor = "default";

        return;

    }


    // =========================
    // ISPIS STRANAKA
    // =========================

    tooltip.innerHTML = "";


    found.forEach(function(point){

        let row = document.createElement("div");

        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.gap = "7px";


        let color = document.createElement("span");

        color.style.width = "10px";
        color.style.height = "10px";
        color.style.borderRadius = "50%";

        color.style.background =
            point.color;


        let text = document.createElement("span");

        text.textContent =
            point.name +
            " — " +
            point.value.toFixed(2);


        row.appendChild(color);
        row.appendChild(text);

        tooltip.appendChild(row);

    });


    // =========================
    // POZICIJA TOOLTIPA
    // =========================

    tooltip.style.left =
        (event.clientX + 15) + "px";

    tooltip.style.top =
        (event.clientY + 15) + "px";


    tooltip.style.display = "block";

    canvas.style.cursor = "pointer";

};


canvas.onmouseleave = function(){

    tooltip.style.display = "none";

    canvas.style.cursor = "default";

};
}
function createLegend2D(){

    let legend=document.getElementById("partyLegend2D");

    if(!legend) return;


    legend.innerHTML="";


    parties.forEach(function(party){

        legend.innerHTML += `

        <span style="
        display:inline-flex;
        align-items:center;
        margin:5px;
        font-size:13px;
        ">

        <span style="
        width:16px;
        height:16px;
        background:${party.color};
        display:inline-block;
        margin-right:5px;
        border-radius:2px;
        ">
        </span>

        ${party.name.split(" - ")[0]}

        </span>

        `;

    });

}

function drawEUIdeologyChart(){

    const canvas = document.getElementById("euIdeologyChart");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    const m = 60;

    // POZADINA

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);


    // MREŽA

    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 1;

    for(let i = 0; i <= 10; i++){

        let x = m + (w - 2*m) * i / 10;
        let y = m + (h - 2*m) * i / 10;

        ctx.beginPath();
        ctx.moveTo(x, m);
        ctx.lineTo(x, h-m);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(m, y);
        ctx.lineTo(w-m, y);
        ctx.stroke();

    }


    // OSE

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(w/2, m);
    ctx.lineTo(w/2, h-m);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(m, h/2);
    ctx.lineTo(w-m, h/2);
    ctx.stroke();


    // NAZIVI OSA

    ctx.font = "16px Arial";
    ctx.fillStyle = "black";

    ctx.fillText(
        "Leva ekonomija",
        20,
        h/2 - 10
    );

    ctx.fillText(
        "Tržišna ekonomija",
        w-180,
        h/2 - 10
    );


    ctx.fillText(
        "Konzervativno",
        w/2 + 10,
        30
    );

    ctx.fillText(
        "Liberalno",
        w/2 + 10,
        h-20
    );


    // PRETVARANJE -10 DO +10 U KOORDINATE

    function X(value){

        return m +
        ((value + 10) / 20) *
        (w - 2*m);

    }


    function Y(value){

        return h-m -
        ((value + 10) / 20) *
        (h - 2*m);

    }


    // EU GRUPACIJE

    europeanGroups.forEach(function(group){

    let x = X(group.economic);
    let y = Y(group.social);

        let color;

if(group.name === "EPP"){
    color = "#3399FF";
}
else if(group.name === "S&D"){
    color = "#F0001C";
}
else if(group.name === "Renew"){
    color = "#FFD700";
}
else if(group.name === "Greens/EFA"){
    color = "#57B45F";
}
else if(group.name === "ECR"){
    color = "#186DA9";
}
else if(group.name === "PfE"){
    color = "#253082";
}
else if(group.name === "ESN"){
    color = "#13517E";
}
else if(group.name === "The Left"){
    color = "#B71C1C";
}
else{
    color = "#457b9d";
}

ctx.fillStyle = color;
        ctx.beginPath();

        ctx.arc(
            X(group.economic),
            Y(group.social),
            7,
            0,
            Math.PI * 2
        );

        ctx.fill();

    // IME GRUPACIJE
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";

    ctx.fillText(
        group.name,
        x + 10,
        y + 5
    );

    });


    // KORISNIK

    const user = calculateUserIdeology();

    ctx.fillStyle = "red";

    ctx.beginPath();

    ctx.arc(
        X(user.economic),
        Y(user.social),
        9,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "black";
    ctx.font = "14px Arial";

    ctx.fillText(
        "Vi",
        X(user.economic) + 12,
        Y(user.social) - 10
    );
// =====================================
    // 4 HORIZONTALNE LINIJE
    // =====================================

    function drawEULineChart(canvasID, field, leftText, rightText){

        let canvas = document.getElementById(canvasID);

        if(!canvas) return;

        let ctx = canvas.getContext("2d");

        let x1 = 100;
        let x2 = 700;
        let y = 70;

let groupPoints = [];

        function X(value){
            return x1 + ((value + 10) / 20) * (x2 - x1);
        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // LINIJA

        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);

        ctx.stroke();


        // SREDINA

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        ctx.beginPath();

        ctx.moveTo(400, 50);
        ctx.lineTo(400, 90);

        ctx.stroke();


        // EU GRUPACIJE

        europeanGroups.forEach(function(group){

            let value = Number(group[field]);

            if(isNaN(value)) return;

        let color;

if(group.name === "EPP"){
    color = "#3399FF";
}
else if(group.name === "S&D"){
    color = "#F0001C";
}
else if(group.name === "Renew"){
    color = "#FFD700";
}
else if(group.name === "Greens/EFA"){
    color = "#57B45F";
}
else if(group.name === "ECR"){
    color = "#186DA9";
}
else if(group.name === "PfE"){
    color = "#253082";
}
else if(group.name === "ESN"){
    color = "#13517E";
}
else if(group.name === "The Left"){
    color = "#B71C1C";
}
else{
    color = "#457b9d";
}

    let point = {

        x: X(value),
        y: y,

        value: value,

        name: group.name,

        color: color

    };

    groupPoints.push(point);

ctx.fillStyle = color;
            ctx.beginPath();

            ctx.arc(
                X(value),
                y,
                7,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });


        // ISPITANIK

        let user =
            calculateUserIdeology();

        let userValue =
            Number(user[field]);

        ctx.fillStyle = "red";

        ctx.beginPath();

        ctx.arc(
            X(userValue),
            y,
            9,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.fillStyle = "black";
        ctx.font = "14px Arial";

        ctx.fillText(
            "VI",
            X(userValue) + 12,
            y - 12
        );


        // NAZIVI

        ctx.font = "16px Arial";

        ctx.fillText(
            leftText,
            x1 - 30,
            130
        );

        ctx.fillText(
            rightText,
            x2 - 100,
            130
        );
// =========================
// MOUSEOVER
// =========================

const tooltip = document.getElementById("chart-tooltip");

canvas.onmousemove = function(event){

    let rect = canvas.getBoundingClientRect();

    let mouseX =
        (event.clientX - rect.left) *
        (canvas.width / rect.width);

    let mouseY =
        (event.clientY - rect.top) *
        (canvas.height / rect.height);


    // pronađi sve EU grupacije blizu miša

    let found = groupPoints.filter(function(point){

        let distance = Math.sqrt(

            Math.pow(mouseX - point.x, 2) +
            Math.pow(mouseY - point.y, 2)

        );

        return distance <= 15;

    });


    if(found.length === 0){

        tooltip.style.display = "none";

        canvas.style.cursor = "default";

        return;

    }


    // ISPIS

    tooltip.innerHTML = "";


    found.forEach(function(point){

        let row = document.createElement("div");

        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.gap = "7px";


        let color = document.createElement("span");

        color.style.width = "10px";
        color.style.height = "10px";
        color.style.borderRadius = "50%";

        color.style.background =
            point.color;


        let text = document.createElement("span");

        text.textContent =
            point.name +
            " — " +
            point.value.toFixed(2);


        row.appendChild(color);
        row.appendChild(text);

        tooltip.appendChild(row);

    });


    // POZICIJA TOOLTIPA

    tooltip.style.left =
        (event.clientX + 15) + "px";

    tooltip.style.top =
        (event.clientY + 15) + "px";


    tooltip.style.display = "block";

    canvas.style.cursor = "pointer";

};


canvas.onmouseleave = function(){

    tooltip.style.display = "none";

    canvas.style.cursor = "default";

};
    }


    drawEULineChart(
        "euEconomicChart",
        "economic",
        "Leva ekonomija",
        "Tržišna ekonomija"
    );


    drawEULineChart(
        "euSocialChart",
        "social",
        "Liberalno",
        "Konzervativno"
    );


    drawEULineChart(
        "euForeignChart",
        "foreign",
        "Prozapadno",
        "Proruski"
    );


    drawEULineChart(
        "euGlobalChart",
        "global",
        "Globalizam",
        "Suverenizam"
    );
}

const euGraphScreen =
    document.getElementById("eu-graph-screen");


document.getElementById("eu-graph-btn").onclick = function(){

euAnalysisScreen.classList.add("hidden");

    euScreen.classList.add("hidden");

    euGraphScreen.classList.remove("hidden");

    drawEUIdeologyChart();


};


document.getElementById(
    "back-eu-results-from-graph-btn"
).onclick = function(){

    euGraphScreen.classList.add("hidden");

    euScreen.classList.remove("hidden");

};



