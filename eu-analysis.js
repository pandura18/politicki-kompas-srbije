// ============================================================
// EU-ANALYSIS.JS
// EVROPSKE GRUPACIJE + EU ANALIZA + EU GRAF
// ============================================================


// ============================================================
// EU OBLASTI
// ============================================================

const euEconomicQuestions = [];

for (let i = 0; i <= 9; i++) {

    euEconomicQuestions.push(i);

}


const euSocialQuestions = [];

for (let i = 10; i <= 19; i++) {

    euSocialQuestions.push(i);

}


const euForeignQuestions = [];

for (let i = 20; i <= 24; i++) {

    euForeignQuestions.push(i);

}


const euGlobalQuestions = [];

for (let i = 25; i <= 29; i++) {

    euGlobalQuestions.push(i);

}


// ============================================================
// EU RAČUNANJE OBLASTI
// ============================================================

function calculateEUCategoryScore(
    group,
    categoryQuestions
) {

    let totalDifference = 0;

    let count = 0;


    for (
        let i = 0;
        i < activeQuestions.length;
        i++
    ) {

        const questionIndex =
            activeQuestions[i];


        if (
            !categoryQuestions.includes(
                questionIndex
            )
        ) {

            continue;

        }


        const userAnswer =
            Number(userAnswers[i]);


        const groupAnswer =
            Number(
                group.answers[
                    questionIndex
                ]
            );


        if (
            Number.isNaN(userAnswer) ||
            Number.isNaN(groupAnswer)
        ) {

            continue;

        }


        totalDifference +=
            Math.abs(
                userAnswer -
                groupAnswer
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
            (
                maxDifference -
                totalDifference
            )
            * 100
        )
        / maxDifference;


    return Number(
        score.toFixed(2)
    );

}


// ============================================================
// UKUPAN EU REZULTAT
// ============================================================

function calculateEUScore(group) {

    const economic =
        calculateEUCategoryScore(
            group,
            euEconomicQuestions
        );


    const social =
        calculateEUCategoryScore(
            group,
            euSocialQuestions
        );


    const foreign =
        calculateEUCategoryScore(
            group,
            euForeignQuestions
        );


    const global =
        calculateEUCategoryScore(
            group,
            euGlobalQuestions
        );


    const economicWeight =
        Number(economicPriority) || 0;


    const socialWeight =
        Number(socialPriority) || 0;


    const foreignWeight =
        (
            Number(foreignPriority) ||
            0
        ) / 2;


    const globalWeight =
        (
            Number(globalPriority) ||
            0
        ) / 2;


    const totalWeight =
        economicWeight +
        socialWeight +
        foreignWeight +
        globalWeight;


    if (
        totalWeight === 0
    ) {

        return 0;

    }


    const score =
        (
            economic *
            economicWeight +

            social *
            socialWeight +

            foreign *
            foreignWeight +

            global *
            globalWeight
        )
        / totalWeight;


    return Number(
        score.toFixed(2)
    );

}


// ============================================================
// PRIKAZ EVROPSKIH GRUPACIJA
// ============================================================

function showEuropeanGroups() {

    const box =
        document.getElementById(
            "eu-results"
        );


    if (!box) return;


    box.innerHTML = "";


    if (
        !Array.isArray(europeanGroups)
    ) {

        console.error(
            "europeanGroups nije učitan."
        );

        return;

    }


    const results = [];


    europeanGroups.forEach(
        function(group) {

            results.push({

                name:
                    group.name,

                fullName:
                    group.fullName,

                parties:
                    group.parties || [],

                score:
                    calculateEUScore(
                        group
                    )

            });

        }
    );


    results.sort(
        function(a, b) {

            return b.score - a.score;

        }
    );


    results.forEach(
        function(result, index) {

            let partiesHTML = "";


            if (
                result.parties.length >
                0
            ) {

                result.parties.forEach(
                    function(party) {

                        partiesHTML += `

                            <div class="eu-party">

                                ${party}

                            </div>

                        `;

                    }
                );

            } else {

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
                            ${index + 1}.
                            ${result.name}
                        </h3>

                        <p>
                            ${result.fullName}
                        </p>

                        <strong>
                            Podudarnost:
                            ${result.score}%
                        </strong>

                    </div>

                    <div class="eu-party-list">

                        <h4>
                            Stranke u grupaciji
                        </h4>

                        ${partiesHTML}

                    </div>

                </div>

            `;

        }
    );

}


// ============================================================
// EU DETALJNA ANALIZA
// ============================================================

function printEUResults(
    id,
    data
) {

    const box =
        document.getElementById(id);


    if (!box) return;


    // Čuvamo postojeći naslov ako postoji

    const heading =
        box.querySelector("h3");


    box.innerHTML = "";


    if (heading) {

        box.appendChild(
            heading
        );

    }


    data.forEach(
        function(item, index) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "analysis-item";


            div.innerHTML = `

                <b>
                    ${index + 1}.
                </b>

                ${item.name}

                <strong>
                    ${item.score}%
                </strong>

            `;


            box.appendChild(
                div
            );

        }
    );

}


function showEUAnalysis() {

    if (
        !Array.isArray(europeanGroups)
    ) {

        return;

    }


    const economicResults = [];

    const socialResults = [];

    const foreignResults = [];

    const globalResults = [];


    europeanGroups.forEach(
        function(group) {

            economicResults.push({

                name:
                    group.name,

                score:
                    calculateEUCategoryScore(
                        group,
                        euEconomicQuestions
                    )

            });


            socialResults.push({

                name:
                    group.name,

                score:
                    calculateEUCategoryScore(
                        group,
                        euSocialQuestions
                    )

            });


            foreignResults.push({

                name:
                    group.name,

                score:
                    calculateEUCategoryScore(
                        group,
                        euForeignQuestions
                    )

            });


            globalResults.push({

                name:
                    group.name,

                score:
                    calculateEUCategoryScore(
                        group,
                        euGlobalQuestions
                    )

            });

        }
    );


    economicResults.sort(
        (a, b) =>
            b.score - a.score
    );


    socialResults.sort(
        (a, b) =>
            b.score - a.score
    );


    foreignResults.sort(
        (a, b) =>
            b.score - a.score
    );


    globalResults.sort(
        (a, b) =>
            b.score - a.score
    );


    printEUResults(
        "eu-economic-results",
        economicResults
    );


    printEUResults(
        "eu-social-results",
        socialResults
    );


    printEUResults(
        "eu-foreign-results",
        foreignResults
    );


    printEUResults(
        "eu-global-results",
        globalResults
    );

}


// ============================================================
// EU GRAF
// ============================================================

function drawEUIdeologyChart() {

    const canvas =
        document.getElementById(
            "euIdeologyChart"
        );


    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    if (!ctx) return;


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const w =
        canvas.width;

    const h =
        canvas.height;

    const margin = 60;


    // POZADINA

    ctx.fillStyle =
        "white";

    ctx.fillRect(
        0,
        0,
        w,
        h
    );


    // MREŽA

    ctx.strokeStyle =
        "#dddddd";

    ctx.lineWidth = 1;


    for (
        let i = 0;
        i <= 10;
        i++
    ) {

        const x =
            margin +
            (
                (w - 2 * margin)
                * i
                / 10
            );


        const y =
            margin +
            (
                (h - 2 * margin)
                * i
                / 10
            );


        ctx.beginPath();

        ctx.moveTo(
            x,
            margin
        );

        ctx.lineTo(
            x,
            h - margin
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            margin,
            y
        );

        ctx.lineTo(
            w - margin,
            y
        );

        ctx.stroke();

    }


    // OSE

    ctx.strokeStyle =
        "black";

    ctx.lineWidth = 2;


    ctx.beginPath();

    ctx.moveTo(
        w / 2,
        margin
    );

    ctx.lineTo(
        w / 2,
        h - margin
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        margin,
        h / 2
    );

    ctx.lineTo(
        w - margin,
        h / 2
    );

    ctx.stroke();


    // NAZIVI OSA

    ctx.font =
        "16px Arial";

    ctx.fillStyle =
        "black";


    ctx.fillText(
        "Leva ekonomija",
        20,
        h / 2 - 10
    );


    ctx.fillText(
        "Tržišna ekonomija",
        w - 180,
        h / 2 - 10
    );


    ctx.fillText(
        "Konzervativno",
        w / 2 + 10,
        30
    );


    ctx.fillText(
        "Liberalno",
        w / 2 + 10,
        h - 20
    );


    function X(value) {

        return (
            margin +
            (
                (value + 10) /
                20
            ) *
            (
                w - 2 * margin
            )
        );

    }


    function Y(value) {

        return (
            h -
            margin -
            (
                (value + 10) /
                20
            ) *
            (
                h - 2 * margin
            )
        );

    }


    // EU GRUPACIJE

    europeanGroups.forEach(
        function(group) {

            const x =
                X(group.economic);

            const y =
                Y(group.social);


            ctx.fillStyle =
                group.color ||
                "#457b9d";


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                7,
                0,
                Math.PI * 2
            );

            ctx.fill();


            ctx.fillStyle =
                "black";

            ctx.font =
                "14px Arial";


            ctx.fillText(
                group.name,
                x + 10,
                y + 5
            );

        }
    );


    // ISPITANIK

    const user =
        calculateUserIdeology();


    ctx.fillStyle =
        "red";


    ctx.beginPath();

    ctx.arc(
        X(user.economic),
        Y(user.social),
        9,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "black";

    ctx.font =
        "14px Arial";


    ctx.fillText(
        "Vi",
        X(user.economic) + 12,
        Y(user.social) - 10
    );

}

// =====================================
// EU 4 GRAFIKONA
// =====================================

// Smer svakog pitanja:
//
// +1 = odgovor 5 pomera korisnika DESNO
// -1 = odgovor 5 pomera korisnika LEVO
//
// 1-10  ekonomija
// 11-20 društvene vrednosti
// 21-25 spoljna politika
// 26-30 globalna politika

const euQuestionDirections = [
     1,  // 1  Poreze treba smanjiti
    -1,  // 2  Minimalna plata
    -1,  // 3  Penzije
    -1,  // 4  Porez zagađujućim industrijama
    -1,  // 5  Subvencije domaćoj proizvodnji
    -1,  // 6  Državna energetska preduzeća
    -1,  // 7  Veće oporezivanje bogatih
     1,  // 8  Veća konkurencija
    -1,  // 9  Kontrola cena
    -1,  // 10 Veće carine

    -1,  // 11 Abortus
    -1,  // 12 LGBT prava
     1,  // 13 Partnerstvo crkve i države
     1,  // 14 Patriotizam u školi
    -1,  // 15 Protesti
     1,  // 16 Parlamentarna monarhija
     1,  // 17 Kontrola granica
     1,  // 18 Referendumi = DESNO
     1,  // 19 Vojni rok
     1,  // 20 Veća ovlašćenja policije

    -1,  // 21 Saradnja sa SAD
    -1,  // 22 EU nema alternativu
     1,  // 23 BRIKS
     1,  // 24 Zapad negativno prema Srbiji
     1,  // 25 Kina pouzdanija od Zapada

     1,  // 26 Vojna neutralnost = SUVERENIZAM
     1,  // 27 Srebrenica
     1,  // 28 Nacionalni interes
     1,  // 29 Multipolarni svet
     1   // 30 Domaća vojna industrija
];


// =====================================
// POZICIJA KORISNIKA NA JEDNOJ OSA
// =====================================

function calculateEUUserCategory(category) {

    let indexes = [];

    if (category === "economic") {
        indexes = euEconomicQuestions;
    }

    else if (category === "social") {
        indexes = euSocialQuestions;
    }

    else if (category === "foreign") {
        indexes = euForeignQuestions;
    }

    else if (category === "global") {
        indexes = euGlobalQuestions;
    }

    if (!indexes || indexes.length === 0) {
        return 0;
    }

    let sum = 0;
    let count = 0;

    indexes.forEach(function(questionIndex) {

        // Pronalazimo gde se ovo pitanje nalazi u aktivnom testu
        let answerIndex =
            activeQuestions.indexOf(questionIndex);

        if (answerIndex === -1) {
            return;
        }

        let answer =
            Number(userAnswers[answerIndex]);

        if (isNaN(answer)) {
            return;
        }

        // 1-5 pretvaramo u:
        //
        // 1 = -10
        // 2 =  -5
        // 3 =   0
        // 4 =  +5
        // 5 = +10
        //
        // zatim primenjujemo smer konkretnog pitanja

        let direction =
            euQuestionDirections[questionIndex];

        if (direction === undefined) {
            direction = 1;
        }

        let value =
            (answer - 3) * 5 * direction;

        sum += value;
        count++;
    });

    if (count === 0) {
        return 0;
    }

    // Rezultat je u rasponu -10 do +10
    let result = sum / count;

    // Sigurnosno ograničenje
    result = Math.max(-10, Math.min(10, result));

    return Number(result.toFixed(2));
}


// =====================================
// CRTANJE JEDNOG EU LINIJSKOG GRAFA
// =====================================

function drawEULineChart(
    canvasID,
    field,
    leftText,
    rightText
) {

    const canvas =
        document.getElementById(canvasID);

    if (!canvas) {
        console.log(
            "NEMA EU CANVAS:",
            canvasID
        );
        return;
    }

    const ctx =
        canvas.getContext("2d");

    if (!ctx) {
        return;
    }


    // OSA
    const x1 = 100;
    const x2 = 700;
    const y = 70;


    // -10 = x1
    //   0 = sredina
    // +10 = x2

    function X(value) {

        value = Number(value);

        if (isNaN(value)) {
            value = 0;
        }

        // Ograničavamo na -10 do +10
        value =
            Math.max(-10, Math.min(10, value));

        return x1 +
            ((value + 10) / 20) *
            (x2 - x1);
    }


    // Očisti prethodni graf

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // =====================================
    // GLAVNA LINIJA
    // =====================================

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
        x1,
        y
    );

    ctx.lineTo(
        x2,
        y
    );

    ctx.stroke();


    // =====================================
    // SREDINA
    // =====================================

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
        X(0),
        50
    );

    ctx.lineTo(
        X(0),
        90
    );

    ctx.stroke();


    // =====================================
    // NAZIV LEVE I DESNE STRANE
    // =====================================

    ctx.font =
        "15px Arial";

    ctx.fillStyle =
        "black";

    ctx.fillText(
        leftText,
        20,
        y - 10
    );

    ctx.fillText(
        rightText,
        600,
        y - 10
    );


    // =====================================
    // EU GRUPACIJE
    // =====================================

    europeanGroups.forEach(
        function(group) {

            let value =
                Number(group[field]);

            if (isNaN(value)) {
                return;
            }

            let x =
                X(value);

            ctx.fillStyle =
                group.color ||
                "#457b9d";

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                7,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    );


    // =====================================
    // KORISNIK
    // =====================================

    let userValue =
        calculateEUUserCategory(field);

    userValue =
        Number(userValue);

    if (isNaN(userValue)) {
        userValue = 0;
    }

    userValue =
        Math.max(
            -10,
            Math.min(10, userValue)
        );


    // Crveni krug korisnika

    ctx.fillStyle =
        "red";

    ctx.beginPath();

    ctx.arc(
        X(userValue),
        y,
        9,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // =====================================
    // VREDNOST KORISNIKA
    // =====================================

    ctx.fillStyle =
        "black";

    ctx.font =
        "13px Arial";

    ctx.fillText(
        userValue.toFixed(2),
        X(userValue) - 15,
        y + 28
    );
}


// =====================================
// CRTANJE SVA 4 EU GRAFA
// =====================================

function drawEUCharts() {

    // 1. EKONOMIJA

    drawEULineChart(
        "euEconomicChart",
        "economic",
        "Leva ekonomija",
        "Tržišna ekonomija"
    );


    // 2. DRUŠTVENE VREDNOSTI

    drawEULineChart(
        "euSocialChart",
        "social",
        "Liberalno",
        "Konzervativno"
    );


    // 3. SPOLJNA POLITIKA

    drawEULineChart(
        "euForeignChart",
        "foreign",
        "Prozapadno",
        "Proruski"
    );


    // 4. GLOBALNA POLITIKA

    drawEULineChart(
        "euGlobalChart",
        "global",
        "Globalizam",
        "Suverenizam"
    );
}
