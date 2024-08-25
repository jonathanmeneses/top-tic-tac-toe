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

    const setCell = (index, value) => {
        upperValue = value.toUpperCase();
        if (upperValue !== 'X' && upperValue !== 'O') {
            return console.error("Invalid value! Please enter 'X' or 'O'.")
                ;
        }

        if (board[index] === null) {
            board[index] = upperValue;
        }
        else {
            return console.error("Cell is already occupied!");
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
        let cleanBoard = board.map(cell => cell === null ? " " : cell);
        console.log(`${cleanBoard[0]}|${cleanBoard[1]}|${cleanBoard[2]}`)
        console.log("------")
        console.log(`${cleanBoard[3]}|${cleanBoard[4]}|${cleanBoard[5]}`)
        console.log("------")
        console.log(`${cleanBoard[6]}|${cleanBoard[7]}|${cleanBoard[8]}`)
    }


    return { getBoard, setCell, checkState, displayBoard }
})();