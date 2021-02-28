

export function Square(props){
    
     
    return (
       
    <div  onClick={()=> props.Update(props.i,props.move)} className="box">
        
        { props.board[props.i] }
    </div>
    );
  
}
