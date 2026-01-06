const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time span b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
let score = 0;
let questionCount = 0;
let correctWord, timer;

const showInstructions = () => {
    alert("Welcome to Word Scramble Game!\n\n- You have 30 seconds for each word.\n- Type the correct word based on the hint.\n- You’ll be asked 10 different questions.\n- Try to score as high as you can!\n\nGood luck!");
};

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            timeText.innerText = maxTime;
        } else {
            clearInterval(timer);
            alert(`Time's up! Correct word was: ${correctWord.toUpperCase()}`);
            nextWord();
        }
    }, 1000);
};

const scrambleWord = word => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
};

const loadWord = () => {
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let randomWord = randomObj.word;
    correctWord = randomWord.toLowerCase();
    wordText.innerText = scrambleWord(randomWord);
    hintText.innerText = randomObj.hint;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    initTimer(30);
};

const nextWord = () => {
    questionCount++;
    if (questionCount < 10) {
        loadWord();
    } else {
        endGame();
    }
};

const checkAnswer = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Please enter a word to check!");

    if (userWord === correctWord) {
        alert("Correct!");
        score++;
    } else {
        alert(`Oops! Correct word was: ${correctWord.toUpperCase()}`);
    }
    nextWord();
};

const endGame = () => {
    clearInterval(timer);
    document.querySelector(".content").innerHTML = `
        <h3>Game Over!</h3>
        <p>You scored <strong>${score}</strong> out of 10.</p>
        <button onclick="location.reload()">Play Again</button>
    `;
};

refreshBtn.addEventListener("click", loadWord);
checkBtn.addEventListener("click", checkAnswer);

window.onload = () => {
    showInstructions();
    loadWord();
};
