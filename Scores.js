var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});
// Retreives and save local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = "Initials: " + allScores[i].initials + "\n Score: " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// Event listener to go to index page
goBack.addEventListener("click", function() {
    window.location.replace("./index.html");
});