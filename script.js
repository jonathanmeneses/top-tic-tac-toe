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

        console.log(`Welcome to Tic Tac Toe!`)
        gameLoop();

    }

    const gameLoop = () => {
        while (gameboard.checkState() === 'Playing') {
            playerTurn()
        }
        announceResult()
        currentPlayer = playerX
    }

    const playerTurn = () => {

        console.log(`${currentPlayer.name}'s turn!`)

        gameboard.displayBoard();
        let validMove = false;
        while (!validMove) {
            const index = parseInt(prompt(`${currentPlayer.name}, enter your move!`))
            if (!isNaN(index) && index >= 0 && index <= 8) {
                validMove = (gameboard.setCell(index, currentPlayer.marker))
            } else {
                console.error("Invalid input! Please enter a number between 0 and 8.");
            }

        }

        // Switch player
        currentPlayer = (currentPlayer === playerX ? playerO : playerX)



    }



    const announceResult = () => {

        let result = gameboard.checkState()

        gameboard.displayBoard()
        if (result === 'Tie') {
            console.log(`Oh no! It's a tie!`)
        }

        else {
            const winner = (result === playerX.marker ? playerX : playerO)
            console.log(`${winner.name} wins the game!`)
        }


    }


    return { playGame }
};