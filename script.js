'use strict';
// Zuhal 'Alimul Hadi

let initialData = [
    {
        rank: 1,
        name: 'Natasha',
        score: 5
    },
    {
        rank: 2,
        name: 'Tony',
        score: 4
    },
    {
        rank: 3,
        name: 'Peter',
        score: 3
    },
    {
        rank: 4,
        name: 'Xavier',
        score: 2
    },
    {
        rank: 5,
        name: 'Tchala',
        score: 1
    }
]

let firstNumber;
let operator;
let operatorData = ['+', '-', '*'];
let message = document.querySelector('.message');
let secondNumber;
let resultOperation;

const tbody = document.querySelector('.table-content');
const timeLeft = document.querySelector('.time-left');
const firstNumberEl = document.getElementById('first-number');
const operatorEl = document.getElementById('operator');
const secondNumberEl = document.getElementById('second-number');

const startTimer = () => {
    timeLeft.innerText = 20;
    let value = parseInt(timeLeft.innerText);
    let interval = setInterval(()=> {
        if (value <= 0) {
            clearInterval(interval);
            return;
        }
        value -= 1;
        timeLeft.innerText = value;
    }, 1000)
}

const refreshHighScore = () => {
    tbody.innerHTML = "";
    initialData.map((data)=>{
        const row = document.createElement('tr');
        
        const rank = document.createElement('td');
        rank.innerText = data.rank;
    
        const name = document.createElement('td');
        name.innerText = data.name;
    
        const score = document.createElement('td');
        score.innerText = data.score;
    
        // append to tr
        row.appendChild(rank);
        row.appendChild(name);
        row.appendChild(score);
    
        // append to tbody
        tbody.appendChild(row);
    })
}

const refreshQuestions = () => {
    firstNumber = Math.trunc(Math.random() * 20) + 1;
    secondNumber = Math.trunc(Math.random() * 20) + 1;
    operator = operatorData[Math.trunc(Math.random() * operatorData.length)];
    
    firstNumberEl.innerText = firstNumber;
    secondNumberEl.innerText = secondNumber;
    operatorEl.innerText = operator;
    resultOperation = getResult(firstNumber, operator, secondNumber);
    console.log(resultOperation);
}

const getResult = (a, operator, b) => {
    switch (operator) {
        case "+": 
            return a+b;
        case "-":
            return a-b;
        case "*":
            return a*b;
    }
}

const init = () => {
    startTimer();
    refreshHighScore();
    refreshQuestions();
}

init();

let numberBanner = document.querySelector(".number");
const highScore = document.querySelector(".highscore");
const inputVal = document.querySelector(".guess");

let res = Math.trunc(Math.random() * 20) + 1;

const displayMessage = (message) => {
    document.querySelector(".message").innerText = message;
    return message;
}

const changeBackground = (color) => {
    document.querySelector("body").style.background = color;
    return color;
}

document.querySelector(".check").addEventListener('click', function() {
    let score = document.querySelector(".score").innerText;
    
    let isCorrect = false;

    if (!inputVal) {
        displayMessage("Enter valid number");
        return;
    }

    if (score => 0) {
        if (parseInt(inputVal.value) == parseInt(resultOperation)) {
            displayMessage("Correct Number! Congrats!")
            isCorrect = true;
            numberBanner.innerText = res;

            // handle highscore
            changeBackground("green") 
            document.querySelector(".score").innerText = parseInt(score) + 1;

            if (parseInt(document.querySelector(".score").innerText) > parseInt(highScore.innerText)) {
                highScore.innerText = document.querySelector(".score").innerText;
            }
        } else if (parseInt(inputVal.value) !== parseInt(res)) {
            displayMessage(parseInt(inputVal.value) > parseInt(res) ? "Too High" : "Too Low");
            score = parseInt(score) - 1;
            document.querySelector(".score").innerText = score;
            changeBackground("#222")
            numberBanner.innerText = "?"
        } 
    } else {
        message.innerText = "You lost the game!"
    }
})

document.querySelector(".again").addEventListener("click", function() {
    numberBanner.innerText = "?"
    displayMessage("Start guessing...")
    inputVal.value = ""
    changeBackground("#222")
    res = Math.trunc(Math.random() * 20) + 1;
    document.querySelector(".score").innerText = 20;
});