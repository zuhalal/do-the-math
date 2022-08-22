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
let interval;
let isLose;
let currScore;
let latestRank;

const tbody = document.querySelector('.table-content');
const timeLeft = document.querySelector('.time-left');
const firstNumberEl = document.getElementById('first-number');
const operatorEl = document.getElementById('operator');
const secondNumberEl = document.getElementById('second-number');
const submitHighScoreEl = document.getElementById('new-highscore');
const btnSubmitHighScoreEl = document.getElementById('btn-submit-highscore');

const startTimer = () => {
    timeLeft.innerText = 5;
    let value = parseInt(timeLeft.innerText);
    interval = setInterval(()=> {
        if (value <= 0) {
            clearInterval(interval);
            isLose = true;
            message.innerText = "You lost the game!"
            checkScore();
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

const checkScore = () => {
    latestRank = null;

    let sortedByLowRank = initialData.sort((a, b)=>a.score - b.score);

    sortedByLowRank.map((data)=>{
        currScore >= data.score ? latestRank = data.rank : null;
    });
    
    if (typeof latestRank === "number") {
        submitHighScoreEl.classList.toggle('hidden');
    }
}

btnSubmitHighScoreEl.addEventListener('click', ()=> updateArrayLatest(latestRank));

const updateArrayLatest = (rank) => {
    let findIndex;

    initialData = initialData.sort((a, b)=> a.rank - b.rank);
    
    initialData.map((data, index)=> {
        if (data.rank == rank) {
            findIndex = index;
            return;
        }
    })

    console.log("Find Index: " + findIndex)

    if (typeof rank === "number") {
        initialData = [...initialData.slice(0, findIndex), ...initialData.slice(findIndex + 1, initialData.length)];
        initialData = initialData.sort((a, b)=> a.rank - b.rank);
        // console.log("before: " + initialData.toString());
        initialData.splice(findIndex, 0, {
            rank: latestRank,
            name: document.getElementById("input-highscore").value,
            score: currScore
        });
        // console.log("after: " + initialData.toString());
        initialData = initialData.sort((a, b)=> a.rank - b.rank);
        refreshHighScore();
        latestRank = null;
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
    currScore = parseInt(score);

    if (!inputVal) {
        displayMessage("Enter valid number");
        return;
    }

    if (!isLose) {
        if (parseInt(inputVal.value) == parseInt(resultOperation)) {
            displayMessage("Correct Number! Congrats!")
            currScore += 1;
            document.querySelector(".score").innerText = currScore.toString();
            console.log("adsffadfsadwf " +  document.querySelector(".score").innerText);
            refreshQuestions();
            // clearInterval(interval);
            // startTimer();
        } else if (parseInt(inputVal.value) !== parseInt(res)) {
            displayMessage("Wrong answer, try again");
            refreshQuestions();
            // currScore -= 1;
            // score > 0 ? document.querySelector(".score").innerText = currScore : isLose = true;
            // clearInterval(interval);
            // startTimer();
        } 
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