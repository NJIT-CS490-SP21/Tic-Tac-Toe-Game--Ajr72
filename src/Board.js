//importing components and library
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
import UIfx from 'uifx'; //library to add sound
import mp3File from './audios/xsound.wav';//sound when playerX plays the move
import mp3File2 from './audios/osound.wav';//sound when PlayerO plays the move

//setting sounds for each player
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

const socket = io(); //socket for client
export  function Board(){
   
    //initializing different states
    const [board, setBoard] = useState(["","","","","","","","",""]); //initial board
    const [isLogin, setLogin] = useState(false);//state to check if the user is logged in or not
    const inputRef = useRef(null);//state for username
    const [id,setId]= useState(1);//counter for users
    const [userType,setType] = useState(null);//type of user playerX or playerO or spectators
    const [move,setMove] = useState(null);//deciding if to put X or O on the board based on current user.
    const [player,setPlayer]= useState([]);//array for players only
    const [spect,setSpect] = useState([]);// array for spectators only
    const [nextTurn,setNextTurn] =useState("PlayerX");//state for deciding which player plays nect move
    const [leader,setLeader] =useState(false);//state to check if user has clicked on 'see leaderboard' button.
    const [leaderBoard,setLeaderBoard] = useState({});//state for leaderboard with the username and score.
    let winner = calculateWinner(board); //winner of the game
    const [name,setName] =useState(null);//set the name of current user of the current browser.
    let tiles = winningTiles(board);//checking which tiles were in the winning state.

 
 //a functions when a player plays a move
    function Update(index, value){
        
       if(!winner){ //this function will only run if there is no winner after there if winner there will be no effect of clicking on a tile
          if(board[index]===""){ //players will be able to click only if there is empty tile
              if(userType===nextTurn){ //players can only click on tile if it is their turn
              //updating the state og the board
         setBoard(prevList=>{
            
                const boardCopy = [...prevList];
               
                if(winner||boardCopy[index])return; // return when there is a winner or there is someting on the tile.
                value = move;
                boardCopy[index] = value;
                const future_winner = calculateWinner(boardCopy);
                 
                 
                if(boardCopy[index]==="X") //if playerX player setting next turn to plyerO and adding sound effect 
                {    xsound.play();
                    setNextTurn(prevTurn=>"PlayerO");
                }
                else{ //if playerO player setting next turn to plyerX and adding sound effect
                     osound.play();
                    setNextTurn(prevTurn=>"PlayerX");
                }
    
                if(userType==="PlayerX" || userType==="PlayerO") // emiting only if it is a playerX or playerY not a spectator
                            
                    socket.emit('move', {index:index, val:boardCopy[index],nextTurn:nextTurn});
                    
                if(future_winner){ //emit info if there is a winner
                
                        socket.emit("winner",{winner:future_winner,players:player,username:name,userType:userType});
                   
                }   
                return boardCopy;
         });
              }
           
          }
          
        
       }
        if(winner){
                    socket.emit("winner",{winner:winner,username:name,userType:userType});
                    
                } // returinging when there is a winner 
       
       
         }
           // returinging when there is a winner 
        
   //fucntion when user logs in pressing the login button  
    function onPressLogin(){
        
        if(inputRef === null){ //if user enter nothing then alerting user/\.
        alert("Enter a valid username.");
        
    }
        if(inputRef!=null){ //user can loging only when user have enter someting
        setLogin(prevIsLogin=> true);//setting the login state to true
        setId(prevId=>prevId +1); // updating  the couter 
        var username = inputRef.current.value; //setting username to the inputRef.
        
        username=inputRef.current.value;
        setName(prevName=>username);// setting name for current browser
        addUser(id,username);//adding user to player list or spectator list based on their id number
        setUserType(id); // seting the usertype for the user
        
         socket.emit("login" , {username:username,id:id,userType:userType});
    }
    }
    //fucntion when user clicks on play again button after the game ended resetting the states
    function onReplay(){
        setBoard(prevBoard=>{
            let boardCopy = [...prevBoard];
            boardCopy = ["","","","","","","","",""];
            return boardCopy;
        });
        winner=null
        setNextTurn(prevTurn=>"PlayerX");
        console.log("relayed",board);
        socket.emit("replay", {board:board,winner:winner,nextTurn:nextTurn});
      
    }
    // function when user press button to see the leader board
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

      setBoard(prevList=>{ // updating the state of board when it recieves an event from server
          
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
    
    
    socket.on("login",(data)=>{ //updating  states when recieving events from servers.
      console.log("socketid",socket.id); 
      console.log('User Logged!!!'); 
      console.log("login data",data);
      //updating the id
        setId(prevId=>{
            var tempId = prevId;
            tempId++;
            return tempId;
        });
        let id = data.id;
        let username = data.username;
        let userType = data.userType;
        //upddating the leader board
        setLeaderBoard(prevLeaderBoard=>JSON.parse(data.leaderboard));
        addUser(id,username);// adding users to playerlist and spectatorlist
        setNextMoove(userType);
      });
      //resetting every states when replay button is hit by any of the server
      socket.on("replay",(data)=>{
           setBoard(prevBoard=>{
            let boardCopy = [...prevBoard];
            boardCopy = ["","","","","","","","",""];
            return boardCopy;
        });
        setNextTurn(prevTurn=>"PlayerX");
        winner=data.winner;
          
      });
      
      //updating leaderboard when there is a winner
       socket.on("winner",(data)=>{
          console.log("winner data",data);
          let leaderboard = data.leaderboard;
          setLeaderBoard(prevLeaderBoard=>JSON.parse(leaderboard));
          
      
       }
      );
     
      
  }, []);
 
    
    const is_board_full = board.every(element=>element!="");//checking if the board is full
    console.log(is_board_full);
    console.log(userType);
   //function to add user
    function addUser(id,username){
        
        if(id< 3){ //if id counter is 1 or 2 it will add user to player list
            
                setPlayer(prevPlayer=>{
                const tempPlayer = [...prevPlayer];
                tempPlayer.push(username);
                return tempPlayer;
            });
          }
          else{ //if id counter is more than two then it will user to spectatorlist
             setSpect(prevSpect=>{
                 const tempSpect= [...prevSpect];
                 tempSpect.push(username);
                 console.log("spect",tempSpect);
                 return tempSpect;
             }) ;
          }
    }
        //function to setnext move
        
    function setNextMoove(userType){
         if(userType==="playerX"){
             setMove(prevMove=>"X");
          }
          else if(userType ==="playerO"){
              setMove(prevMove=>"O");
          }
    }
    //function to set user type
    function setUserType(id){
        if(id===1){ //if id is one than it is playerX
            setType(prevType=>"PlayerX");
            setMove(prevMove=>"X");
            
        }
        else if(id===2){ //if id is 2 then the user is player
            setType(prevType=>"PlayerO");
            setMove(prevMove=>"O");
            
        }
        else{//else user is the spectator
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