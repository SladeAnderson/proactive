let root = document.getElementById("Root");
class ProActive {
    camelCaseToStrikeCase(camelString) {
        let snakeCase = "";
        for (let i = 0; i < camelString.length; i++) {
            const char = camelString[i];
            if (char.match(/[A-Z]/)) {
                // If it's an uppercase letter, add an underscore before it
                snakeCase += "-" + char.toLowerCase();
            }
            else {
                // Otherwise, just append the character as-is
                snakeCase += char;
            }
        }
        // Remove any leading underscore
        return snakeCase.replace(/^-/, "");
    }
    Render(jsx, parentElement) {
        var _a, _b, _c;
        let openingTagIndex = {
            opening: {
                startIndex: -1,
                endIndex: -1,
            },
            closing: {
                startIndex: -1,
                endIndex: -1,
            },
            children: [],
        };
        for (let i = 0; i < (jsx === null || jsx === void 0 ? void 0 : jsx.length); i++) {
            const char = jsx[i];
            // first layer
            if (char === "<") {
                openingTagIndex.opening.startIndex = i;
            }
            else if (char === ">") {
                openingTagIndex.opening.endIndex = i;
                const firstSpace = jsx.indexOf(" ", openingTagIndex.opening.startIndex);
                openingTagIndex.element = jsx
                    .slice(++openingTagIndex.opening.startIndex, firstSpace)
                    .trim();
                console.log("tagName: ", openingTagIndex.element);
                openingTagIndex.closing.startIndex = jsx.indexOf(`</${openingTagIndex.element}>`, openingTagIndex.opening.endIndex);
                openingTagIndex.closing.endIndex = jsx.indexOf(">", openingTagIndex.closing.startIndex);
                // element propereys
                let elementProperties = jsx.slice(firstSpace, openingTagIndex.opening.endIndex);
                console.log("Element Properties: ", elementProperties);
                for (let j = 0; j < elementProperties.length; j++) {
                    const PropChar = elementProperties[j];
                    if (PropChar !== " ") {
                        let middleChild = elementProperties.indexOf("=", j) + 2;
                        let lastChild = elementProperties.indexOf("}", middleChild) + 1;
                        let key = elementProperties.slice(j, middleChild - 2);
                        let familyValues;
                        console.log("Prop Key: ", key);
                        if (lastChild > middleChild) {
                            familyValues = elementProperties.slice(middleChild, lastChild);
                        }
                        else {
                            familyValues = elementProperties.slice(middleChild);
                        }
                        console.log("the Family Values: ", familyValues);
                        if (key.trim() === "style") {
                            openingTagIndex.styles = familyValues;
                        }
                        break;
                    }
                }
                // second layer
                const childString = jsx
                    .slice(++openingTagIndex.opening.endIndex, openingTagIndex.closing.startIndex)
                    .trim();
                if (childString.length > 0) {
                    let child;
                    if (childString.indexOf("<") !== null &&
                        childString.indexOf("<") > -1) {
                        child = this.Render(childString, openingTagIndex);
                        openingTagIndex.children.push(child);
                    }
                    else {
                        openingTagIndex.children.push(childString);
                    }
                    // child.element
                    if (!!child &&
                        !!child.remainingJSX &&
                        ((_a = child.remainingJSX) === null || _a === void 0 ? void 0 : _a.trim().length) > 0) {
                        let childRemains = child.remainingJSX;
                        while (childRemains.length > 0) {
                            let otherChild;
                            if (childRemains.indexOf("<") !== null &&
                                childRemains.indexOf("<") > -1) {
                                otherChild = this.Render(childRemains, openingTagIndex);
                                if (!!child) {
                                    openingTagIndex.children.push(otherChild);
                                }
                            }
                            else {
                                if (childRemains.trim().length > 0) {
                                    openingTagIndex.children.push(childRemains);
                                }
                            }
                            if (!!otherChild) {
                                childRemains = (_c = (_b = otherChild.remainingJSX) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : "";
                            }
                        }
                    }
                }
                break;
            }
        }
        if (openingTagIndex.closing.endIndex > 0) {
            openingTagIndex.remainingJSX = jsx.slice(++openingTagIndex.closing.endIndex);
        }
        if (openingTagIndex.remainingJSX) {
        }
        return openingTagIndex;
    }
    createElement(tagName, options, children) {
        if (typeof tagName === "function") {
            return tagName(options !== null && options !== void 0 ? options : {}, children);
        }
        const element = document.createElement(tagName);
        let map = options !== null && options !== void 0 ? options : {};
        let prop;
        for (prop of Object.keys(map)) {
            prop = prop.toString();
            const _value = map[prop];
            const anyReference = element;
            if (typeof anyReference[prop] === 'undefined') {
                // As a fallback, attempt to set an attribute:
                element.setAttribute(prop, _value);
            }
            else {
                anyReference[prop] = _value;
            }
        }
        // append children
        if (children != undefined) {
            for (let child of children) {
                if (typeof child === "string") {
                    element.innerText += child;
                    continue;
                }
                else if (Array.isArray(child)) {
                    element.append(...child);
                }
            }
        }
        else {
        }
        return element;
    }
}
export { ProActive };
