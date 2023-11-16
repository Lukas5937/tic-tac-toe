const board = [];
const rows = 3;
const cols = 3;


// Create board method
for (let i = 0; i < rows; i++) {
    board[i] = ["hello"];
    for (let j = 0; j < cols; j++) {
        board[i].push("hello");
    };
};

// this can be deleted later, it jus sets names for the cells for better understanding.
board[0] = ["hi", "os", "his"];
board[1] = ["his", "his", "hi"];
board[2] = ["hi", "hsi", "hi"];
//board[0] = ["r1 c1", "r1 c2", "r1 c3"];
//board[1] = ["r2 c1", "r2 c2", "r2 c3"];
//board[2] = ["r3 c1", "r3 c2", "r3 c3"];


// here the Arrays for rows, columns and diagonals are created. They are needed in the checkWinner function.
const rowArray = board;
const colArray = [];
const diag1 = [];
const diag2 = [];

for (i = 0; i < cols; i++) {
    const column = board.map(row => row[i]);
    colArray.push(column);
};

for (i = 0; i < rows; i++) {
    const diagCell = board[i][i];
    diag1.push(diagCell);
};

for (i = 0; i < rows; i++) {
    const diagCell = board[i][(rows-1)-i];
    diag2.push(diagCell);
};
const diagArray = [diag1, diag2];

const checkWinner = function() {
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