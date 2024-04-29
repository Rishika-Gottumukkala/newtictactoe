document.addEventListener('DOMContentLoaded', function () {
    const boardElement = document.getElementById('board');
    const turnMessageElement = document.getElementById('turnMessage');
    const newGameBtn = document.getElementById('newGameBtn');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    function renderBoard() {
        boardElement.innerHTML = '';
        board.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value;
            cell.addEventListener('click', () => handleCellClick(index));
            boardElement.appendChild(cell);
        });

        if (!gameOver) {
            turnMessageElement.textContent = `It's ${currentPlayer}'s turn`;
        }
    }

    function handleCellClick(index) {
        if (board[index] === '' && !checkWinner() && !gameOver) {
            board[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                gameOver = true;
                const winner = currentPlayer;
                turnMessageElement.textContent = `Player ${winner} wins!`;
                showNewGamePopup(winner);
            } else if (board.every(cell => cell !== '')) {
                gameOver = true;
                turnMessageElement.textContent = "It's a draw!";
                showNewGamePopup();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }

    function showNewGamePopup(winner) {
        let message;
        if (winner) {
            message = `Player ${winner} wins!\nDo you want to start a new game?`;
        } else {
            message = `It's a draw!\nDo you want to start a new game?`;
        }

        const userResponse = confirm(message);
        if (userResponse) {
            newGame();
        }
    }

    function newGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        turnMessageElement.textContent = `It's ${currentPlayer}'s turn`;
        renderBoard();
    }

    renderBoard();
});
