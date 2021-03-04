export function Leaderboard(props){
    
    return (
        <div className="leaderboard">
          <div> <button className=" leader-button" onClick={()=>props.onPressLeader()}>Show Leaderboard</button></div>
           {props.leader===false?
           (<div>
                <h2> Leaderboard</h2>
            <table>
                <thead>
                <tr>
                    <th colspan="2">Player</th>
                 </tr>
                 <tr>
                    <th colspan="2">Score</th>
                 </tr>
                 </thead>
            <tbody>
            
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