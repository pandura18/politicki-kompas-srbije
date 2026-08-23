const euEconomicQuestions = [];

for(let i = 0; i <= 9; i++){
    euEconomicQuestions.push(i);
}


const euSocialQuestions = [];

for(let i = 10; i <= 19; i++){
    euSocialQuestions.push(i);
}


const euForeignQuestions = [];

for(let i = 20; i <= 24; i++){
    euForeignQuestions.push(i);
}


const euGlobalQuestions = [];

for(let i = 25; i <= 29; i++){
    euGlobalQuestions.push(i);
}

function calculateEUCategoryScore(group, categoryQuestions){

    let totalDifference = 0;
    let count = 0;


    for(let i = 0; i < activeQuestions.length; i++){

        let questionIndex = activeQuestions[i];


        if(categoryQuestions.includes(questionIndex)){

            let difference = Math.abs(
                userAnswers[i] -
                group.answers[questionIndex]
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
        ((maxDifference - totalDifference) * 100)
        / maxDifference;


    return Number(score.toFixed(2));
}
function showEUAnalysis(){

    let economicBox = document.getElementById("eu-economic-results");
    let socialBox = document.getElementById("eu-social-results");
    let foreignBox = document.getElementById("eu-foreign-results");
    let globalBox = document.getElementById("eu-global-results");

    if(!economicBox || !socialBox || !foreignBox || !globalBox){
        console.log("Nedostaju EU analysis elementi");
        return;
    }

    economicBox.innerHTML = "<h3>Ekonomija</h3>";
    socialBox.innerHTML = "<h3>Društvene vrednosti</h3>";
    foreignBox.innerHTML = "<h3>Spoljna politika</h3>";
    globalBox.innerHTML = "<h3>Globalizam</h3>";


    // =========================
    // EKONOMIJA
    // =========================

    let economicResults = europeanGroups.map(function(group){

        return {
            name: group.name,
            score: calculateEUCategoryScore(
                group,
                euEconomicQuestions
            )
        };

    });

    economicResults.sort(function(a,b){
        return b.score - a.score;
    });


    // =========================
    // DRUŠTVO
    // =========================

    let socialResults = europeanGroups.map(function(group){

        return {
            name: group.name,
            score: calculateEUCategoryScore(
                group,
                euSocialQuestions
            )
        };

    });

    socialResults.sort(function(a,b){
        return b.score - a.score;
    });


    // =========================
    // SPOLJNA POLITIKA
    // =========================

    let foreignResults = europeanGroups.map(function(group){

        return {
            name: group.name,
            score: calculateEUCategoryScore(
                group,
                euForeignQuestions
            )
        };

    });

    foreignResults.sort(function(a,b){
        return b.score - a.score;
    });


    // =========================
    // GLOBALIZAM
    // =========================

    let globalResults = europeanGroups.map(function(group){

        return {
            name: group.name,
            score: calculateEUCategoryScore(
                group,
                euGlobalQuestions
            )
        };

    });

    globalResults.sort(function(a,b){
        return b.score - a.score;
    });


    // =========================
    // ISPIS
    // =========================

    economicResults.forEach(function(result,index){

        economicBox.innerHTML += `
            <div class="analysis-item">
                <b>${index + 1}. ${result.name}</b>
                <strong>${result.score}%</strong>
            </div>
        `;

    });


    socialResults.forEach(function(result,index){

        socialBox.innerHTML += `
            <div class="analysis-item">
                <b>${index + 1}. ${result.name}</b>
                <strong>${result.score}%</strong>
            </div>
        `;

    });


    foreignResults.forEach(function(result,index){

        foreignBox.innerHTML += `
            <div class="analysis-item">
                <b>${index + 1}. ${result.name}</b>
                <strong>${result.score}%</strong>
            </div>
        `;

    });


    globalResults.forEach(function(result,index){

        globalBox.innerHTML += `
            <div class="analysis-item">
                <b>${index + 1}. ${result.name}</b>
                <strong>${result.score}%</strong>
            </div>
        `;

    });

}