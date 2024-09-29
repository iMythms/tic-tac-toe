/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/

let turn, winner, tie, board
let gameMode = '1v1'

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const boardEl = document.querySelector('.board')
const resetBtnEl = document.getElementById('reset')
const gameModeEl = document.getElementById('gameMode')

/*-------------------------------- Functions --------------------------------*/

const render = () => {
	updateBoard()
	updateMessage()
}

const updateBoard = () => {
	board.forEach((input, id) => {
		squareEls[id].textContent = input

		if (input === 'X') {
			squareEls[id].style.color = 'red'
		} else if (input === 'O') {
			squareEls[id].style.color = 'blue'
		} else {
			squareEls[id].style.color = 'black'
		}
	})
}

const updateMessage = () => {
	if (winner) {
		messageEl.innerHTML = `Congratulations! <span style="color:green; font-weight: bold">${turn} wins!</span>`
	} else if (tie) {
		messageEl.textContent = `It's a tie!`
	} else {
		messageEl.textContent = `It's ${turn}'s turn!`
	}
}

const init = () => {
	board = ['', '', '', '', '', '', '', '', '']

	turn = 'X'
	winner = false
	tie = false

	squareEls.forEach((sqr) => {
		sqr.style.backgroundColor = ''
	})

	render()
}

init()

const handleClick = (event) => {
	if (!event.target.classList.contains('sqr')) return

	const squareIndex = event.target.id
	const index = parseInt(squareIndex)

	if (board[index] === 'X' || board[index] === 'O' || winner) return

	placePiece(index)
	checkForWinner()
	checkForTie()

	// Game mode logic
	if (gameMode === '1v1') {
		switchPlayerTurn()
	} else if (gameMode === 'computer' && !winner && !tie) {
		playComputerMove()
		checkForWinner()
		checkForTie()
	}

	render()
}

const playComputerMove = () => {
	let availableSquares = []

	board.forEach((value, id) => {
		if (value === '') {
			availableSquares.push(id)
		}
	})

	const randomIndex = Math.floor(Math.random() * availableSquares.length)
	const computerMove = availableSquares[randomIndex]

	setTimeout(() => {
		board[computerMove] = 'O'

		render()
		checkForWinner()

		// Switch back to 'X' only if the game is not won
		if (!winner) {
			turn = 'X'
		}
	}, 500) // 0.5 second delay
}

const placePiece = (index) => {
	board[index] = turn
}

/*
	Checks the current state of the board to determine if there is a winner.
	Iterates through all possible winning combinations and checks if any of them
	are satisfied by the current board state. If a winning combination is found,
	it updates the winner flag, displays a congratulatory message, and highlights
	the winning squares. ------ Docs by Mytham not ChatGPT :) ------
*/
const checkForWinner = () => {
	winningCombos.forEach((combo) => {
		const [a, b, c] = combo

		if (board[a] !== '') {
			if (board[a] === board[b] && board[a] === board[c]) {
				winner = true

				messageEl.innerHTML = `Congratulations! <span style="color:green; font-weight: bold">${board[a]} wins!</span>`

				// Highlight winning squares
				squareEls[a].style.backgroundColor = 'lightgreen'
				squareEls[b].style.backgroundColor = 'lightgreen'
				squareEls[c].style.backgroundColor = 'lightgreen'
			}
		}
	})
}

const checkForTie = () => {
	if (winner) return

	if (!board.includes('')) {
		tie = true
	} else {
		tie = false
	}
}

const switchPlayerTurn = () => {
	if (winner) return

	turn = turn === 'X' ? 'O' : 'X'
}

/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener('click', init)
boardEl.addEventListener('click', handleClick)
gameModeEl.addEventListener('change', (event) => {
	gameMode = event.target.value
})
