// Function to check if the board is full
function isBoardFull(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

// Function to check if the game is over
function gameOver(board) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return board[0][j];
        }
    }

    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    // Check if the board is full
    if (isBoardFull(board)) {
        return 'tie';
    }

    // If game is not over yet
    return null;
}

// Function to evaluate the score of the current board state
function evaluate(board) {
    const winner = gameOver(board);
    if (winner === 'X') {
        return 1;
    } else if (winner === 'O') {
        return -1;
    } else {
        return 0;
    }
}

// Function to implement the Minimax algorithm
function minimax(board, depth, isMaximizing) {
    const result = gameOver(board);
    if (result !== null) {
        return evaluate(board);
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    const score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    const score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

// Function to make the AI move using Minimax
function bestMove(board) {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'X';
                const score = minimax(board, 0, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }

    return move;
}

// Sample board
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Example usage
console.log("Initial Board:");
console.log(board);

const move = bestMove(board);
board[move.i][move.j] = 'X';

console.log("After AI's Move:");
console.log(board);
