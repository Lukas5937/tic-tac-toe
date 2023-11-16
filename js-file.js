const boardFactory = (function() {
        const boardArray = [];
        const rows = 3;
        const cols = 3;
        const createBoard = function() {
            for (let i = 0; i < rows; i++) {
                boardArray[i] = [];
                for (let j = 0; j < cols; j++) {
                    boardArray[i].push("");
                };
            };};
        createBoard();  
    return {boardArray, cols, rows};
})();

const board = boardFactory.boardArray;

/* this can be deleted later, it just sets names for the cells for better understanding.
board[0] = ["hi", "os", "his"];
board[1] = ["his", "his", "hi"];
board[2] = ["hi", "hsi", "hi"];
//board[0] = ["r1 c1", "r1 c2", "r1 c3"];
//board[1] = ["r2 c1", "r2 c2", "r2 c3"];
//board[2] = ["r3 c1", "r3 c2", "r3 c3"]; */



//createPlayer factory Function
const createPlayer = function(name, marker) {
    return {name, marker}
}

player1 = createPlayer("Peter", "x");
player2 = createPlayer("Marc", "o");

// playGame Object / gameFlowFactory
const gameFlowFactory = function() {
    let isTurn = player1;
    const playRound = function() {
    board[0][0] = isTurn.marker;
    isTurn === player1 ? isTurn = player2 : isTurn = player1;
    };
    return {playRound};
};
const game = gameFlowFactory();
game.playRound();
console.log(board);
game.playRound();
console.log(board);




//the checkWinner function will check if the game is over.
const checkWinner = function() {
    // here the Arrays for rows, columns and diagonals are created.
    const rowArray = board;
    const colArray = [];
    const diag1 = [];
    const diag2 = [];

    for (i = 0; i < boardFactory.cols; i++) {
        const column = board.map(row => row[i]);
        colArray.push(column);
    };

    for (i = 0; i < boardFactory.rows; i++) {
        const diagCell = board[i][i];
        diag1.push(diagCell);
    };

    for (i = 0; i < boardFactory.rows; i++) {
        const diagCell = board[i][(boardFactory.rows-1)-i];
        diag2.push(diagCell);
    };
    const diagArray = [diag1, diag2];

    //now it will check if there is a winner
    gameOver = false;
    const checkIfEqual = function(array) {
        array.forEach(item => {
            let isEqual = item.every(cell => cell === item[0]);
            if (isEqual) {gameOver = true};
        });
    };
    checkIfEqual(rowArray);
    checkIfEqual(colArray);
    checkIfEqual(diagArray);
    console.log(gameOver);
    };

checkWinner();