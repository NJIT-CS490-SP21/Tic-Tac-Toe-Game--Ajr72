export function Login(props){
    
    return (
        
        <div >
            <input  className = "login-box" ref={props.inputRef} type ="text" placeholder="Enter your username here!!!"></input>   
           <br />
            <button className="login-button" onClick={()=>props.onPressLogin()}>Login</button>
        </div>
        );
}













