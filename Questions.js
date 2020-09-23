var questions = [{
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "Which event occurs when the user clicks on an HTML element?",
        choices: ["onclick ", "onmouseover", "onchange", "onmouseclick"],
        answer: "onclick "
    },

];
//Questions and correct answers saved as array variable
// Declared variables
var score = 0;
var questionIndex = 0;

//Audio for correct and incorrect answers
var sndCorrect = new Audio("./Assets/Correct.wav");
var sndWrong = new Audio("./Assets/Wrong.wav");
// Declared timer and question variables
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#container-fluid");
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");

// Seconds left is 15 seconds per question:
var secondsLeft = 60;
// Holds interval time
var holdInterval = 0;
// Holds penalty time, 10 seconds
var penalty = 10;
// Creates new ul element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen when clicking
timer.addEventListener("click", function() {

    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            //Display the timer on webpage
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                //End the test when the timer reaches 0
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
    //call render function
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // for each method to loop through question choices
    userChoices.forEach(function(newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer to evaluate if it is correct
function compare(event) {
    event.preventDefault()
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            //Play correct sound
            sndCorrect.play();
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            // Correct condition 
        } else {
            // Will deduct seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            //Play wrong sound
            sndWrong.play();
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct, " + (questions.length - score) + "/" + questions.length + " Wrong!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// Function for showing the end game page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Creat Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "The test is over!";
    questionsDiv.appendChild(createH1);

    // Creat Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and add it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        if ((timeRemaining + score) > 0) {
            createP.textContent = "Your final score is: " + (timeRemaining + score);
            questionsDiv.appendChild(createP2);
        } else {
            createP.textContent = "Your final score is 0";
            questionsDiv.appendChild(createP2);
        }
    }

    //Creat Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
    questionsDiv.appendChild(createLabel);

    // input initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and scores
    createSubmit.addEventListener("click", function(event) {
        event.preventDefault()
        var initials = createInput.value;
        if (initials === null || initials === "") {

            alert("No value entered!");

        } else {
            var finalScore = {
                    initials: initials,
                    score: timeRemaining + score
                }
                // save score
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./Scores.html");

        }
    });


}