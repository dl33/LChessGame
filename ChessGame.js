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
	this.curPlayerID = this.getNextPlayerID();
};

ChessGame.prototype.getNextPlayerID = function() {
	if((this.curPlayerID + 1) < this.playersNum) {
		return this.curPlayerID + 1;
	} else {
		return 0;
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

// restart a new game
ChessGame.prototype.isDrawGame = function() {
	if(this.board.maxCells == this.board.occupiedCell) {
		return true;
	} else {
		return false;
	}
};

ChessGame.prototype.playerPutChess = function(currentCell) {
	if(this.players[this.curPlayerID].putChess(currentCell)) {
		this.board.occupiedCell++;
		return true;
	} else {
		return false;
	}
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
	this.maxCells = boardLength * boardLength;
}

Board.prototype.initial = function() {
	this.occupiedCell = 0;
	
	this.boardCells = new Array(this.boardLength);
	
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

Cell.prototype.isEmpty = function() {
	if(this.value == -1) {
		return true;
	} else {
		return false;
	}
}

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