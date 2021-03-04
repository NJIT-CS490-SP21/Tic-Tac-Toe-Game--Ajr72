export function Spect(props){
   
    return(
        <ul>
                {props.spect.map((item,key)=>(
                  <li> {item}</li>
                ))}
               </ul> 
        
               
        );
}