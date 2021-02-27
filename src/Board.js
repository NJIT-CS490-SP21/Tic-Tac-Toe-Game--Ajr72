

import {Square} from'./Square.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {Login} from './Login.js';

const socket = io(); 
export  function Board(){
    
    const [board, setBoard] = useState(["","","","","","","","",""]);
    const [counter, setCount] = useState(0);
    const [isLogin, setLogin] = useState(false);
    const inputRef = useRef(null);
    const [user,setUser]= useState([]);
    const [userDict,setDict]=useState([]);
    
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
    function onPressLogin(){
        
        setLogin(prevIsLogin=> true);
        
       
        var username = inputRef.current.value;
        
        username=inputRef.current.value;
        
        setUser((prevUser)=>{
            const userListCopy = [...prevUser];
            
            console.log("userListCopy before :",userListCopy);
            userListCopy.push(username);
            console.log("userListCopy after:",userListCopy);
            console.log("counter",counter);
           
            return userListCopy;
        });
        setDict(prevUserDict=>{
            
        });
         socket.emit("login" , {username:username});
    }
         
    
     useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('move', (data) => {
      console.log('move played!!!');
      setCount((prevCounter)=>prevCounter+1);
      setBoard(prevList=>{
          
           const boardCopy = [...prevList];
           console.log("data",data.val);
           boardCopy[data.index] = data.val;
           return boardCopy;
      });
      
     
      
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
      
    });
    console.log('User Logged!!!'); 
    socket.on("login",(data)=>{
         
      console.log('User Logged!!!'); 
      
        setUser((prevUser)=>{
           setCount((prevCounter)=>prevCounter+1);
            const userCopy = [...prevUser];
            var user=data.username;
            userCopy.push(user);
            return userCopy;
          });
          return counter;
          
      });
  }, []);
     
    return (
        
    <div>
     <h1>Welcome to the Pro Tic Tac Toe International Chmapionship <span> ❌  v/s  ⭕</span> </h1>
    {isLogin === true ?
    
         (
         <div>
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
    <div>
       <ul>
       <li><h2>{user} </h2></li>
       </ul>
    </div>
    </div>
    
    
        
    ) :
    
    (<div> 
        <Login inputRef = {inputRef}onPressLogin ={onPressLogin} />
        
    <h1>Please Login</h1>
    </div>)
    }
   
    </div>
    
    );
}

