import './Board.css';
import PropTypes from 'prop-types';
import React from 'react';

export function Square({
  winner, i, tiles, move, board, Update,
}) {
  if (winner === 'PlayerX' || winner === 'PlayerO') {
    if (
      i === tiles[0]
      || i === tiles[1]
      || i === tiles[2]
    ) {
      return (
        <div
          data-testid="tile"
          onClick={() => Update(i, move, winner)}
          onKeyDown={() => Update(i, move, winner)}
          role="button"
          tabIndex={0}
          className="box win"
        >
          <span className="move">{board[i]}</span>
        </div>
      );
    }
    return (
      <div
        onClick={() => Update(i, move, winner)}
        onKeyDown={() => Update(i, move, winner)}
        role="button"
        tabIndex={0}
        className="box "
      >
        <span className="move">{board[i]}</span>
      </div>
    );
  }
  return (
    <div
      data-testid="tile"
      onClick={() => Update(i, move, winner)}
      onKeyDown={() => Update(i, move, winner)}
      role="button"
      tabIndex={0}
      className="box "
    >
      <span data-test-id="move" className="move">{board[i]}</span>
    </div>
  );
}
Square.propTypes = {
  winner: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  move: PropTypes.string.isRequired,
  Update: PropTypes.func.isRequired,
  board: PropTypes.arrayOf(PropTypes.string).isRequired,
};
