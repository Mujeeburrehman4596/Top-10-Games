
        const board = document.getElementById('board');
        const cells = document.querySelectorAll('.cell');
        const gameOverText = document.getElementById('gameOver');
        const resetBtn = document.getElementById('resetBtn');

        let currentPlayer = 'X';
        let gameActive = true;
        let boardState = ['', '', '', '', '', '', '', '', ''];

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        function handleCellClick(clickedCell, index) {
            if (boardState[index] !== '' || !gameActive) return;

            boardState[index] = currentPlayer;
            clickedCell.textContent = currentPlayer;

            checkWinner();
        }

        function checkWinner() {
            let roundWon = false;

            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') continue;
                if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                gameOverText.textContent = `Player ${currentPlayer} Wins!`;
                gameOverText.style.display = 'block';
                gameActive = false;
                highlightWinner();
                return;
            }

            if (!boardState.includes('')) {
                gameOverText.textContent = "It's a Draw!";
                gameOverText.style.display = 'block';
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        function highlightWinner() {
            winningConditions.forEach(condition => {
                const [a, b, c] = condition;
                if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                    cells[a].classList.add('winner');
                    cells[b].classList.add('winner');
                    cells[c].classList.add('winner');
                }
            });
        }

        function resetGame() {
            gameActive = true;
            currentPlayer = 'X';
            boardState = ['', '', '', '', '', '', '', '', ''];
            gameOverText.style.display = 'none';
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('winner');
            });
        }

        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(cell, index));
        });

        resetBtn.addEventListener('click', resetGame);
  