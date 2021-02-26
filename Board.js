

import {Square} from'./Square.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); 
export  function Board(){
    
    const [board, setBoard] = useState(["","","","","","","","",""]);
    const [counter, setCount] = useState(0);
    
    function Update(index){
        
        setCount((prevCounter)=>prevCounter+1);
         setBoard(prevList=>{
            if(counter%2==0){
                const boardCopy = [...prevList];
                
                boardCopy[index] = 'X'; 
                
                socket.emit('move', {index:index, val:boardCopy[index]});
                return boardCopy;
                
            }
            else{
               const boardCopy = [...prevList];
               boardCopy[index] = 'O'; 
               
               socket.emit('move', {index:index, val:boardCopy[index]});
               return boardCopy; 
            }
                
         });
        
            
            
         }

       useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('move', (data) => {
      console.log('move played!!!');
      
      setBoard(prevList=>{
           const boardCopy = [...prevList];
           console.log("data",data.val);
           boardCopy[data.index] = data.val;
           return boardCopy;
      });
      
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      
    });
  }, []);
     
    return (
    <div className = "board">
        
        <Square i={0}  Update={Update} board={board} />
        <Square i={1}  Update={Update} board={board} />
        <Square i={2}  Update={Update} board={board} />
        <Square i={3}  Update={Update} board={board} />
        <Square i={4}  Update={Update} board={board} />
        <Square i={5}  Update={Update} board={board} />
        <Square i={6}  Update={Update} board={board} />
        <Square i={7}  Update={Update} board={board} />
        <Square i={8}  Update={Update} board={board} />
    </div>
    );
}

