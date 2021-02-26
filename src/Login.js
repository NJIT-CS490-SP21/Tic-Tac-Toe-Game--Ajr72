export function Login(props){
    
    return (
        <div className = "login">
            <input type ="text"></input>
            <button  onClick={()=>props.onPressLogin()}>Login</button>
        </div>
        );
}













