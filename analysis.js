// ============================================================
// ANALYSIS.JS
// DETALJNA ANALIZA + IDEOLOŠKA SKALA + SRPSKI GRAFICI
// ============================================================


// ============================================================
// OBLASTI
// ============================================================

const economicQuestions = [];

for (let i = 0; i <= 9; i++) {

    economicQuestions.push(i);

}


const socialQuestions = [];

for (let i = 10; i <= 19; i++) {

    socialQuestions.push(i);

}


const foreignQuestions = [];

for (let i = 20; i <= 24; i++) {

    foreignQuestions.push(i);

}


const globalQuestions = [];

for (let i = 25; i <= 29; i++) {

    globalQuestions.push(i);

}


// ============================================================
// RAČUNANJE REZULTATA OBLASTI
// ============================================================

function calculateCategoryScore(
    party,
    categoryQuestions
) {

    let totalDifference = 0;

    let count = 0;


    for (
        let i = 0;
        i < activeQuestions.length;
        i++
    ) {

        const originalQuestion =
            activeQuestions[i];


        if (
            !categoryQuestions.includes(
                originalQuestion
            )
        ) {

            continue;

        }


        const userAnswer =
            Number(userAnswers[i]);

        const partyAnswer =
            Number(
                party.answers[
                    originalQuestion
                ]
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
            (maxDifference -
            totalDifference) *
            100
        )
        / maxDifference;


    return Number(
        score.toFixed(2)
    );

}


// ============================================================
// ISPIS ANALIZE
// ============================================================

function printResults(
    id,
    data
) {

    const box =
        document.getElementById(id);


    if (!box) return;


    box.innerHTML = "";


    data.forEach(
        function(item, index) {

            box.innerHTML += `

                <div class="analysis-item">

                    <b>
                        ${index + 1}.
                    </b>

                    ${item.name}

                    <strong>
                        ${item.score}%
                    </strong>

                </div>

            `;

        }
    );

}


// ============================================================
// DETALJNA ANALIZA
// ============================================================

function showAnalysis() {

    const analysisScreen =
        document.getElementById(
            "analysis-screen"
        );


    if (analysisScreen) {

        analysisScreen.classList.remove(
            "hidden"
        );

    }


    const economicResults = [];

    const socialResults = [];

    const foreignResults = [];

    const globalResults = [];


    if (
        !Array.isArray(parties) ||
        parties.length === 0
    ) {

        return;

    }


    parties.forEach(
        function(party) {

            economicResults.push({

                name: party.name,

                score:
                    calculateCategoryScore(
                        party,
                        economicQuestions
                    )

            });


            socialResults.push({

                name: party.name,

                score:
                    calculateCategoryScore(
                        party,
                        socialQuestions
                    )

            });


            foreignResults.push({

                name: party.name,

                score:
                    calculateCategoryScore(
                        party,
                        foreignQuestions
                    )

            });


            globalResults.push({

                name: party.name,

                score:
                    calculateCategoryScore(
                        party,
                        globalQuestions
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


// ============================================================
// 2D IDEOLOŠKA POZICIJA
// ============================================================

function totalPosition(
    economic,
    social
) {

    if (
        economic <= -2 &&
        social < -5
    ) {

        return "Progresivna levica";

    }


    if (
        (
            economic <= -3 &&
            social >= -5 &&
            social <= 5
        )
        ||
        (
            economic < -2 &&
            economic >= -4 &&
            social >= 2 &&
            social <= 5
        )
    ) {

        return "Socijaldemokrata";

    }


    if (
        economic <= -2 &&
        social > 5
    ) {

        return "Socijalni konzervativac";

    }


    if (
        (
            economic >= 3 &&
            social <= -2
        )
        ||
        (
            economic <= 3 &&
            economic > -2 &&
            social < -5
        )
    ) {

        return "Liberal";

    }


    if (
        economic > -3 &&
        economic < 3 &&
        social >= -5 &&
        social < 2
    ) {

        return "Centrista";

    }


    if (
        (
            economic >= 3 &&
            social > -2 &&
            social <= 5
        )
        ||
        (
            economic <= 3 &&
            economic >= -2 &&
            social <= 5 &&
            social >= 2
        )
    ) {

        return "Desni centar";

    }


    if (
        economic > -2 &&
        social > 5
    ) {

        return "Desnica";

    }


    return "Nedefinisano";

}


// ============================================================
// POZICIJE PO OBLASTIMA
// ============================================================

function economicPosition(value) {

    if (value <= -7.14)
        return "Velika državna intervencija";

    if (value <= -4.29)
        return "Leva ekonomija";

    if (value <= -1.43)
        return "Socijalno-tržišna ekonomija";

    if (value <= 1.43)
        return "Mešovita ekonomija";

    if (value <= 4.29)
        return "Tržišna ekonomija";

    if (value <= 7.14)
        return "Slobodna tržišna ekonomija";

    return "Liberalni kapitalizam";

}


function socialPosition(value) {

    if (value <= -7.14)
        return "Vrlo liberalno";

    if (value <= -4.29)
        return "Liberalno";

    if (value <= -1.43)
        return "Umereno liberalno";

    if (value <= 1.43)
        return "Centar";

    if (value <= 4.29)
        return "Umereno konzervativno";

    if (value <= 7.14)
        return "Konzervativno";

    return "Vrlo konzervativno";

}


function foreignPosition(value) {

    if (value <= -7.14)
        return "Izrazito prozapadno";

    if (value <= -4.29)
        return "Prozapadno";

    if (value <= -1.43)
        return "Umereno prozapadno";

    if (value <= 1.43)
        return "Balansirano";

    if (value <= 4.29)
        return "Umereno proruski";

    if (value <= 7.14)
        return "Proruski";

    return "Izrazito proruski";

}


function globalPosition(value) {

    if (value <= -7.14)
        return "Izraziti globalizam";

    if (value <= -4.29)
        return "Globalizam";

    if (value <= -1.43)
        return "Umereni globalizam";

    if (value <= 1.43)
        return "Balansirano";

    if (value <= 4.29)
        return "Umereni suverenizam";

    if (value <= 7.14)
        return "Suverenizam";

    return "Izraziti suverenizam";

}


// ============================================================
// PITANJA KOJA IDU U POZITIVNOM SMERU
// ============================================================

const positiveQuestions = [

    0,
    7,
    12,
    13,
    15,
    16,
    17,
    18,
    19,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29

];


// ============================================================
// RAČUNANJE IDEOLOŠKE POZICIJE
// ============================================================

function calculatePosition(
    questionIndexes
) {

    let positiveSum = 0;

    let negativeSum = 0;

    let positiveCount = 0;

    let negativeCount = 0;


    for (
        let i = 0;
        i < activeQuestions.length;
        i++
    ) {

        const originalQuestion =
            activeQuestions[i];


        if (
            !questionIndexes.includes(
                originalQuestion
            )
        ) {

            continue;

        }


        const answer =
            Number(userAnswers[i]);


        if (
            Number.isNaN(answer)
        ) {

            continue;

        }


        if (
            positiveQuestions.includes(
                originalQuestion
            )
        ) {

            positiveSum += answer;

            positiveCount++;

        } else {

            negativeSum += answer;

            negativeCount++;

        }

    }


    const totalCount =
        positiveCount +
        negativeCount;


    if (totalCount === 0) {

        return 0;

    }


    const score =
        (
            (
                positiveSum -
                3 * positiveCount
            )
            -
            (
                negativeSum -
                3 * negativeCount
            )
        )
        * 5
        / totalCount;


    return Number(
        score.toFixed(2)
    );

}


// ============================================================
// IDEOLOGIJA ISPITANIKA
// ============================================================

function calculateUserIdeology() {

    return {

        total:
            calculatePosition([
                0,1,2,3,4,
                5,6,7,8,9,
                10,11,12,13,14,
                15,16,17,18,19,
                20,21,22,23,24,
                25,26,27,28,29
            ]),

        economic:
            calculatePosition([
                0,1,2,3,4,
                5,6,7,8,9
            ]),

        social:
            calculatePosition([
                10,11,12,13,14,
                15,16,17,18,19
            ]),

        foreign:
            calculatePosition([
                20,21,22,23,24
            ]),

        global:
            calculatePosition([
                25,26,27,28,29
            ])

    };

}


// ============================================================
// IDEOLOŠKA SKALA
// ============================================================

function showIdeologyScale() {

    const table =
        document.getElementById(
            "scale-table"
        );


    if (!table) return;


    table.innerHTML = "";


    const user =
        calculateUserIdeology();


    const rows = [];


    rows.push({

        name: "Ispitanik",

        total:
            totalPosition(
                user.economic,
                user.social
            ),

        economic:
            economicPosition(
                user.economic
            ),

        social:
            socialPosition(
                user.social
            ),

        foreign:
            foreignPosition(
                user.foreign
            ),

        global:
            globalPosition(
                user.global
            )

    });


    if (Array.isArray(parties)) {

        parties.forEach(
            function(party) {

                rows.push({

                    name: party.name,

                    total:
                        totalPosition(
                            party.economic,
                            party.social
                        ),

                    economic:
                        economicPosition(
                            party.economic
                        ),

                    social:
                        socialPosition(
                            party.social
                        ),

                    foreign:
                        foreignPosition(
                            party.foreign
                        ),

                    global:
                        globalPosition(
                            party.global
                        )

                });

            }
        );

    }


    rows.forEach(
        function(row) {

            table.innerHTML += `

                <tr>

                    <td>
                        ${row.name}
                    </td>

                    <td>
                        ${row.total}
                    </td>

                    <td>
                        ${row.economic}
                    </td>

                    <td>
                        ${row.social}
                    </td>

                    <td>
                        ${row.foreign}
                    </td>

                    <td>
                        ${row.global}
                    </td>

                </tr>

            `;

        }
    );

}


// ============================================================
// GLAVNI IDEOLOŠKI GRAF
// ============================================================

function drawIdeologyChart() {

    const canvas =
        document.getElementById(
            "ideologyChart"
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


    const w = canvas.width;

    const h = canvas.height;

    const margin = 60;


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


    // OSE

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


    // STRANKE

    if (Array.isArray(parties)) {

        parties.forEach(
            function(party) {

                ctx.fillStyle =
                    party.color ||
                    "blue";


                ctx.beginPath();

                ctx.arc(
                    X(party.economic),
                    Y(party.social),
                    6,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }
        );

    }


    // MALI GRAFICI

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


// ============================================================
// MALI GRAFICI
// ============================================================

function drawLineChart(
    canvasID,
    field,
    leftText,
    rightText
) {

    const canvas =
        document.getElementById(
            canvasID
        );


    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    if (!ctx) return;


    const x1 = 100;

    const x2 = 700;

    const y = 70;


    function X(value) {

        return (
            x1 +
            (
                (value + 10) /
                20
            ) *
            (
                x2 - x1
            )
        );

    }


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // LINIJA

    ctx.strokeStyle =
        "black";

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


    // SREDINA

    ctx.lineWidth = 1;


    ctx.beginPath();

    ctx.moveTo(
        400,
        50
    );

    ctx.lineTo(
        400,
        90
    );

    ctx.stroke();


    // STRANKE

    const partyPoints = [];


    if (Array.isArray(parties)) {

        parties.forEach(
            function(party) {

                const value =
                    Number(
                        party[field]
                    );


                if (
                    Number.isNaN(value)
                ) {

                    return;

                }


                const point = {

                    x: X(value),

                    y: y,

                    value: value,

                    name: party.name,

                    color:
                        party.color ||
                        "blue"

                };


                partyPoints.push(
                    point
                );


                ctx.fillStyle =
                    point.color;


                ctx.beginPath();

                ctx.arc(
                    point.x,
                    point.y,
                    7,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }
        );

    }


    // ISPITANIK

    const user =
        calculateUserIdeology();


    const userValue =
        Number(user[field]);


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


    ctx.fillStyle =
        "black";

    ctx.font =
        "14px Arial";


    ctx.fillText(
        "VI",
        X(userValue) + 12,
        y - 12
    );


    // NAZIVI

    ctx.font =
        "16px Arial";

    ctx.fillStyle =
        "black";


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


    // TOOLTIP

    const tooltip =
        document.getElementById(
            "chart-tooltip"
        );


    if (!tooltip) return;


    canvas.onmousemove =
        function(event) {

            const rect =
                canvas.getBoundingClientRect();


            const mouseX =
                (
                    event.clientX -
                    rect.left
                )
                *
                (
                    canvas.width /
                    rect.width
                );


            const mouseY =
                (
                    event.clientY -
                    rect.top
                )
                *
                (
                    canvas.height /
                    rect.height
                );


            const found =
                partyPoints.filter(
                    function(point) {

                        const distance =
                            Math.sqrt(
                                Math.pow(
                                    mouseX -
                                    point.x,
                                    2
                                )
                                +
                                Math.pow(
                                    mouseY -
                                    point.y,
                                    2
                                )
                            );


                        return distance <= 15;

                    }
                );


            if (
                found.length === 0
            ) {

                tooltip.style.display =
                    "none";

                canvas.style.cursor =
                    "default";

                return;

            }


            tooltip.innerHTML = "";


            found.forEach(
                function(point) {

                    const row =
                        document.createElement(
                            "div"
                        );


                    row.style.display =
                        "flex";

                    row.style.alignItems =
                        "center";

                    row.style.gap =
                        "7px";


                    const color =
                        document.createElement(
                            "span"
                        );


                    color.style.width =
                        "10px";

                    color.style.height =
                        "10px";

                    color.style.borderRadius =
                        "50%";

                    color.style.background =
                        point.color;


                    const text =
                        document.createElement(
                            "span"
                        );


                    text.textContent =
                        point.name +
                        " — " +
                        point.value.toFixed(2);


                    row.appendChild(
                        color
                    );

                    row.appendChild(
                        text
                    );

                    tooltip.appendChild(
                        row
                    );

                }
            );


            if (
                mouseX <
                canvas.width / 2
            ) {

                tooltip.style.left =
                    (
                        event.clientX +
                        15
                    ) + "px";

            } else {

                tooltip.style.left =
                    (
                        event.clientX -
                        250
                    ) + "px";

            }


            tooltip.style.top =
                (
                    event.clientY +
                    15
                ) + "px";


            tooltip.style.display =
                "block";


            canvas.style.cursor =
                "pointer";

        };


    canvas.onmouseleave =
        function() {

            tooltip.style.display =
                "none";

            canvas.style.cursor =
                "default";

        };

}


// ============================================================
// LEGENDA
// ============================================================

function createLegend2D() {

    const legend =
        document.getElementById(
            "partyLegend"
        );


    if (!legend) return;


    legend.innerHTML = "";


    if (!Array.isArray(parties)) {
        return;
    }


    parties.forEach(
        function(party) {

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
                        background:${party.color || "blue"};
                        display:inline-block;
                        margin-right:5px;
                        border-radius:2px;
                    "></span>

                    ${party.name.split(" - ")[0]}

                </span>

            `;

        }
    );

}
