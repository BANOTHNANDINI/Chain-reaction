document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 6;
    const board = [];
    let currentPlayer = 1;
    let gameStarted = false;
    let moveCount = 0;
    let player1Color, player2Color;

    const gameBoard = document.getElementById("game-board");
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const startButton = document.getElementById("start-button");
    const winnerMessage = document.getElementById("winner-message");

    startButton.addEventListener("click", startGame);

    function startGame() {
        gameStarted = true;
        moveCount = 0;
        initializeColors();
        initializeBoard();
        updateBoard();
        updatePlayerIndicator();
        winnerMessage.textContent = '';
    }

    function initializeColors() {
        player1Color = getRandomColor();
        player2Color = getRandomColor();
        while (player1Color === player2Color) {
            player2Color = getRandomColor();
        }
        player1.style.backgroundColor = player1Color;
        player2.style.backgroundColor = player2Color;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function initializeBoard() {
        gameBoard.innerHTML = '';
        for (let row = 0; row < boardSize; row++) {
            board[row] = [];
            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", () => handleCellClick(row, col));
                gameBoard.appendChild(cell);
                board[row][col] = { count: 0, player: 0 };
            }
        }
    }

    function handleCellClick(row, col) {
        if (!gameStarted) return;
        const cell = board[row][col];
        if (cell.player !== 0 && cell.player !== currentPlayer) return;
        cell.count++;
        cell.player = currentPlayer;
        moveCount++;
        updateBoard();
        checkExplosions(row, col);
        switchPlayer();
        if (moveCount > 2) {
            checkWinCondition();
        }
    }

    function updateBoard() {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                const cellData = board[row][col];
                cell.textContent = cellData.count > 0 ? cellData.count : '';
                cell.style.backgroundColor = getPlayerColor(cellData.player);
            }
        }
    }

    function getPlayerColor(player) {
        if (player === 1) return player1Color;
        if (player === 2) return player2Color;
        return "#fff";
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updatePlayerIndicator();
    }

    function updatePlayerIndicator() {
        player1.classList.toggle("active", currentPlayer === 1 && gameStarted);
        player2.classList.toggle("active", currentPlayer === 2 && gameStarted);
    }

    function checkExplosions(startRow, startCol) {
        const queue = [{ row: startRow, col: startCol }];

        while (queue.length > 0) {
            const { row, col } = queue.shift();
            const cell = board[row][col];
            const maxCount = getMaxCount(row, col);

            if (cell.count > maxCount) {
                const overflow = cell.count - maxCount - 1;
                cell.count = overflow >= 0 ? overflow : 0;
                cell.player = 0; 

                const neighbors = getNeighbors(row, col);
                neighbors.forEach(({ row, col }) => {
                    addOrb(row, col);
                    if (board[row][col].count > getMaxCount(row, col)) {
                        queue.push({ row, col });
                    }
                });

                updateBoard();
            }
        }
    }

    function getMaxCount(row, col) {
        if ((row === 0 || row === boardSize - 1) && (col === 0 || col === boardSize - 1)) return 1;
        if (row === 0 || row === boardSize - 1 || col === 0 || col === boardSize - 1) return 2;
        return 3;
    }

    function getNeighbors(row, col) {
        const neighbors = [];
        if (row > 0) neighbors.push({ row: row - 1, col: col });
        if (row < boardSize - 1) neighbors.push({ row: row + 1, col: col });
        if (col > 0) neighbors.push({ row: row, col: col - 1 });
        if (col < boardSize - 1) neighbors.push({ row: row, col: col + 1 });
        return neighbors;
    }

    function addOrb(row, col) {
        const cell = board[row][col];
        cell.count++;
        cell.player = currentPlayer;
    }

    function checkWinCondition() {
        let player1Orbs = 0;
        let player2Orbs = 0;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (board[row][col].player === 1) player1Orbs++;
                if (board[row][col].player === 2) player2Orbs++;
            }
        }
        if (player1Orbs === 0 || player2Orbs === 0) {
            const winner = player1Orbs === 0 ? 2 : 1;
            winnerMessage.textContent = `Player ${winner} wins! Press "Start Game" to Restart the game.`;
            gameStarted = false;
            updatePlayerIndicator();
        }
    }
});
