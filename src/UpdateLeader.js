export function  UpdateLeader(props){
   
   return(
       <div >
            
            <button  className = "update-leader" onClick={()=>props.onUpdateLeader()}>Update Leaderboard</button>
        </div>) 
}