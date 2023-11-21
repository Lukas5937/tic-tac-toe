const playerFactory = function() {
    let marker = "x";
    const getMarker = () => marker;
    const changeMarker = () => marker = "o";
    return function createPlayer(name) {
        getMarker()
        const playerObject = {name, marker};
        changeMarker();
        return playerObject;
    };};

const newPlayer = playerFactory();
const player1 = newPlayer("Peter");
const player2 = newPlayer("Marc");
const playerArray = [player1, player2];
console.log(playerArray);

const boardFactory = (function() {
    const boardContainer = document.querySelector(".board-container");
    const boardArray = [];
    const rows = 3;
    const cols = 3;
    let boardCell = "";
    const createBoard = function() {
        for (let i = 0; i < rows; i++) {
            boardArray[i] = [];
            for (let j = 0; j < cols; j++) {
                boardCell = document.createElement("div");
                boardArray[i].push(boardCell);
                boardCell.classList.toggle("cell");
                boardContainer.appendChild(boardCell);
            };
        };
    };
    createBoard();
    return {boardArray, rows, cols};
})();

const board = boardFactory.boardArray;
console.log(board);

const scoreFactory = (function() {
    const scoreContainer = document.querySelector(".score-container");
    const scorePlayer1Element = document.createElement("p");
    const scorePlayer2Element = document.createElement("p");
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    scorePlayer1Element.textContent = `${player1.name}: ${scorePlayer1}`;
    scorePlayer2Element.textContent = `${player2.name}: ${scorePlayer2}`;
    const createScore = function() {
        scoreContainer.appendChild(scorePlayer1Element);
        scoreContainer.appendChild(scorePlayer2Element);
    };
    const addScore = function(winner) {
        if (winner === player1.name) {
            scorePlayer1 += 1;}
        else if (winner === player2.name) {
            scorePlayer2 += 1;}
        console.log(scorePlayer1);
        console.log(scorePlayer2);
    };
    const updateScore = function() {
        scorePlayer1Element.textContent = `${player1.name}: ${scorePlayer1}`;
        scorePlayer2Element.textContent = `${player2.name}: ${scorePlayer2}`;
    };
    createScore()
    return {addScore, updateScore}
})();

const newScore = scoreFactory.addScore;
const showScore = scoreFactory.updateScore;

// this can be deleted later, it just sets names for the cells for better understanding.
//board[0] = ["s", "o", "x"];
//board[1] = ["his", "o", "hi"];
//board[2] = ["hi", "hsi", "o"];
//board[0] = ["r1 c1", "r1 c2", "r1 c3"];
//board[1] = ["r2 c1", "r2 c2", "r2 c3"];
//board[2] = ["r3 c1", "r3 c2", "r3 c3"];

const checkWinner = function() {
    const rowArray = board;
    const colArray = [];
    let diagArray = [];
    const controlArrayFactory = function() {
        for (i = 0; i < boardFactory.cols; i++) {
            const column = board.map(row => row[i]);
            colArray.push(column);
        };
        let diag1 = [];    
        for (i = 0; i < boardFactory.rows; i++) {
            const diagCell = board[i][i];
            diag1.push(diagCell);
        };
        let diag2 = []; 
        for (i = 0; i < boardFactory.rows; i++) {
            const diagCell = board[i][(boardFactory.rows-1)-i];
            diag2.push(diagCell);
        };
        diagArray = [diag1, diag2];
        return controlArrays = {rowArray, colArray, diagArray}
    };
    controlArrayFactory();
    let winnerMarker = "";
    const checkArrayFunction = function(array) {
        array.forEach(item => {
            if (item[0].innerText != "") {
                const isEqual = (cell) => cell.innerText === item[0].innerText;
                const allEqual = item.every(isEqual)
                if (allEqual) {
                    winnerMarker = item[0].innerText;
                }}});};
    const checkArrays = function() {
        checkArrayFunction(rowArray);
        checkArrayFunction(colArray);
        checkArrayFunction(diagArray);
    };
    const showWinner = function() {
        checkArrays();
        if (winnerMarker !== "") {
            const winnerObject = playerArray.filter(player => player.marker === winnerMarker);
            console.log(winnerObject);
            const winner = winnerObject[0].name;
            console.log(winner);
            newScore(winner);
            showScore();
            return winner
        };
    }
    const resetWinnerMarker = () => winnerMarker = "";
    return {showWinner, resetWinnerMarker};
};

const playGame = function() {
    const {showWinner, winnerMarker, resetWinnerMarker} = checkWinner();
    let currentMarker = player1.marker; 
    //const getCurrentMarker = () => currentMarker;
    const changeMarker = () => {
        if (currentMarker === player1.marker) {
            return currentMarker = player2.marker}
        else {return currentMarker = player1.marker}
        };
    const cells = document.querySelectorAll(".board-container > div");
    const playRound = function() {
        cells.forEach((cell) => cell.addEventListener("click", () => {
            if (cell.textContent === "") {
                cell.textContent = currentMarker;
                changeMarker();
                showWinner();
            };}));
    };
    const newRoundButton = document.querySelector(".new-round");
    const newRound = function() {
        newRoundButton.addEventListener("click", () => {
            cells.forEach((cell) => cell.textContent = "");
            currentMarker = player1.marker;
            resetWinnerMarker();
            console.log(winnerMarker);
        });
        
    }
    return {playRound, newRound}
};

game = playGame();
game.playRound();
game.newRound();
