import React from 'react';
import PropTypes from 'prop-types';

export function Replay(props) {
  return (
    <div>
      <button type="button" className="replay" onClick={() => props.onReplay()}>
        Play Again
      </button>
    </div>
  );
}
Replay.propTypes = {
  onReplay: PropTypes.func.isRequired,
};
