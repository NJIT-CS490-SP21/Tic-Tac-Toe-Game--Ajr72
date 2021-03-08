import {Square} from'./Square.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {Login} from './Login.js';
import {calculateWinner} from "./Winner.js";
import  {Replay} from "./Replay.js";
import {Spect} from "./Spectators.js";
import{winningTiles} from "./Winner.js";
import {Leaderboard} from "./Leaderboard.js";
import {UpdateLeader} from "./UpdateLeader.js";
import UIfx from 'uifx';
import mp3File from './audios/xsound.wav';
import mp3File2 from './audios/osound.wav';

const xsound = new UIfx(
  mp3File,
  {
    volume: 0.1// number between 0.0 ~ 1.0
    
  }
);
const osound = new UIfx(
  mp3File2,
  {
    volume: 0.1// number between 0.0 ~ 1.0
    
  }
);

const socket = io();
export  function Board(){
   
    const [board, setBoard] = useState(["","","","","","","","",""]);
    const [isLogin, setLogin] = useState(false);
    const inputRef = useRef(null);
    const [user,setUser]= useState([]);
    const [id,setId]= useState(1);
    const [userType,setType] = useState(null);
    const [move,setMove] = useState(null);
    const [player,setPlayer]= useState([]);
    const [spect,setSpect] = useState([]);
    const [nextTurn,setNextTurn] =useState("PlayerX");
    const [leader,setLeader] =useState(false);
    const [leaderBoard,setLeaderBoard] = useState({});
    let winner = calculateWinner(board);
    const [isWinner,setIsWinner] = useState(false);
    const [name,setName] =useState(null);
    let tiles = winningTiles(board);
    let count = 0;
 
    function Update(index, value){
        
       if(!winner){
          if(board[index]===""){
              if(userType===nextTurn){
         setBoard(prevList=>{
            
                const boardCopy = [...prevList];
                if(winner|| boardCopy[index]) return;
                value = move;
                 boardCopy[index] = move;
                 
                if(boardCopy[index]==="X")
                {    xsound.play();
                    setNextTurn(prevTurn=>"PlayerO");
                }
                else{
                     osound.play();
                    setNextTurn(prevTurn=>"PlayerX");
                }
    
                if(userType==="PlayerX" || userType==="PlayerO")
                            
                    socket.emit('move', {index:index, val:boardCopy[index],nextTurn:nextTurn});
                    
                    
                return boardCopy;
         });
              }
           
          }
          
        
       }
       
         }
        
     
    function onPressLogin(){
        
        if(inputRef === null){
        alert("Enter a valid username.");
        
    }
        if(inputRef!=null){
        setLogin(prevIsLogin=> true);
        setId(prevId=>prevId +1);
        var username = inputRef.current.value;
        
        username=inputRef.current.value;
        setName(prevName=>username);
     
        setUser((prevUser)=>{
            const userListCopy = [...prevUser];
            userListCopy.push(username);
            
            return userListCopy;
        });
        addUser(id,username);
        setUserType(id);
        
         socket.emit("login" , {username:username,id:id,userType:userType});
    }
    }
    function onReplay(){
        setBoard(prevBoard=>{
            let boardCopy = [...prevBoard];
            boardCopy = ["","","","","","","","",""];
            return boardCopy;
        });
      
        setNextTurn(prevTurn=>"PlayerX");
        console.log("relayed",board);
        socket.emit("replay", {board:board,winner:winner,nextTurn:nextTurn});
      
    }
    
    function onPressLeader(){
        if(leader===false){
            setLeader(prevLeader=>true);
        }
        else{
            setLeader(prevLeader=>false);
        }
        
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
      console.log("login data",data);
        setId(prevId=>{
            var tempId = prevId;
            tempId++;
            return tempId;
        });
        let id = data.id;
        let username = data.username;
        let userType = data.userType;
        setLeaderBoard(prevLeaderBoard=>JSON.parse(data.leaderboard));
        setUser((prevUser)=>{
       
           console.log("id",data.id);
            const userCopy = [...prevUser];
            userCopy.push(username);
            return userCopy;
          });

          addUser(id,username);
          setNextMoove(userType);
      });
      socket.on("replay",(data)=>{
           setBoard(prevBoard=>{
            let boardCopy = [...prevBoard];
            boardCopy = ["","","","","","","","",""];
            return boardCopy;
        });
        setNextTurn(prevTurn=>"PlayerX");
        setIsWinner(prevWinner=>false);
        winner=null;
          
      });
      
      
       socket.on("winner",(data)=>{
          console.log("winner data",data);
          let leaderboard = data.leaderboard
          let id = data.id;
          setLeaderBoard(prevLeaderBoard=>JSON.parse(leaderboard));
          
      
       }
      );
     
      
  }, []);
 
    
    const is_board_full = board.every(element=>element!="");
    console.log(is_board_full);
    console.log(userType);
   
    function addUser(id,username){
        
        if(id< 3){
            
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
                 console.log("spect",tempSpect);
                 return tempSpect;
             }) ;
          }
    }
    function setNextMoove(userType){
         if(userType==="playerX"){
             setMove(prevMove=>"X");
          }
          else if(userType ==="playerO"){
              setMove(prevMove=>"O");
          }
    }
    
    function setUserType(id){
        if(id===1){
            setType(prevType=>"PlayerX");
            setMove(prevMove=>"X");
            
        }
        else if(id===2){
            setType(prevType=>"PlayerO");
            setMove(prevMove=>"O");
            
        }
        else{
            setType(prevType=>"Spectator");
        }
    }
    
  
    
    return (
        
    <div class="conatiner">
     <div class="heading"><h1 >Welcome to the Pro Tic Tac Toe International Championship <span> ❌  v/s  ⭕</span> </h1></div>

  
    {isLogin === true?
        
       
         ( 
         <div>
             <div class="conatiner">
                 <div class = "board">
                
                <Square id="0" i={0}  winner={winner} tiles={tiles} Update={Update} move={move} board={board} />
                <Square id="1" i={1}  winner={winner} tiles={tiles} Update={Update} move={move} board={board} />
                <Square id="2" i={2}  winner={winner} tiles={tiles} Update={Update} move={move} board={board} />
                <Square id="3" i={3}  winner={winner} tiles={tiles} Update={Update} move={move} board={board} />
                <Square id="4" i={4}  winner={winner} tiles={tiles} Update={Update} move={move} board={board} />
                <Square id="5" i={5}  winner={winner} tiles={tiles} Update={Update} move={move} board={board} />
                <Square id="6" i={6}  winner={winner} tiles={tiles} Update={Update} move={move} board={board} />
                <Square id="7" i={7}  winner={winner} tiles={tiles} Update={Update} move={move} board={board} />
                <Square id="8" i={8}  winner={winner} tiles={tiles} Update={Update} move={move} board={board} />
                
            </div>
            
            <div class="playerlist">
                <h2>Players:</h2>
                <ul>
                <h3><li>Player❌: {player[0]}</li></h3>
                <h3><li>Player⭕: {player[1]}</li></h3>
                        <div class="info">
            {( (winner ==="PlayerX" || winner ==="PlayerO") && (userType==="PlayerX" || userType === "PlayerO")||
                 ( ( winner!= "PlayerX" || winner != "playerO" ) &&  userType==="PlayerX" || userType === "PlayerO") && is_board_full) ? 
                    <div>
                    
                    <Replay onReplay={onReplay} />
                    </div>:("")
                }
                { (winner!= "PlayerX" || winner != "playerO" )&& is_board_full ? 
                    <h2> Match Drawn</h2>: <h2>{(winner ? "Winner: " + winner : "Next Player: " + nextTurn)} </h2>
                }
            </div>
                </ul>
            </div>
            <Leaderboard  name={name} leaderboard={leaderBoard} onPressLeader={ onPressLeader} leader={leader} />
            <div cLass="spectlist">
                
                <h2>Spectators:</h2>
                
                 <Spect spect={spect} />
                 
            </div>
            
        </div>

     </div>
        
   
    ) :
    
    (<div cLass="login"> 
        <h1 class="please">Please Login</h1>
        <Login inputRef = {inputRef}onPressLogin ={onPressLogin} />
        
    </div>)
    }
   
    </div>
    
    );
}