export default function createNewElement<T extends HTMLElement>(element: string, classes: string[], options?: Options) {
    const newElement = <T>document.createElement(element);
    for (const className of classes) {
        newElement.classList.add(className);
    }
    
    if (options) {
        for (const key in options) {
            (newElement as unknown as Options)[key] = options[key];
        }
    }
    return newElement;
}

interface Options {
    [key: string]: string | boolean;    
}