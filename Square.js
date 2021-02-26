

export function Square(props){
    
     
    return (
       
    <div  onClick={()=> props.Update(props.i)} className="box">
        
        { props.board[props.i] }
    </div>
    );
  
}
