console.log('TexasQuiz');

// global
var startButtonHtml = document.querySelector("#startButton");
var quizContainerHtml = document.querySelector("#quizContainer");
var questionHtml = document.querySelector("#question");
var answersHtml = document.querySelector("#answers");
var oneHtml = document.querySelector("#oneHtml");
var twoHtml = document.querySelector("#twoHtml");
var threeHtml = document.querySelector("#threeHtml");
var fourHtml = document.querySelector("#fourHtml");
var counterHtml = document.querySelector("#counterHtml");
var scoreKeeperHtml = document.querySelector("#scoreKeeper");
var finalScoreHtml = document.querySelector("#finalScore");
var keeperButtonHtml = document.querySelector("#keeperButton");
var initialsHtml = document.querySelector("#initials");
var scoreboardHtml = document.querySelector("#scoreboard");

// setting variables fir score and timer
var finalScore = 100;
var timeLeft = 60;
var i = 0;

var scoreKeeperArray = [];

// getting local variables from scorekeeperarray
function getLocal(scoreKeeperArray) {
    if (localStorage.getItem("ending score") === null) {
        return scoreKeeperArray;
    } else {
        return JSON.parse(localStorage.getItem("ending score"));
    }

}

// sorting, reversing, and returning scorekeeperarray
function sort(scoreKeeperArray) {
    scoreKeeperArray = scoreKeeperArray.sort(function(a, b) { return a.score - b.score });
    scoreKeeperArray = scoreKeeperArray.reverse();
    return scoreKeeperArray;
}

// definining questions as variables and listing answers
var questionNickname = {
    question: 'What nickname is Texas popularly known by?',
    answer1: 'The Bluebonnet State',
    answer2: 'The Alamo State',
    answer3: 'The Lone Star State', //correct answer 
    answer4: 'The Howdy State'
};

var questionFlower = {
    question: 'What is the designated state flower of Texas?',
    answer1: 'Sunflower',
    answer2: 'Bluebonnet', //correct answer
    answer3: 'Rose',
    answer4: 'Gardenia'
};

var questionCountry = {
    question: 'Throughout what years was Texas its own country?',
    answer1: '1836-1845', //correct answer
    answer2: '1873-1890',
    answer3: '1824-1848',
    answer4: '1830-1857'
};

var questionFlags = {
    question: 'How many flags have flown over Texas?',
    answer1: 1,
    answer2: 8,
    answer3: 6, //correct answer
    answer4: 2
};

// creating question variable array
var questions = [questionNickname, questionFlower, questionCountry, questionFlags];
var answers = [];

// creating click event listener that does something when button is clicked
startButtonHtml.addEventListener("click", function() {

    questionHtml.innerHTML = questionNickname.question
    oneHtml.innerHTML = questionNickname.answer1;
    twoHtml.innerHTML = questionNickname.answer2;
    threeHtml.innerHTML = questionNickname.answer3;
    fourHtml.innerHTML = questionNickname.answer4;

    countdown();

});

//console logging final score 
console.log(finalScore + "score before user choice")

answersHtml.addEventListener("click", function(event) { //listens to 
    var targetHtmlElement = event.target;


    //identifying if user answer is correct and displaying message
    if (((targetHtmlElement.matches('#threeHtml')) && (threeHtml.innerHTML == questionNickname.answer3)) || ((targetHtmlElement.matches('#twoHtml')) && (twoHtml.innerHTML == questionFlower.answer2)) || ((targetHtmlElement.matches('#oneHtml')) && (oneHtml.innerHTML == questionCountry.answer1)) ||
        ((targetHtmlElement.matches('#threeHtml')) && (threeHtml.innerHTML == questionFlags.answer3))) {
        console.log('Your answer is correct!');
        var correctAnswer = document.createElement("div");
        correctAnswer.textContent = "Your answer is correct!";
        document.getElementById('quizContainer').appendChild(correctAnswer);
        // add plus one to correct array
        setTimeout(function() {
            correctAnswer.textContent = '';
        }, 2000);

        //identifying if user answer is incorrect, decrementing score and displaying message
    } else {
        console.log('Im sorry, your answer is Incorrect')
        var correctAnswer = document.createElement("div");
        correctAnswer.textContent = "Im sorry, your answer is incorrect";
        document.getElementById('quizContainer').appendChild(correctAnswer);
        // take 10 points away from user and keep track of that in our finalScore variable
        timeLeft = (timeLeft - 10);
        finalScore = (finalScore - 10);
        console.log(timeLeft + "score after user gets it wrong")
        setTimeout(function() {
            correctAnswer.textContent = '';
        }, 2000);
    }
    i++;

    // if all questions have been answered, display completed message
    if (questions.length == i) {
        finalScoreHtml.innerHTML = "Congrats! You have completed the quiz. Here is your final score " + finalScore;
        clearInterval(timeInterval);

        // creating button to obtain initials and display final score
        keeperButtonHtml.addEventListener("click", function() {
            console.log("test");
            scoreKeeperArray = getLocal(scoreKeeperArray);
            var scoreKeeper = {
                initials: initialsHtml.value,
                score: finalScore
            }
            scoreKeeperArray.push(scoreKeeper);
            scoreKeeperArray = sort(scoreKeeperArray);

            for (var i = 0; i < scoreKeeperArray.length; i++) {
                var c = scoreKeeperArray[i];

                var scoreLi = document.createElement("li");
                scoreLi.textContent = "scoreboard: " + c.score + " name: " + c.initials;
                scoreboardHtml.appendChild(scoreLi);

            }

            localStorage.setItem("ending score", JSON.stringify(scoreKeeperArray));
        })
    }

    questionHtml.innerHTML = questions[i].question;
    oneHtml.innerHTML = questions[i].answer1;
    twoHtml.innerHTML = questions[i].answer2;
    threeHtml.innerHTML = questions[i].answer3;
    fourHtml.innerHTML = questions[i].answer4;

});

// creates timer and displays how long user has left
var timeInterval = "";

function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function() {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            counterHtml.innerHTML = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            counterHtml.innerHTML = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            counterHtml.innerHTML = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            // Call the `displayMessage()` function
        }
    }, 1000);
}