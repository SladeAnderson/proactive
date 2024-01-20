declare namespace JSX {

  interface IntrinsicElements extends IntrinsicElementMap { }

  type IntrinsicElementMap = {
    [K in keyof HTMLElementTagNameMap]: {
        [k: string]: any
    }
  }

  interface ElementClass {
    render: any;
  }

  type theElement =
    | string
    | HTMLElement
    | HTMLCanvasElement
    | HTMLButtonElement
    | HTMLHeadingElement
    | HTMLImageElement
    | HTMLLIElement
    | HTMLUListElement;

  interface CustomElement {
    tagName: string;
    options: elementOptions[];
  }

  interface elementOptions {
    key: string;
    value: string;
  }

  interface ElementOptions {
    style?: {
        color?: string,
        backgroundColor?: string,
        border?: string,
        display?: string
    }
  }

  interface Component {
    (properties?: { [key: string]: any }, children?: Node[]): Node
  }

  interface tag {
    opening: {
      startIndex: number;
      endIndex: number;
    };
    closing: {
      startIndex: number;
      endIndex: number;
    };
    children: (tag | string)[];
    remainingJSX?: string;
    layer?: number;
    element?: keyof HTMLElementTagNameMap;
    styles?: string;
  }

}
