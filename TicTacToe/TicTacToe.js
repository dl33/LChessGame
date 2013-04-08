/**
 * 
 */
var game;

var COL_ACSII_INDEX = 65;
var ROW_ACSII_INDEX = 49;

function init() {
	game = new ChessGame(2, 3);
	game.startGame();
}

function clickCell(obj) {
	var clickedCell = getIndexFromCellID(obj.id);
	
	var isDone = game.players[game.curPlayerID].putChess(clickedCell);
	
	if(isDone) {
		obj.innerHTML = clickedCell.value;
		isCurPlayerWin(clickedCell);
		game.nextPlayer();
	} else {
		alert("Occupied: " + clickedCell.value);
	}
}

function getIndexFromCellID(cellID) {
	var col = cellID.charAt(0).charCodeAt(0) - COL_ACSII_INDEX;
	var row = cellID.charAt(1).charCodeAt(0) - ROW_ACSII_INDEX;

	return game.board.boardCells[row][col];
}

function isCurPlayerWin(clickedCell) {
	var curPlayerID = game.curPlayerID;
	
	// check the column cells
	var sum = 0;
	
	sum += checkBoardLine(0, clickedCell.row, clickedCell.col, clickedCell.col, 0, curPlayerID);
	sum += checkBoardLine(clickedCell.row, game.board.boardLength, clickedCell.col, clickedCell.col, 0, curPlayerID);
	
	// check the row cells
	sum = 0;
	
	sum += checkBoardLine(0, clickedCell.col, clickedCell.row, clickedCell.row, 1, curPlayerID);
	sum += checkBoardLine(clickedCell.col, game.board.boardLength, clickedCell.row, clickedCell.row, 1, curPlayerID);
	
	// check the diagonal line
	sum = 0;
	
	sum += checkBoardLine(0, clickedCell.row, 0, clickedCell.col, 2, curPlayerID);
	sum += checkBoardLine(clickedCell.row, game.board.boardLength, clickedCell.col, game.board.boardLength, 2, curPlayerID);
	
	alert("diagonal 1:" + sum);
	
	// check the diagonal line
	sum = 0;
	
	sum += checkBoardLine(0, game.board.boardLength, clickedCell.row, clickedCell.col, 3, curPlayerID);
	sum += checkBoardLine(clickedCell.row, clickedCell.col, game.board.boardLength, 0, 3, curPlayerID);
	
	alert("diagonal 2:" + sum);
}

function checkBoardLine(startRow, endRow, startCol, endCol, checkType, curPlayerID) {
	var sum = 0;
	var checkCell = null;
	
	if(checkType == 0 || checkType == 1) {
		for(var i = startRow; i < endRow; i++) {
			if(checkType == 0) {
				// row cells
				checkCell = game.board.boardCells[i][startCol];
			} else {
				// column cells
				checkCell = game.board.boardCells[startRow][i];
			}
			
			if(checkCell.value == curPlayerID) {
				sum += 1;
			}
		}
	} else {
		var i = startRow;
		var j = startCol;
		
		while(i < endRow && j < endCol) {
			checkCell = game.board.boardCells[i][j];
					
			if(checkCell.value == curPlayerID) {
				sum += 1;
			}
			
			i++;
			
			if(checkType == 2) {
				j++;
			} else {
				j--;
			}
		}
	}
	
	return sum;
}
