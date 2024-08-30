const gameboard = (function () {
    const board = Array(9).fill(null);
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],

    ]

    const resetBoard = () => {
        board.fill(null);
    }

    const setCell = (index, value) => {
        const upperValue = value.toUpperCase();
        if (index > 8 || index < 0) {
            console.error("Invalid index! Please enter a number between 0 and 8.");
            return false;
        }

        if (upperValue !== 'X' && upperValue !== 'O') {
            console.error("Invalid value! Please enter 'X' or 'O'.");
            return false;
        }

        if (board[index] === null) {
            board[index] = upperValue;
            return true;
        }
        else {
            console.error("Cell is already occupied!");
            return false;
        }
    }
    const getBoard = () => board;
    const checkState = () => {
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (!board.includes(null)) {
            return 'Tie';
        }

        return 'Playing';
    }

    const displayBoard = () => {
        let cleanBoard = board.map((cell, index) => cell === null ? index : cell);
        console.log(`${cleanBoard[0]}|${cleanBoard[1]}|${cleanBoard[2]}`)
        console.log("------")
        console.log(`${cleanBoard[3]}|${cleanBoard[4]}|${cleanBoard[5]}`)
        console.log("------")
        console.log(`${cleanBoard[6]}|${cleanBoard[7]}|${cleanBoard[8]}`)
    }


    return { getBoard, setCell, checkState, displayBoard, resetBoard }
})();


const Player = (marker, name) => {
    return { marker, name };
}


const createGame = (gameboard) => {
    let playerX;
    let playerO;
    let currentPlayer;
    // let gameOver = false;


    const playGame = () => {

        // Gather and set players
        const playerXName = prompt("Enter name for player X:", "Player 1")
        const playerOName = prompt("Enter name for player O:", "Player 2")

        playerX = Player('X', playerXName);
        playerO = Player('O', playerOName);

        // Setup Initial Game State
        currentPlayer = playerX;
        // gameOver = false;
        gameboard.resetBoard();

        document.getElementsByClassName('header')[0].innerHTML = 'Playing Tic Tac Toe!'
        document.getElementById('playerTurn').innerHTML = `${currentPlayer.name}'s turn!`

    }

    const playerTurn = (index) => {
        document.getElementById('error').innerHTML = ''
        if (!isNaN(index) && index >= 0 && index <= 8) {
            let validMove = (gameboard.setCell(index, currentPlayer.marker));
        }

        if (validMove) {
            document.getElementById(`cell${index}`).textContent = currentPlayer.marker

            const gameState = gameboard.checkState();

            if (gameState === 'Playing') {
                // Switch player
                currentPlayer = (currentPlayer === playerX ? playerO : playerX)
                document.getElementById('playerTurn').innerHTML = `${currentPlayer.name}'s turn!`
            } else {
                announceResult(gameState);
            }
        }

        else {
            document.getElementById('error').innerHTML = `Error! Please place cell again!`
        }

    }



    const announceResult = () => {

        let result = gameboard.checkState()
        if (result === 'Tie') {
            document.getElementById('header').innerHTML = `Oh no! It's a tie!`
        }
        else {
            const winner = (result === playerX.marker ? playerX : playerO)
            document.getElementById('header').innerHTML = `${winner.name} wins the game!`
        }


    }


    return { playGame, announceResult, playerTurn }
};

// Button Event Listeners

function startGame() {
    const game = createGame(gameboard);
    game.playGame();
}

let startGameButton = document.getElementById("startGame")
startGameButton.addEventListener("click", startGame);

document.querySelectorAll('div .cell').forEach((element, index) => {

    element.addEventListener("click", function () { playerTurn(index) }
    );

});

