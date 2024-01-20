import {ProActive} from "./proactive.js";

const proact = new ProActive(); 


const mockJSX = "<ul style={{'backgroundColor': 'red'}}> <li  style={{'color': 'blue'}}> waffle </li> <li  style={{'color': 'blue'}}> bacon </li> </ul>";

console.log("result vDom: ",proact.Render(mockJSX))

