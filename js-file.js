const boardFactory = (function() {
        const container = document.querySelector(".container");
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
                    container.appendChild(boardCell);
                };
            };};
        createBoard();  
    return {boardArray};
})();

const board = boardFactory.boardArray;
console.log(board);

// this can be deleted later, it just sets names for the cells for better understanding.
//board[0] = ["s", "o", "x"];
//board[1] = ["his", "o", "hi"];
//board[2] = ["hi", "hsi", "o"];
//board[0] = ["r1 c1", "r1 c2", "r1 c3"];
//board[1] = ["r2 c1", "r2 c2", "r2 c3"];
//board[2] = ["r3 c1", "r3 c2", "r3 c3"];

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

const playGame = function() {
    let currentMarker = player1.marker; 
    //const getCurrentMarker = () => currentMarker;
    const changeMarker = () => {
        if (currentMarker === player1.marker) {
            return currentMarker = player2.marker}
        else {return currentMarker = player1.marker}
        };
    const cells = document.querySelectorAll(".container > div");
    cells.forEach((cell) => cell.addEventListener("click", () => {
        if (cell.textContent === "") {
            cell.textContent = currentMarker;
            changeMarker()
        };}));
};

const newPlayer = playerFactory();
const player1 = newPlayer("Peter");
const player2 = newPlayer("Marc");
const playerArray = [player1, player2];
console.log(playerArray);

playGame();

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
    const checkWinnerMarker = () => winnerMarker;
    const checkArrayFunction = function(array) {
        //let gameOver = false;
        array.forEach(item => {
            let isEqual = item.every(cell => cell === item[0]);
            if (isEqual) {
                //gameOver = true;
                winnerMarker = item[0];
            };
        });
    };
    const checkArrays = function() {
    checkArrayFunction(rowArray);
    checkArrayFunction(colArray);
    checkArrayFunction(diagArray);
    };
    checkArrays();
    const showWinner = function() {
        if (winnerMarker !== "") {
            const winnerObject = playerArray.filter(player => player.marker === winnerMarker);
            const winner = winnerObject[0].name;
            console.log(winner);
            return winner
        };
    };
    return showWinner();
};
