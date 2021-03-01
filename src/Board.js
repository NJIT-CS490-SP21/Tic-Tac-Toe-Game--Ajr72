import {Square} from'./Square.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {Login} from './Login.js';
import {calculateWinner} from "./Winner.js";
import  {Replay} from "./Replay.js";
import {Spect} from "./Spectators.js";
import {AreAllBoxesClicked} from "./Winner.js";
const socket = io();
export  function Board(){
    
    const [board, setBoard] = useState(["","","","","","","","",""]);
    const [isLogin, setLogin] = useState(false);
    const inputRef = useRef(null);
    const [user,setUser]= useState([]);
   
    const [id,setId]= useState(1);
    const [userType,setType] = useState();
    const [move,setMove] = useState(null);
    const [player,setPlayer]= useState([]);
    const [spect,setSpect] = useState([]);
    const [nextTurn,setNextTurn] =useState("PlayerX");
    let winner = calculateWinner(board);
    const isFill = AreAllBoxesClicked(board);
    const [status,setStatus] = useState(null);
    const [isClicked, setClicked] = useState(false);
    
    function Update(index, value){
       
         setBoard(prevList=>{
            
                const boardCopy = [...prevList];
                if(winner){
                   setStatus(prevStatus=> "The winner is") 
                }
                if(winner|| boardCopy[index]) return;
                
              
                value = move;
               
                
                    boardCopy[index] = move;
                
                    
                
                
                if(boardCopy[index]==="X")
                {
                    setNextTurn(prevTurn=>"PlayerO");
                }
                else{
                    setNextTurn(prevTurn=>"PlayerX");
                }
                    
                    if(userType==="PlayerX" || userType==="PlayerO")
                            
                            socket.emit('move', {index:index, val:boardCopy[index],nextTurn:nextTurn});
                    
                    
                return boardCopy;
         });
 
         }
    function onPressLogin(){
        
        setLogin(prevIsLogin=> true);
        setId(prevId=>prevId +1);
        console.log("onpressID",id);
        var username = inputRef.current.value;
        
        username=inputRef.current.value;
        if(username == ""){
        alert("Enter a valid name.");
        return;
    }
        setUser((prevUser)=>{
            const userListCopy = [...prevUser];
            userListCopy.push(username);
            
            return userListCopy;
        });
        if(id < 3){
            
                setPlayer(prevPlayer=>{
                const tempPlayer = [...prevPlayer];
                tempPlayer.push(username);
                return tempPlayer;
            });
          }
          else{
              
             setSpect(prevSpect=>{
                 const tempSpect= [...prevSpect];
                 tempSpect.push(username);
                 return tempSpect;
             }) ;
          }
        if(id===1){
            setType(prevType=>"PlayerX");
            setMove(prevMove=>"X");
            
        }
        else if(id==2){
            setType(prevType=>"PlayerO");
            setMove(prevMove=>"O");
            
        }
        else{
            setType(prevType=>"Spectator");
        }
         socket.emit("login" , {username:username,id:id,userType:userType});
    }
  
    function onReplay(){
        setBoard(prevBoard=>{
            let boardCopy = [...prevBoard];
            boardCopy = [Array(9).fill(null)];
             
            return boardCopy;
        });
        winner=null;
        setNextTurn(prevTurn=>"PlayerX");
        console.log("relayed",board);
        socket.emit("replay", {board:board,winner:winner,nextTurn:nextTurn});
      
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
           if(boardCopy[data.index]==="X")
                {
                    setNextTurn(prevTurn=>"PlayerO");
                }
                else{
                    setNextTurn(prevTurn=>"PlayerX");
                }
           
           return boardCopy;
      });
      
      
    });
    
    
    socket.on("login",(data)=>{
       console.log("socketid",socket.id); 
      console.log('User Logged!!!'); 
      console.log(data);
        setId(prevId=>{
            var tempId = prevId;
            tempId++;
            return tempId;
        });
       
        setUser((prevUser)=>{
       
           console.log("id",data.id);
            const userCopy = [...prevUser];
            userCopy.push(data.username);
            
            return userCopy;
          });
          if(data.id < 3){
            
                setPlayer(prevPlayer=>{
                const tempPlayer = [...prevPlayer];
                tempPlayer.push(data.username);
                return tempPlayer;
            });
          }
          else{
             setSpect(prevSpect=>{
                 const tempSpect= [...prevSpect];
                 tempSpect.push(data.username);
                 console.log("spect",tempSpect);
                 return tempSpect;
             }) ;
          }
          
          if(data.userType==="playerX"){
             setMove(prevMove=>"X");
          }
          else if(data.userType ==="playerO"){
              setMove(prevMove=>"O");
          }
          
          
      });
      socket.on("replay",(data)=>{
           setBoard(prevBoard=>{
            let boardCopy = [...prevBoard];
            boardCopy = [Array(9).fill(null)];
            return boardCopy;
        });
        setNextTurn(prevTurn=>"PlayerX");
        winner=null;
          
      });
      
     
      
  }, []);
  console.log(user);
  console.log(player);
    
    return (
        
    <div>
     <h1 cLass="heading">Welcome to the Pro Tic Tac Toe International Chmapionship <span> ❌  v/s  ⭕</span> </h1>
    {isLogin === true ?
        
        
         ( 
             <div>
                 <div className = "board">
                
                <Square i={0}  Update={Update} move={move} board={board} />
                <Square i={1}  Update={Update} move={move} board={board} />
                <Square i={2}  Update={Update} move={move} board={board} />
                <Square i={3}  Update={Update} move={move} board={board} />
                <Square i={4}  Update={Update} move={move} board={board} />
                <Square i={5}  Update={Update} move={move} board={board} />
                <Square i={6}  Update={Update} move={move} board={board} />
                <Square i={7}  Update={Update} move={move} board={board} />
                <Square i={8}  Update={Update} move={move} board={board} />
                
            </div>
            
            <div id="playerlist">
                <h2>Players:</h2>
                <ul>
                <h3><li>Player❌: {player[0]}</li></h3>
                <h3><li>Player⭕: {player[1]}</li></h3>
                </ul>
            </div>
            <div cLass="spectlist">
                {!winner ? "Match Drawn" : winner}
                <h2> {winner ? "Winner: " + winner : "Next Player: " + nextTurn}</h2>
                <h2>Spectators:</h2>
                
                <Spect spect={spect} />
            </div>
           
            {winner &&
            
                <Replay onReplay={onReplay} />
            }
           
        </div>
   
    ) :
    
    (<div cLass="login"> 
        <h1>Please Login</h1>
        <Login inputRef = {inputRef}onPressLogin ={onPressLogin} />
        
    
    </div>)
    }
   
    </div>
    
    );
}

