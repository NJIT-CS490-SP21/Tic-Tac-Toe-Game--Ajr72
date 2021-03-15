import React from 'react';
import PropTypes from 'prop-types';

export function Leaderboard({
  leaderboard, name, leader, onPressLeader,
}) {
  const rows = [];
  let rank = 1;
  Object.keys(leaderboard).map((keyName) => {
    // use keyName to get current key's name
    if (name === keyName) {
      rows.push(
        <tr className="active-user" index={rank}>
          {' '}
          <td>{rank}</td>
          {' '}
          <td>{keyName}</td>
          {' '}
          <td>{leaderboard[keyName]}</td>
        </tr>,
      );
    } else {
      rows.push(
        <tr index={rank}>
          {' '}
          <td>{rank}</td>
          {' '}
          <td>{keyName}</td>
          {' '}
          <td>{leaderboard[keyName]}</td>
        </tr>,
      );
    }
    // and a[keyName] to get its value
    rank += 1;
    return rank;
  });
  return (
    <div className="leaderboard">
      <div>
        {' '}
        <button
          className=" leader-button"
          onClick={() => onPressLeader()}
          type="button"
        >
          Show Leaderboard
        </button>
      </div>
      {leader === true ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
Leaderboard.propTypes = {
  leaderboard: PropTypes.objectOf(PropTypes.string).isRequired,
  onPressLeader: PropTypes.func.isRequired,
  leader: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
