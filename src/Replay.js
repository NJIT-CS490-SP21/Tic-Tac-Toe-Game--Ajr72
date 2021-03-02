export function  Replay(props){
   
   return(
       <div >
            
            <button  className = "replay" onClick={()=>props.onReplay()}>Play Again</button>
        </div>) 
}
