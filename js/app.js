$(document).ready(function() {

// VARIABLES
var player;
var computer;
gameOver = false;

var grid = {
	1: "",	2: "",	3: "",
	4: "",	5: "",	6: "",
	7: "",	8: "",	9: ""
};

var winStates = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];



// PLAYER SELECT & INITIAL MODAL CONTROL
$("#xSelect").click(function() {
	player = "X";
	computer = "O"

	$(".player-select").fadeOut();

	setTimeout(function() {
		$(".game-board").fadeIn();
	}, 800);	
});

$("#oSelect").click(function() {
	player = "O";
	computer = "X"

	$(".player-select").fadeOut();

	setTimeout(function() {
		$(".game-board").fadeIn();
	}, 800);

	computerTurn();
});



// PLAYER TURN
$("#box1").click(function() {
	playerTurn(1);
});

$("#box2").click(function() {
	playerTurn(2);
});

$("#box3").click(function() {
	playerTurn(3);
});

$("#box4").click(function() {
	playerTurn(4);
});

$("#box5").click(function() {
	playerTurn(5);
});

$("#box6").click(function() {
	playerTurn(6);
});

$("#box7").click(function() {
	playerTurn(7);
});

$("#box8").click(function() {
	playerTurn(8);
});

$("#box9").click(function() {
	playerTurn(9);
});

function playerTurn(value) {
	if (grid[value] == false && gameOver == false) {
		grid[value] = player;
		$(("#position" + value)).text(player);
		gridCheck();
		computerTurn();
	}
}



// COMPUTER TURN
function computerTurn() {
	if (gameOver == false) {

		var turnOver = false;

		// 1. Win
		(function(){
			var winningMoves = [];

			for (i = 0; i < winStates.length; i++) {

				var count = 0;
				var available = [];

				for (j = 0; j < winStates[i].length; j++) {
					var index = winStates[i][j];
					if (grid[index] == computer) {
						count++;
					}

					if (grid[index] == "") {
						available.push(winStates[i][j]);
					}
				}

				if (count == 2 && available.length == 1) {
					winningMoves.push(available);
					grid[winningMoves[0]] = computer;
		      $(("#position" + winningMoves[0])).text(computer);
		      turnOver = true;
		      lose();
				}

			}
		})();

		// 2. Block
		if (turnOver == false) {
			(function(){
				var blockingMoves = [];

				for (i = 0; i < winStates.length; i++) {

					var count = 0;
					var available = [];

					for (j = 0; j < winStates[i].length; j++) {
						var index = winStates[i][j];
						if (grid[index] == player) {
							count++;
						}

						if (grid[index] == "") {
							available.push(winStates[i][j]);
						}
					}

					if (count == 2 && available.length == 1) {
						blockingMoves.push(available);
						grid[blockingMoves[0]] = computer;
			      $(("#position" + blockingMoves[0])).text(computer);
			      turnOver = true;
					}

				}
			})();
		}// end 2

		// 3. Fork

		// 4. Block Fork

		// 5. Centre

		// 6. Opposite corner

		// 7. Empty corner

		// 8. Empty side

		// 9. Random
		if (turnOver == false) {
			(function() {
				var available = false;
				var position;

				while (available == false) {
					// need +1 after math.floor otherwise it will sometimes return 0 which causes infinite loop
					// it would also never be able to select position 9
					position = Math.floor(Math.random() * 9) + 1; 
					console.log(position);
					if (grid[position] == false) {
						available = true;
					}
				}

				grid[position] = computer;
				$(("#position" + position)).text(computer);
			})();
		}// end 9

		gridCheck();
	}
}



// DRAW-WIN-LOSE FUNCTIONS
function draw() {
	gameOver = true;
	setTimeout(function() {
		$(".game-board").fadeOut();
	}, 2000);

	$("#resultMessage").text("It's a draw!");

	setTimeout(function() {
		$(".result").fadeIn();
	}, 2800);
}

function win() {
	gameOver = true;
	gameWon = false;
	setTimeout(function() {
		$(".game-board").fadeOut();
	}, 2000);

	$("#resultMessage").text("Congratulations, you win!");

	setTimeout(function() {
		$(".result").fadeIn();
	}, 2800);
}

function lose() {
	gameOver = true;
	setTimeout(function() {
		$(".game-board").fadeOut();
	}, 2000);

	$("#resultMessage").text("Sorry, you lost . . .");

	setTimeout(function() {
		$(".result").fadeIn();
	}, 2800);
}


// GRID CHECK
var gameWon = false;
function gridCheck() {
	if (Object.values(grid).indexOf("") == -1) {
		draw();
	}	else {
		for (i = 0; i < winStates.length; i++) {
			var count = 0;

			for (j = 0; j < winStates[i].length; j++) {
				var index = winStates[i][j];
				if (grid[index] == player) {
					count++;
				}

				if (count == 3) {
					gameWon = true;
					console.log("player wins");
				}
			}
		}

		if (gameWon == true) {
			win();
		};		
	}
}


// RESET BUTTON
$("#resetBtn").click(function() {
	gameOver = false;

	grid = {
		1: "",	2: "",	3: "",
		4: "",	5: "",	6: "",
		7: "",	8: "",	9: ""
	};

	for (i = 1; i < 10; i++) {
		$(("#position") + i).text("");
	}

	$(".result").fadeOut();

	setTimeout(function() {
		$(".player-select").fadeIn();
	}, 800);
});

	







}); // end jQuery