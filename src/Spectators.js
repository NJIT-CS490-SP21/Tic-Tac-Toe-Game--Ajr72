export function Spect(props){
   
    return(
        <ul>
                {props.spect.map((item)=>(
                   <strong> <li> {item}</li></strong>
                ))}
               </ul> 
               
        );
}