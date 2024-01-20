import { ProActive } from "./proactive";
// const ProActive = require('./proactive.js')
 
function Ping({ blurt }: { blurt: string }) {
    return <div>{blurt}</div>
}

var el = <Ping blurt="ya"></Ping>;

// var div: HTMLElement
var div = <div id="foo">Hello JSX! {el}</div>;

document.body.appendChild(div)