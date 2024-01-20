//@ts-ignore
import JSX from "./superTypes";

let root = document.getElementById("Root");

class ProActive {
  public camelCaseToStrikeCase(camelString: string): string {
    let snakeCase = "";
    for (let i = 0; i < camelString.length; i++) {
      const char = camelString[i];
      if (char.match(/[A-Z]/)) {
        // If it's an uppercase letter, add an underscore before it
        snakeCase += "-" + char.toLowerCase();
      } else {
        // Otherwise, just append the character as-is
        snakeCase += char;
      }
    }

    // Remove any leading underscore
    return snakeCase.replace(/^-/, "");
  }

  public Render(jsx: string, parentElement?: JSX.tag) {
    let openingTagIndex: JSX.tag = {
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

    for (let i = 0; i < jsx?.length; i++) {
      const char = jsx[i];

      // first layer

      if (char === "<") {
        openingTagIndex.opening.startIndex = i;
      } else if (char === ">") {
        openingTagIndex.opening.endIndex = i;
        const firstSpace = jsx.indexOf(" ", openingTagIndex.opening.startIndex);
        openingTagIndex.element = jsx
          .slice(++openingTagIndex.opening.startIndex, firstSpace)
          .trim() as keyof HTMLElementTagNameMap;
        console.log("tagName: ", openingTagIndex.element);
        openingTagIndex.closing.startIndex = jsx.indexOf(
          `</${openingTagIndex.element}>`,
          openingTagIndex.opening.endIndex
        );
        openingTagIndex.closing.endIndex = jsx.indexOf(
          ">",
          openingTagIndex.closing.startIndex
        );

        // element propereys

        let elementProperties = jsx.slice(
          firstSpace,
          openingTagIndex.opening.endIndex
        );
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
            } else {
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
          .slice(
            ++openingTagIndex.opening.endIndex,
            openingTagIndex.closing.startIndex
          )
          .trim();
        if (childString.length > 0) {
          let child: JSX.tag | undefined;

          if (
            childString.indexOf("<") !== null &&
            childString.indexOf("<") > -1
          ) {
            child = this.Render(childString, openingTagIndex);
            openingTagIndex.children.push(child);
          } else {
            openingTagIndex.children.push(childString);
          }
          // child.element

          if (
            !!child &&
            !!child.remainingJSX &&
            child.remainingJSX?.trim().length > 0
          ) {
            let childRemains = child.remainingJSX;
            while (childRemains.length > 0) {
              let otherChild: JSX.tag | undefined;
              if (
                childRemains.indexOf("<") !== null &&
                childRemains.indexOf("<") > -1
              ) {
                otherChild = this.Render(childRemains, openingTagIndex);

                if (!!child) {
                  openingTagIndex.children!.push(otherChild);
                }
              } else {
                if (childRemains.trim().length > 0) {
                  openingTagIndex.children.push(childRemains);
                }
              }

              if (!!otherChild) {
                childRemains = otherChild.remainingJSX?.trim() ?? "";
              }
            }
          }
        }
        break;
      }
    }
    if (openingTagIndex.closing.endIndex > 0) {
      openingTagIndex.remainingJSX = jsx.slice(
        ++openingTagIndex.closing.endIndex
      );
    }
    if (openingTagIndex.remainingJSX) {
    }
    return openingTagIndex;
  }

  public createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K | JSX.Component,
    options?: { [key: string]: any } | null,
    children?: JSX.theElement[]
  ): JSX {
    if (typeof tagName === "function") {
      return tagName(options ?? {}, children);
    }

    const element: HTMLElementTagNameMap[K] = document.createElement(tagName);

    let map = options ?? {};
    let prop: keyof typeof map;
    for (prop of Object.keys(map) as any) {
      prop = prop.toString();
      const _value = map[prop] as any;
      const anyReference = element as any;
      if (typeof anyReference[prop] === 'undefined') {
        // As a fallback, attempt to set an attribute:
        element.setAttribute(prop, _value);
      } else {
        anyReference[prop] = _value;
      }
    }

    // append children
    if (children != undefined) {
        for(let child of children) {
            if(typeof child === "string"){
                element.innerText += child;
                continue;
            } else if (Array.isArray(child)) {
                element.append(...child)
            }
            
        }
    } else {
        
    }
    
return element
  

} 
  
  






  //   optionArr.forEach((optKey) => {
  //   const optionArr = Object.keys(options)
  //   let value = options[optKey as keyof JSX.ElementOptions]
  //   console.log('key', optKey, value);
  // //   if (value !== undefined) {
  //       switch (optKey) {
  //           case "style":
  //             Object.keys(value).forEach(key =>{
  //                 const newValue = value![key as keyof JSX.ElementOptions['style']]
  //                 const currentStyle = element.getAttribute('style')
  //                 element.setAttribute('style',(currentStyle ?? "") + `${this.camelCaseToStrikeCase(key)}: ${newValue};`);
  //             })
  //             break;

  //         default:
  //             break;
  //     }

  // }
  // })
  //   }

  //   if (!!children) {
  //     children.forEach((e) => {
  //         if (typeof e === 'string' || typeof e === 'number') {
  //             element.innerText = e.toString();
  //         } else {
  //             element.appendChild(e);
  //         }
  //     });
  //   }

  //   return element;
  // }

  // function createRootElement<K extends keyof HTMLElementTagNameMap>(
  //     tagName: K,
  //     options?: JSX.ElementOptions | undefined,
  //     children?: JSX.theElement[]
  //   ) {
  //     let element = this.createElement(tagName,options,children)
  //     root?.appendChild(element);
  //     return element;
  //   }
}
export { ProActive };
