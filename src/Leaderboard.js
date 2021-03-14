export function Leaderboard(props) {
  let rows = [];
  let rank = 1;
  Object.keys(props.leaderboard).map(function (keyName, keyIndex) {
    // use keyName to get current key's name
    if (props.name === keyName) {
      rows.push(
        <tr className="active-user" index={rank}>
          {" "}
          <td>{rank}</td> <td>{keyName}</td>{" "}
          <td>{props.leaderboard[keyName]}</td>
        </tr>
      );
    } else {
      rows.push(
        <tr index={rank}>
          {" "}
          <td>{rank}</td> <td>{keyName}</td>{" "}
          <td>{props.leaderboard[keyName]}</td>
        </tr>
      );
    }
    // and a[keyName] to get its value
    rank++;
  });
  return (
    <div className="leaderboard">
      <div>
        {" "}
        <button
          className=" leader-button"
          onClick={() => props.onPressLeader()}
        >
          Show Leaderboard
        </button>
      </div>
      {props.leader === true ? (
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
        ""
      )}
    </div>
  );
}
