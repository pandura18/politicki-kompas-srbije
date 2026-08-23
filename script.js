console.log("SCRIPT.JS JE UCITAN");
console.log("questions:", questions);
console.log("parties2023:", parties2023);
console.log("parties2023Coalitions:", parties2023Coalitions);

let currentQuestion = 0;
let activeQuestions = [];

let testLength = questions.length;
activeQuestions = [...questions.keys()];
let userAnswers = [];

// ELEMENTI

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");

const questionText = document.getElementById("question-text");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");

const analysisBtn = document.getElementById("analysis-btn");
const analysisScreen = document.getElementById("analysis-screen");
const backResultsBtn = document.getElementById("back-results-btn");

const resultScreen = document.getElementById("result-screen");

const priorityScreen =
document.getElementById("priority-screen");

let economicPriority = 10;
let socialPriority = 10;
let foreignPriority = 10;
let globalPriority = 10;
let currentElection = null;

console.log(questionText);
console.log(progressText);

const answersButtons = document.querySelectorAll(".answer");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const restartBtn = document.getElementById("restart-btn");

console.log(nextBtn);

const resultsDiv = document.getElementById("results");

// IZBOR TESTA

document.getElementById("elections-2023-coalitions").onclick = function(){

    currentElection = "2023-coalitions";

    parties = parties2023Coalitions;

    startTest();

};


document.getElementById("elections-2023-parties").onclick = function(){

    currentElection = "2023-parties";

    parties = parties2023;

    startTest();

};


document.getElementById("elections-2026").onclick = function(){

    alert("Izbori 2026. godine još nisu raspisani.");

};

// START

function startTest(){

currentQuestion = 0;
userAnswers = [];

activeQuestions = [];


for (let i = 0; i < questions.length; i++) {
activeQuestions.push(i);
}

testLength = activeQuestions.length;

startScreen.classList.add("hidden");
quizScreen.classList.remove("hidden");

showQuestion();


}

function restartTest(){

    document.querySelectorAll(".card").forEach(function(screen){
        screen.classList.add("hidden");
    });

    startScreen.classList.remove("hidden");

    currentQuestion = 0;
    userAnswers = [];
    activeQuestions = [];
    testLength = questions.length;

    if(resultsDiv){
        resultsDiv.innerHTML = "";
    }
}

// PRIKAZ PITANJA

function showQuestion(){

let question = activeQuestions[currentQuestion];


let originalQuestion =


activeQuestions[currentQuestion];

questionText.innerHTML =
questions[originalQuestion];

progressText.innerHTML =
"Pitanje " +
(currentQuestion + 1) +
" / " +
testLength;



let progress =
((currentQuestion) / testLength) * 100;


progressBar.style.width =
progress + "%";



answersButtons.forEach(function(button,index){


    button.style.background="#edf2f4";
    button.style.color="#222";



   button.onclick = function(){

userAnswers[currentQuestion] = 5 - index;

answersButtons.forEach(function(b){

    b.style.background = "#edf2f4";
    b.style.color = "#222";

});

button.style.background = "#2a9d8f";
button.style.color = "white";

setTimeout(function(){

    if(currentQuestion < testLength - 1){

        currentQuestion++;
        showQuestion();

    }else{

quizScreen.classList.add("hidden");

priorityScreen.classList.remove("hidden");

    }

}, 20);


};

});


}

// NAZAD

backBtn.onclick=function(){

if(currentQuestion > 0){

    currentQuestion--;

    showQuestion();

}


};

// REZULTATI

function calculateScore(party){

console.log("TEST", party.name);

for(let i=0;i<testLength;i++){

let originalQuestion = activeQuestions[i];

console.log(
    i,
    "Pitanje:",
    questions[originalQuestion],
    "Ti:",
    userAnswers[i],
    "Stranka:",
    party.answers[originalQuestion]
);


}

let totalDifference = 0;


for(let i = 0; i < activeQuestions.length; i++){

    let questionIndex = activeQuestions[i];


    let difference = Math.abs(
        userAnswers[i] - party.answers[questionIndex]
    );


console.log(
"Redni broj:",
i+1,
"Originalno pitanje:",
questionIndex+1,
"Ti:",
userAnswers[i],
"Stranka:",
party.answers[questionIndex],
"Razlika:",
difference
);

    totalDifference += difference;

}


let maxDifference = activeQuestions.length * 4;


let score = 
((maxDifference - totalDifference) * 100) / maxDifference;


return Number(score.toFixed(2));


}

function calculateWeightedScore(party){

let economic =
calculateCategoryScore(
    party,
    economicQuestions
);


let social =
calculateCategoryScore(
    party,
    socialQuestions
);


let foreign =


calculateCategoryScore(
party,
foreignQuestions
);

let global =
calculateCategoryScore(
party,
globalQuestions
);

let totalWeight =


economicPriority +
socialPriority +
foreignPriority / 2 +
globalPriority / 2;

let score =(
    economic * economicPriority +
    social * socialPriority +
    foreign * (foreignPriority / 2) +
    global * (globalPriority / 2))
/
totalWeight;


return Number(score.toFixed(2));


}

function showResults(){

    quizScreen.classList.add("hidden");
    priorityScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

const messages = document.getElementById("election-messages");

if(messages){

    if(currentElection === "2023-coalitions"){
        messages.classList.remove("hidden");
    }else{
        messages.classList.add("hidden");
    }

}

    progressBar.style.width = "100%";

    let results = [];

    parties.forEach(function(party){

        results.push({

            name: party.name,

            score: calculateWeightedScore(party)

        });

    });

    results.sort(function(a,b){

        return b.score - a.score;

    });

    resultsDiv.innerHTML = "";

    results.forEach(function(result,index){

        let div = document.createElement("div");

        div.className = "result-card";

        div.innerHTML =
            "<h3>" +
            (index + 1) +
            ". " +
            result.name +
            "</h3>" +

            "<p>Podudarnost: " +
            result.score +
            "%</p>";

        resultsDiv.appendChild(div);

    });

}

// PONOVI TEST

restartBtn.onclick = function(){

resultScreen.classList.add("hidden");

startScreen.classList.remove("hidden");


currentQuestion = 0;

userAnswers = [];

activeQuestions = [];

testLength = 30;


resultsDiv.innerHTML = "";


};

analysisBtn.onclick = function(){

resultScreen.classList.add("hidden");

analysisScreen.classList.remove("hidden");

showAnalysis();


};

document.getElementById("priority-next").onclick = function(){

economicPriority =
Number(document.getElementById("priority-economic").value);

socialPriority =
Number(document.getElementById("priority-social").value);


foreignPriority =
Number(document.getElementById("priority-foreign").value);

globalPriority =
Number(document.getElementById("priority-global").value);

priorityScreen.classList.add("hidden");

showResults();


};

function calculateEUScore(group) {

    let totalDifference = 0;

    for (let i = 0; i < activeQuestions.length; i++) {

        let questionIndex = activeQuestions[i];

        let userAnswer = userAnswers[i];
        let groupAnswer = group.answers[questionIndex];

        let difference = Math.abs(
            userAnswer - groupAnswer
        );

        totalDifference += difference;
    }

    let maxDifference =
        activeQuestions.length * 4;

    let score =
        ((maxDifference - totalDifference) * 100)
        / maxDifference;

    return Number(score.toFixed(2));
}

function showEuropeanGroups(){

    let box = document.getElementById("eu-results");

    if(!box){
        console.log("NEMA eu-results");
        return;
    }

    box.innerHTML = "";

    let results = [];

    europeanGroups.forEach(function(group){

        results.push({

            name: group.name,

            fullName: group.fullName,

            parties: group.parties || [],

            score: calculateEUScore(group)

        });

    });


    results.sort(function(a,b){

        return b.score - a.score;

    });


    results.forEach(function(result,index){

        let partiesHTML = "";

        if(result.parties.length > 0){

            result.parties.forEach(function(party){

                partiesHTML += `
                    <div class="eu-party">
                        ${party}
                    </div>
                `;

            });

        }else{

            partiesHTML = `
                <div class="eu-no-parties">
                    Stranke nisu navedene
                </div>
            `;

        }


        box.innerHTML += `

        <div class="eu-group-card">

            <div class="eu-group-info">

                <h3>
                    ${index + 1}. ${result.name}
                </h3>

                <p>
                    ${result.fullName}
                </p>

                <strong>
                    Podudarnost: ${result.score}%
                </strong>

            </div>


            <div class="eu-party-list">

                <h4>Stranke u grupaciji</h4>

                ${partiesHTML}

            </div>

        </div>

        `;

    });

}

const euScreen =
document.getElementById("eu-screen");

document.getElementById("eu-btn").onclick = function(){

graphScreen.classList.add("hidden");

euScreen.classList.remove("hidden");

showEuropeanGroups();


};

document.getElementById("back-graph-btn").onclick = function(){

euScreen.classList.add("hidden");

graphScreen.classList.remove("hidden");


};

const euAnalysisScreen =
    document.getElementById("eu-analysis-screen");

const backEuResultsBtn =
    document.getElementById("back-eu-results-btn");


// OTVORI DETALJNU ANALIZU EU

document.getElementById("eu-analysis-btn").onclick = function(){

    console.log("KLIK NA EU ANALIZU");

    euScreen.classList.add("hidden");

    euAnalysisScreen.classList.remove("hidden");

    showEUAnalysis();

};


// NAZAD NA EU GRUPACIJE

backEuResultsBtn.onclick = function(){

    euAnalysisScreen.classList.add("hidden");

    euScreen.classList.remove("hidden");

};

document.querySelectorAll(".restart-test-btn").forEach(function(button){

    button.onclick = function(){

        restartTest();

    };

});

const partyRatingsScreen =
    document.getElementById("party-ratings-screen");


document.getElementById("party-ratings-btn").onclick = function(){

    startScreen.classList.add("hidden");

    partyRatingsScreen.classList.remove("hidden");

    showPartyRatings();

};


document.getElementById("back-start-from-ratings-btn").onclick = function(){

    partyRatingsScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

};

function showPartyRatings(){

    const box =
        document.getElementById("party-ratings-table");

    box.innerHTML = "";

    let html = `
        <div class="ratings-table-wrapper">

        <table class="ratings-table">

            <thead>
                <tr>
                    <th>Pitanje</th>
    `;

    parties2023.forEach(function(party){

        html += `
            <th>${party.name.split(" - ")[0]}</th>
        `;

    });

    html += `
                </tr>
            </thead>

            <tbody>
    `;

    questions.forEach(function(question, questionIndex){

        html += `
            <tr>
                <td>
                    ${questionIndex + 1}. ${question}
                </td>
        `;

        parties2023.forEach(function(party){

            html += `
                <td>
                    ${party.answers[questionIndex]}
                </td>
            `;

        });

        html += `
            </tr>
        `;

    });

    html += `
            </tbody>

        </table>

        </div>
    `;

    box.innerHTML = html;

}
