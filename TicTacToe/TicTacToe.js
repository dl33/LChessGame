/**
 * 
 */
var game;

var COL_ACSII_INDEX = 48;
var ROW_ACSII_INDEX = 48;
var PLAYER_NUMBERS = 2;
var MAX_BOARDLENGTH = 3;  
var WIN_CHESSNUM = 3;

jQuery(document).ready(function() {
	init();
});

function init() {
	// initial board display
	initDisplay();
	
	// initial game
	game = new ChessGame(PLAYER_NUMBERS, MAX_BOARDLENGTH);
	game.startGame();
}

function initDisplay() {
	var $boardNode = $("#board");
	$boardNode.empty();
	
	for(var i = 0; i < MAX_BOARDLENGTH; i++) {
		for(var j = 0; j < MAX_BOARDLENGTH; j++) {
			var $cellNode = new CellNode(i, j);
			
			$cellNode.css("top", i * 110 + 10);
			$cellNode.css("left", j * 110 + 10);
			$boardNode.append($cellNode);
		}
	}
}

/**
 * restart a new game 
 */
function restGame() {
	initDisplay();
	game.restGame();
}

/**
 * Class of cell node on board 
 */
function CellNode(row, col) {
	var $cellNode = $("<div></div>");
	
	$cellNode.attr("id", row.toString() + col.toString());
	$cellNode.attr("onclick", "clickCell(this);");
	$cellNode.addClass("cells");
	
	return $cellNode;
}

/**
 * Event of cell click. 
 *   put a chess when the cell is not occupied
 * 
 * @param {Object} cellNode
 */
function clickCell(cellNode) {
	// get clicked cell object by its tag id
	var clickedCell = getIndexFromCellID(cellNode.id);
	
	// try to put a chess on clicked cell 
	var isDone = game.playerPutChess(clickedCell);
	
	// if put a chess successfully
	if(isDone) {
		cellNode.innerHTML = clickedCell.value;
		
		// check whether current player win or not
		if(!isCurPlayerWin(clickedCell)) {
			if(!game.isDrawGame()) {
				game.nextPlayer();
			} else {
				alert("Draw Game!");
				restGame();
			}
		} else {
			alert("Player " + game.curPlayerID + " win!");
			restGame();
		}
	} else {
		alert("Occupied: " + clickedCell.value);
	}
}

/**
 * Get cell object by cell tag id
 *
 * @param {Object} cellNode  
 */
function getIndexFromCellID(cellID) {
	// convey cell id to column index
	var col = cellID.charAt(0).charCodeAt(0) - COL_ACSII_INDEX;
	
	// convey cell id to row index
	var row = cellID.charAt(1).charCodeAt(0) - ROW_ACSII_INDEX;

	// return cell object
	return game.board.boardCells[row][col];
}

/**
 * Check whether current player win or not
 * 
 * @param {Object} clickedCell    
 */
function isCurPlayerWin(clickedCell) {
	var curPlayerID = game.curPlayerID;
	
	// check the vertical line
	var sum = 0;
	
	sum += checkBoardLine(0, clickedCell.row, clickedCell.col, clickedCell.col, 0, curPlayerID);
	sum += checkBoardLine(clickedCell.row, game.board.boardLength, clickedCell.col, clickedCell.col, 0, curPlayerID);
	
	if(isWin(sum)) {
		return true;
	}
	
	// check the horizontal line
	sum = 0;
	
	sum += checkBoardLine(clickedCell.row, clickedCell.row, 0, clickedCell.col, 1, curPlayerID);
	sum += checkBoardLine(clickedCell.row, clickedCell.row, clickedCell.col, game.board.boardLength, 1, curPlayerID);
	
	if(isWin(sum)) {
		return true;
	}
	
	// check the diagonal(left to right) line
	sum = 0;
	
	sum += checkBoardLine(0, clickedCell.row, 0, clickedCell.col, 2, curPlayerID);
	sum += checkBoardLine(clickedCell.row, game.board.boardLength, clickedCell.col, game.board.boardLength, 2, curPlayerID);
	
	if(isWin(sum)) {
		return true;
	}
	
	// check the diagonal(right to left) line
	sum = 0;
	
	sum += checkBoardLine(0, clickedCell.row, game.board.boardLength - 1, clickedCell.col, 3, curPlayerID);
	sum += checkBoardLine(clickedCell.row, game.board.boardLength, clickedCell.col, 0, 3, curPlayerID);
	
	if(isWin(sum)) {
		return true;
	}
	
	return false;
}

/**
 * check each line to find the continues 3 chess
 *  
 * @param {Object} startRow
 * @param {Object} endRow
 * @param {Object} startCol
 * @param {Object} endCol
 * @param {Object} checkType 0:Vertical 
 * 							 1:Horizontal 
 * 							 2:Diagonal Left to Right
 * 							 3:Diagonal Right to Left
 * @param {Object} curPlayerID
 */
function checkBoardLine(startRow, endRow, startCol, endCol, checkType, curPlayerID) {
	var sum = 0;
	var checkCell = null;
	
	if(checkType == 0 || checkType == 1) {
		// Vertical(checkType:0) and Horizontal(checkType:1)
		var startIndex = -1;
		var endIndex = -1;
		
		if(checkType == 0) {
			startIndex = startRow;
			endIndex = endRow;	
		} else {
			startIndex = startCol;
			endIndex = endCol;
		}
		
		for(var i = startIndex; i < endIndex; i++) {
			if(0 == checkType) {
				// row cells
				checkCell = game.board.boardCells[i][startCol];
			} else {
				// column cells
				checkCell = game.board.boardCells[startRow][i];
			}
			
			// check whether the cell occupied by current player 
			if(checkCell.value == curPlayerID) {
				sum += 1;
			}
		}
	} else {
		// Diagonal line(checkType: 2 or 3)
		var i = startRow;
		var j = startCol;
		
		
		if(2 == checkType) {
			
			while(i < endRow && j < endCol) {
				checkCell = game.board.boardCells[i][j];
	
				// check whether the cell occupied by current player
				if(checkCell.value == curPlayerID) {
					sum += 1;
				}
	
				// move the cell to right down			
				i++;
				j++;
			}
		} else {
			var i = startRow;
			var j = startCol;
			
			while(i < endRow && j >= endCol) {
				checkCell = game.board.boardCells[i][j];
	
				// check whether the cell occupied by current player
				if(checkCell.value == curPlayerID) {
					sum += 1;
				}
	
				// move the cell to left down			
				i++;
				j--;
			}
		}
	}
	
	// return the sum of occupied cells
	return sum;
}

/**
 * Check whether the occupied cells number satisfied the win requirement.
 *  
 * @param {Object} sum
 */
function isWin(sum) {
	if(sum >= WIN_CHESSNUM) {
		return true;
	} else {
		return false;
	}
}
