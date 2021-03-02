export function Login(props){
    
    return (
        <div >
            <input  className = "login-box" ref={props.inputRef} type ="text" placeholder="Enter your username here!!!"></input>
            <button className="replay" onClick={()=>props.onPressLogin()}>Login</button>
        </div>
        );
}













