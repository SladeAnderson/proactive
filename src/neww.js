import { ProActive } from "./proactive";
// const ProActive = require('./proactive.js')
function Ping({ blurt }) {
    return ProActive.createElement("div", null, blurt);
}
var el = ProActive.createElement(Ping, { blurt: "ya" });
// var div: HTMLElement
var div = ProActive.createElement("div", { id: "foo" },
    "Hello JSX! ",
    el);
document.body.appendChild(div);
