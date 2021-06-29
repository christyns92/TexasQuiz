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

var finalScore = 100;
var timeLeft = 60;
var i = 0;


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

var questions = [questionNickname, questionFlower, questionCountry, questionFlags];
var answers = [];



// WHEN I click the start button
// create button 
// need a click event listener that does something when button is clicked
startButtonHtml.addEventListener("click", function() {

    questionHtml.innerHTML = questionNickname.question
    oneHtml.innerHTML = questionNickname.answer1;
    twoHtml.innerHTML = questionNickname.answer2;
    threeHtml.innerHTML = questionNickname.answer3;
    fourHtml.innerHTML = questionNickname.answer4;


    countdown();

});

// WHEN I answer a question
// user has a list of options that are buttons to choose from and one is "correct" rest are "incorrect"
// THEN I am presented with another question
// after user clicks, a pop up shows them if it's correct or incorrect
// also after user click, a new question with new option buttons to choose from comes up
// also I keep track of correct/incorrect score to present at user at the end of the quiz
console.log(finalScore + "score before user choice")

answersHtml.addEventListener("click", function(event) { //listens to 
    var targetHtmlElement = event.target;

    // Checks if the element is a button
    // if (targetHtmlElement.matches("button") === true) {
    //     console.log(targetHtmlElement + ' answer button was clicked')
    // if users clicks the button that matches the right answer, show "You chose the correct answer!"

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

    } else {
        console.log('Im sorry, your answer is Incorrect')
        var correctAnswer = document.createElement("div");
        correctAnswer.textContent = "Im sorry, your answer is incorrect";
        document.getElementById('quizContainer').appendChild(correctAnswer);
        // take 10 points away from user and keep track of that in our finalScore variable
        timeLeft = (timeLeft - 10);
        console.log(timeLeft + "score after user gets it wrong")
        setTimeout(function() {
            correctAnswer.textContent = '';
        }, 2000);
    }
    i++
    questionHtml.innerHTML = questions[i].question;
    oneHtml.innerHTML = questions[i].answer1;
    twoHtml.innerHTML = questions[i].answer2;
    threeHtml.innerHTML = questions[i].answer3;
    fourHtml.innerHTML = questions[i].answer4;

});


// THEN a timer starts a countdown from a specified time (60sec) and I am presented with a question
// timer function to start on that click event listener

function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
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



// WHEN i answer a question incorrectly time is subtracted from the clock
// user incorrect and correct answer is stored to present user at end of quiz

// WHEN all questions are answered or the timer reaches 0
// if user answers all questions BEFORE time runs out, stop time and store that time to show user at end
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score
// show user score / grade / time left on clock / initials / button that says wanna play again?