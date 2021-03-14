import "./Board.css";
export function Square(props) {
  if (props.winner === "PlayerX" || props.winner === "PlayerO") {
    if (
      props.i === props.tiles[0] ||
      props.i === props.tiles[1] ||
      props.i === props.tiles[2]
    ) {
      return (
        <div
          onClick={() => props.Update(props.i, props.move, props.winner)}
          className="box win"
        >
          <span className="move">{props.board[props.i]}</span>
        </div>
      );
    } else {
      return (
        <div
          onClick={() => props.Update(props.i, props.move, props.winner)}
          className="box "
        >
          <span className="move">{props.board[props.i]}</span>
        </div>
      );
    }
  } else {
    return (
      <div
        onClick={() => props.Update(props.i, props.move, props.winner)}
        className="box "
      >
        <span className="move">{props.board[props.i]}</span>
      </div>
    );
  }
}
