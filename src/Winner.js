
export function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		var winner;
		
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			if(squares[a]==="X"){
				winner = "PlayerX";
			}
		else {
			winner = "PlayerO";
		}
		
		
		return winner;	
		}

		
	}
	return null;
}
export function areAllBoxesClicked(boxes) {
    // Declare variable to store number of clicked boxes.
    let count = 0;

    // Iterate over all boxes
    boxes.forEach(function (item) {
        // Check if box is clicked (not null)
        if (item !== null) {
            // If yes, increase the value of count by 1
            count++;
        }
    })

    // Check if all boxes are clicked (filled)
    if (count === 9) {
        return true;
    } else {
        return false;
    }
}