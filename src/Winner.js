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
      if (squares[a] === "X") {
        winner = "PlayerX";
      } else {
        winner = "PlayerO";
      }

      console.log([a, b, c]);
      return winner;
    }
  }
  return null;
}

export function winningTiles(squares) {
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
      console.log([a, b, c]);
      return [a, b, c];
    }
  }
  return null;
}
