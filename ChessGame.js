/**
 * Main class of Chess Game
 */
function ChessGame(playersNum, boardLength) {
	// Game Board
	this.board = new Board(boardLength);

	// Game Players
	this.playersNum = playersNum;
	this.players = new Array(this.playersNum);
}

// start a new Game
ChessGame.prototype.startGame = function() {
	this.initialBoader();
	this.initialPlayer();
	alert("Welcome to Tic Tac Toe!");
};

// initial players
ChessGame.prototype.initialPlayer = function() {
	for (var i = 0; i < this.players.length; i++) {
		this.players[i] = new Player();
		this.players[i].initial(i);
	}
	
	this.curPlayerID = 0;
};

ChessGame.prototype.nextPlayer = function() {
	if((this.curPlayerID + 1) < this.playersNum) {
		this.curPlayerID += 1;
	} else {
		this.curPlayerID = 0;
	}
};

// renew game board
ChessGame.prototype.initialBoader = function() {
	this.board.initial();
};

// restart a new game
ChessGame.prototype.restGame = function() {
	this.startGame();
};

/**
 * Game Menu Class
 */
function Menu() {

}

/**
 * Game Board Class
 */
function Board(boardLength) {
	this.boardLength = boardLength;
	this.boardCells = new Array(this.boardLength);
}

Board.prototype.initial = function() {
	for (var i = 0; i < this.boardCells.length; i++) {
		this.boardCells[i] = new Array(this.boardLength);

		for (var j = 0; j < this.boardCells[i].length; j++) {
			this.boardCells[i][j] = new Cell();
			this.boardCells[i][j].initial(i, j);
		}
	}
};

/**
 * Game Cell Class
 */
function Cell() {

}

Cell.prototype.initial = function(row, col) {
	this.value = -1;
	this.row = row;
	this.col = col;
};

/**
 * Game Player Class
 */
function Player() {
	
}

Player.prototype.initial = function(playerID) {
	this.playerID = playerID;
};

Player.prototype.putChess = function(currentCell) {
	if(currentCell.value == -1) {
		currentCell.value = this.playerID;
		return true;
	} else {
		return false;
	}
};

/**
 * Game Cell Class
 */
function Chess() {

}