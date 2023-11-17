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

// this can be deleted later, it just sets names for the cells for better understanding.
board[0] = ["hsi", "hi", "hi"];
board[1] = ["his", "hsi", "hi"];
board[2] = ["hi", "hsi", "hsi"];
//board[0] = ["r1 c1", "r1 c2", "r1 c3"];
//board[1] = ["r2 c1", "r2 c2", "r2 c3"];
//board[2] = ["r3 c1", "r3 c2", "r3 c3"];
console.log(board);



//createPlayer factory Function
const createPlayer = function(name, marker) {
    return {name, marker}
}

const player1 = createPlayer("Peter", "x");
const player2 = createPlayer("Marc", "o");

/*
// playGame Object / gameFlowFactory
const gameFlowFactory = function() {
    let currentMarker = player1.marker;
    const getCurrentMarker = () => currentMarker;
    const changeMarker = () => {
        if (currentMarker === player1.marker) {
            return currentMarker = player2.marker}
        else return currentMarker = player1.marker};
    const setMarker = () => board[0][0] = currentMarker;
    const playRound = function() {
        getCurrentMarker();
        setMarker();
        changeMarker();
        console.log(board);
    }
    return {playRound};
};



const playGame = function() {
    const {playRound} = gameFlowFactory();
    playRound();
    };

*/


    const controlArrayFactory = function() {
        const rowArray = board;
        const colArray = [];
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
        const diagArray = [diag1, diag2];
        return {rowArray, colArray, diagArray}
    };

const checkWinner = function() {
    const {rowArray, colArray, diagArray} = controlArrayFactory();
    let winnerMarker = "";
    const checkArrayMethod = function(array) {
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
        checkArrayMethod(rowArray);
        checkArrayMethod(colArray);
        checkArrayMethod(diagArray);
    };
    const checkWinnerMarker = () => winnerMarker;
    return {checkArrays, checkWinnerMarker}
};

const check = checkWinner();
check.checkArrays();
test = check.checkWinnerMarker();
console.log(test);
