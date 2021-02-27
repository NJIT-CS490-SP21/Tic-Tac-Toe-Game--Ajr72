export function Login(props){
    
    return (
        <div className = "login">
            <input  ref={props.inputRef} type ="text" placeholder="Enter your username here!!!"></input>
            <button  onClick={()=>props.onPressLogin()}>Login</button>
        </div>
        );
}













