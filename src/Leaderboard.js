export function Leaderboard(props){
    
    return (
        <div className="leaderboard">
          <div> <button className=" leader-button" onClick={()=>props.onPressLeader()}>Show Leaderboard</button></div>
           {props.leader===true?
           (<div>
            <table>
                <thead>
                <tr>
                    <th colspan="2">Leader Board</th>
                 </tr>
                 </thead>
            <tbody>
            <tr>
            <td>Player</td>
            <td>Score</td>
         </tr>
         <tr>
            <td>PlayeX</td>
            <td>Score</td>
         </tr>
         <tr>
            <td>PlayeO</td>
            <td>Score</td>
         </tr>
    </tbody>
</table>
</div>):("")}
           
        </div>
        );
}