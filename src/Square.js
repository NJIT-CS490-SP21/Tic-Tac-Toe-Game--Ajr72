
import "./Board.css";
export function Square(props){
    
     
    return (
       
    <div  onClick={()=> props.Update(props.i,props.move)} className="box">
        
       <span className="move" >{ props.board[props.i] }</span>
    </div>
    );
  
}
