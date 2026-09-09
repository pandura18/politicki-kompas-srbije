// ============================================================
// POLITIČKI KOMPAS SRBIJE
// script.js
// ============================================================

console.log("SCRIPT.JS JE UCITAN");


// ============================================================
// STANJE TESTA
// ============================================================

let currentQuestion = 0;
let activeQuestions = [];
let userAnswers = [];
let testLength = 0;

let currentElection = null;
let parties = [];

let economicPriority = 10;
let socialPriority = 10;
let foreignPriority = 10;
let globalPriority = 10;


// ============================================================
// DOM ELEMENTI
// ============================================================

const startScreen =
    document.getElementById("start-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const priorityScreen =
    document.getElementById("priority-screen");

const resultScreen =
    document.getElementById("result-screen");

const analysisScreen =
    document.getElementById("analysis-screen");

const scaleScreen =
    document.getElementById("scale-screen");

const graphScreen =
    document.getElementById("graph-screen");

const euScreen =
    document.getElementById("eu-screen");

const euAnalysisScreen =
    document.getElementById("eu-analysis-screen");

const euGraphScreen =
    document.getElementById("eu-graph-screen");

const partyRatingsScreen =
    document.getElementById("party-ratings-screen");

const questionText =
    document.getElementById("question-text");

const progressText =
    document.getElementById("progress-text");

const progressBar =
    document.getElementById("progress-bar");

const resultsDiv =
    document.getElementById("results");

const answersButtons =
    document.querySelectorAll(".answer");

const backBtn =
    document.getElementById("back-btn");

const priorityNext =
    document.getElementById("priority-next");


// ============================================================
// POMOĆNE FUNKCIJE
// ============================================================

function hideAllScreens() {

    document
        .querySelectorAll(".card")
        .forEach(function(screen) {
            screen.classList.add("hidden");
        });

}


function showScreen(screen) {

    if (!screen) return;

    hideAllScreens();

    screen.classList.remove("hidden");

}


// ============================================================
// IZBOR TESTA
// ============================================================

const elections2023Coalitions =
    document.getElementById("elections-2023-coalitions");

if (elections2023Coalitions) {

    elections2023Coalitions.onclick = function() {

        console.log("IZBOR: IZBORI 2023 - KOALICIJE");

        currentElection = "2023-coalitions";

        parties = parties2023Coalitions;

        startTest();

    };

}


const elections2023Parties =
    document.getElementById("elections-2023-parties");

if (elections2023Parties) {

    elections2023Parties.onclick = function() {

        console.log("IZBOR: IZBORI 2023 - SVE STRANKE");

        currentElection = "2023-parties";

        parties = parties2023;

        startTest();

    };

}


const elections2026 =
    document.getElementById("elections-2026");

if (elections2026) {

    elections2026.onclick = function() {

        alert(
            "Izbori 2026. godine još nisu raspisani."
        );

    };

}


// ============================================================
// POKRETANJE TESTA
// ============================================================

function startTest() {

    console.log("POKREĆEM TEST");

    currentQuestion = 0;

    userAnswers = [];

    activeQuestions = [];

    if (!Array.isArray(questions)) {

        console.error(
            "Greška: questions nije niz."
        );

        alert(
            "Greška pri učitavanju pitanja."
        );

        return;
    }


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        activeQuestions.push(i);

    }


    testLength =
        activeQuestions.length;


    console.log(
        "Broj pitanja:",
        testLength
    );


    if (!parties || parties.length === 0) {

        console.error(
            "Greška: nije učitana lista stranaka."
        );

        alert(
            "Greška pri učitavanju političkih opcija."
        );

        return;
    }


    showScreen(quizScreen);

    showQuestion();

}


// ============================================================
// PRIKAZ PITANJA
// ============================================================

function showQuestion() {

    if (
        currentQuestion < 0 ||
        currentQuestion >= testLength
    ) {
        return;
    }


    const originalQuestion =
        activeQuestions[currentQuestion];


    questionText.textContent =
        questions[originalQuestion];


    progressText.textContent =
        "Pitanje " +
        (currentQuestion + 1) +
        " / " +
        testLength;


    const progress =
        (currentQuestion / testLength) * 100;


    progressBar.style.width =
        progress + "%";


    answersButtons.forEach(
        function(button, index) {

            button.style.background =
                "#edf2f4";

            button.style.color =
                "#222";


            button.onclick = function() {

                userAnswers[currentQuestion] =
                    5 - index;


                answersButtons.forEach(
                    function(otherButton) {

                        otherButton.style.background =
                            "#edf2f4";

                        otherButton.style.color =
                            "#222";

                    }
                );


                button.style.background =
                    "#2a9d8f";

                button.style.color =
                    "white";


                setTimeout(
                    function() {

                        if (
                            currentQuestion <
                            testLength - 1
                        ) {

                            currentQuestion++;

                            showQuestion();

                        } else {

                            showPriorityScreen();

                        }

                    },
                    150
                );

            };

        }
    );

}


// ============================================================
// PRIORITETI
// ============================================================

function showPriorityScreen() {

    showScreen(priorityScreen);

}


if (priorityNext) {

    priorityNext.onclick = function() {

        economicPriority =
            Number(
                document.getElementById(
                    "priority-economic"
                ).value
            );

        socialPriority =
            Number(
                document.getElementById(
                    "priority-social"
                ).value
            );

        foreignPriority =
            Number(
                document.getElementById(
                    "priority-foreign"
                ).value
            );

        globalPriority =
            Number(
                document.getElementById(
                    "priority-global"
                ).value
            );


        console.log(
            "PRIORITETI:",
            economicPriority,
            socialPriority,
            foreignPriority,
            globalPriority
        );


        showResults();

    };

}


// ============================================================
// NAZAD
// ============================================================

if (backBtn) {

    backBtn.onclick = function() {

        if (currentQuestion > 0) {

            currentQuestion--;

            showQuestion();

        }

    };

}


// ============================================================
// OSNOVNO RAČUNANJE PODUDARNOSTI
// ============================================================

function calculateScore(party) {

    let totalDifference = 0;

    let count = 0;


    for (
        let i = 0;
        i < activeQuestions.length;
        i++
    ) {

        const questionIndex =
            activeQuestions[i];

        const userAnswer =
            Number(userAnswers[i]);

        const partyAnswer =
            Number(
                party.answers[questionIndex]
            );


        if (
            Number.isNaN(userAnswer) ||
            Number.isNaN(partyAnswer)
        ) {
            continue;
        }


        totalDifference +=
            Math.abs(
                userAnswer -
                partyAnswer
            );

        count++;

    }


    if (count === 0) {

        return 0;

    }


    const maxDifference =
        count * 4;


    const score =
        (
            (maxDifference - totalDifference)
            * 100
        )
        / maxDifference;


    return Number(
        score.toFixed(2)
    );

}


// ============================================================
// TEŽINSKI REZULTAT
// ============================================================

function calculateWeightedScore(party) {

    const economic =
        calculateCategoryScore(
            party,
            economicQuestions
        );

    const social =
        calculateCategoryScore(
            party,
            socialQuestions
        );

    const foreign =
        calculateCategoryScore(
            party,
            foreignQuestions
        );

    const global =
        calculateCategoryScore(
            party,
            globalQuestions
        );


    const economicWeight =
        Number(economicPriority) || 0;

    const socialWeight =
        Number(socialPriority) || 0;

    const foreignWeight =
        (Number(foreignPriority) || 0) / 2;

    const globalWeight =
        (Number(globalPriority) || 0) / 2;


    const totalWeight =
        economicWeight +
        socialWeight +
        foreignWeight +
        globalWeight;


    if (totalWeight === 0) {

        return 0;

    }


    const score =
        (
            economic * economicWeight +
            social * socialWeight +
            foreign * foreignWeight +
            global * globalWeight
        )
        / totalWeight;


    return Number(
        score.toFixed(2)
    );

}


// ============================================================
// REZULTATI
// ============================================================

function showResults() {

    console.log("PRIKAZ REZULTATA");


    showScreen(resultScreen);


    const messages =
        document.getElementById(
            "election-messages"
        );


    if (messages) {

        if (
            currentElection ===
            "2023-coalitions"
        ) {

            messages.classList.remove(
                "hidden"
            );

        } else {

            messages.classList.add(
                "hidden"
            );

        }

    }


    if (progressBar) {

        progressBar.style.width =
            "100%";

    }


    const results = [];


    parties.forEach(
        function(party) {

            results.push({

                name: party.name,

                score:
                    calculateWeightedScore(
                        party
                    )

            });

        }
    );


    results.sort(
        function(a, b) {

            return b.score - a.score;

        }
    );


    resultsDiv.innerHTML = "";


results.forEach(
    function(result, index) {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "result-card";

        let recommendation = "";

        if (result.score > 70) {

            div.classList.add(
                "recommended"
            );

            recommendation =
                "Veoma velika preporuka";

        } else if (result.score >= 50) {

            div.classList.add(
                "moderate"
            );

            recommendation =
                "Dobra opcija";

        } else {

            div.classList.add(
                "not-recommended"
            );

            recommendation =
                "Ne preporučuje se glasanje za njih";
        }

        div.innerHTML =

            "<h3>" +
            (index + 1) +
            ". " +
            result.name +
            "</h3>" +

            "<p>" +
            "Podudarnost: " +
            result.score +
            "%" +
            "</p>" +

            "<p class=\"recommendation\">" +
            recommendation +
            "</p>";

        resultsDiv.appendChild(
            div
        );

    }
);


    createResultNavigation();

}


// ============================================================
// PONOVI TEST
// ============================================================

function restartTest() {

    console.log("PONOVO POKRETANJE TESTA");


    currentQuestion = 0;

    activeQuestions = [];

    userAnswers = [];

    testLength = questions.length;

    currentElection = null;

    parties = [];


    if (resultsDiv) {

        resultsDiv.innerHTML = "";

    }


    hideAllScreens();

    startScreen.classList.remove(
        "hidden"
    );

}


// ============================================================
// NAVIGACIJA REZULTATA
// ============================================================

const resultPages = [

    {
        id: "result-screen",
        title: "Rezultati"
    },

    {
        id: "analysis-screen",
        title: "Detaljna analiza"
    },

    {
        id: "scale-screen",
        title: "Ideološka skala"
    },

    {
        id: "graph-screen",
        title: "Grafički prikaz"
    },

    {
        id: "eu-screen",
        title: "Evropske grupacije"
    },

    {
        id: "eu-analysis-screen",
        title: "Detaljna analiza EU grupacija"
    },

    {
        id: "eu-graph-screen",
        title: "Grafički prikaz EU grupacija"
    }

];


function createResultNavigation() {

    resultPages.forEach(
        function(page) {

            const screen =
                document.getElementById(
                    page.id
                );


            if (!screen) return;


            let navigation =
                screen.querySelector(
                    ".result-navigation"
                );


            if (!navigation) {

                navigation =
                    document.createElement(
                        "div"
                    );

                navigation.className =
                    "result-navigation";

                screen.appendChild(
                    navigation
                );

            }


            navigation.innerHTML = "";


            resultPages.forEach(
                function(otherPage) {

                    if (
                        otherPage.id ===
                        page.id
                    ) {
                        return;
                    }


                    const button =
                        document.createElement(
                            "button"
                        );


                    button.textContent =
                        otherPage.title;


                    button.onclick =
                        function() {

                            openResultPage(
                                otherPage.id
                            );

                        };


                    navigation.appendChild(
                        button
                    );

                }
            );


            const restartButton =
                document.createElement(
                    "button"
                );


            restartButton.textContent =
                "Ponovi test";


            restartButton.onclick =
                function() {

                    restartTest();

                };


            navigation.appendChild(
                restartButton
            );

        }
    );

}


function openResultPage(pageId) {

    hideAllScreens();


    const screen =
        document.getElementById(
            pageId
        );


    if (!screen) {

        console.error(
            "Nepostojeća stranica:",
            pageId
        );

        return;

    }


    screen.classList.remove(
        "hidden"
    );


    // SRPSKA DETALJNA ANALIZA

    if (
        pageId ===
        "analysis-screen"
    ) {

        if (
            typeof showAnalysis ===
            "function"
        ) {

            showAnalysis();

        }

    }


    // IDEOLOŠKA SKALA

    if (
        pageId ===
        "scale-screen"
    ) {

        if (
            typeof showIdeologyScale ===
            "function"
        ) {

            showIdeologyScale();

        }

    }


    // SRPSKI GRAFIK

    if (
        pageId ===
        "graph-screen"
    ) {

        if (
            typeof drawIdeologyChart ===
            "function"
        ) {

            drawIdeologyChart();

        }

        if (
            typeof createLegend2D ===
            "function"
        ) {

            createLegend2D();

        }

    }


    // EU GRUPACIJE

    if (
        pageId ===
        "eu-screen"
    ) {

        if (
            typeof showEuropeanGroups ===
            "function"
        ) {

            showEuropeanGroups();

        }

    }


    // EU DETALJNA ANALIZA

    if (
        pageId ===
        "eu-analysis-screen"
    ) {

        if (
            typeof showEUAnalysis ===
            "function"
        ) {

            showEUAnalysis();

        }

    }


    // EU GRAF

    if (
        pageId ===
        "eu-graph-screen"
    ) {

        if (
            typeof drawEUIdeologyChart ===
            "function"
        ) {

            drawEUIdeologyChart();

        }
if (typeof drawEUCharts === "function") {
    drawEUCharts();
}

    }

}


// ============================================================
// OCENE STRANAKA
// ============================================================

const partyRatingsBtn =
    document.getElementById(
        "party-ratings-btn"
    );


const backStartFromRatingsBtn =
    document.getElementById(
        "back-start-from-ratings-btn"
    );


if (partyRatingsBtn) {

    partyRatingsBtn.onclick =
        function() {

            showScreen(
                partyRatingsScreen
            );

            showPartyRatings();

        };

}


if (backStartFromRatingsBtn) {

    backStartFromRatingsBtn.onclick =
        function() {

            showScreen(
                startScreen
            );

        };

}


function showPartyRatings() {

    const box =
        document.getElementById(
            "party-ratings-table"
        );


    if (!box) return;


    box.innerHTML = "";


    let html =

        '<div class="ratings-table-wrapper">' +

        '<table class="ratings-table">' +

        '<thead>' +

        '<tr>' +

        '<th>Pitanje</th>';


    parties2023.forEach(
        function(party) {

            html +=

                "<th>" +
                party.name.split(
                    " - "
                )[0] +
                "</th>";

        }
    );


    html +=

        "</tr>" +

        "</thead>" +

        "<tbody>";


    questions.forEach(
        function(
            question,
            questionIndex
        ) {

            html +=

                "<tr>" +

                "<td>" +
                (questionIndex + 1) +
                ". " +
                question +
                "</td>";


            parties2023.forEach(
                function(party) {

                    html +=

                        "<td>" +
                        party.answers[
                            questionIndex
                        ] +
                        "</td>";

                }
            );


            html +=
                "</tr>";

        }
    );


    html +=

        "</tbody>" +

        "</table>" +

        "</div>";


    box.innerHTML =
        html;

}


// ============================================================
// INICIJALIZACIJA
// ============================================================

createResultNavigation();


console.log(
    "Broj pitanja:",
    Array.isArray(questions)
        ? questions.length
        : "GREŠKA"
);

console.log(
    "Partije 2023:",
    Array.isArray(parties2023)
        ? parties2023.length
        : "GREŠKA"
);

console.log(
    "Koalicije 2023:",
    Array.isArray(parties2023Coalitions)
        ? parties2023Coalitions.length
        : "GREŠKA"
);

console.log(
    "SCRIPT.JS USPEŠNO ZAVRŠIO UČITAVANJE"
);
