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

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const boardEl = document.querySelector('.board')
const resetBtnEl = document.getElementById('reset')

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
		messageEl.textContent = `Congratulations! ${turn} wins!`
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
	switchPlayerTurn()

	render()
}

const placePiece = (index) => {
	board[index] = turn
}

const checkForWinner = () => {
	winningCombos.forEach((combo) => {
		const [a, b, c] = combo

		if (board[a] !== '') {
			if (board[a] === board[b] && board[a] === board[c]) {
				winner = true
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
