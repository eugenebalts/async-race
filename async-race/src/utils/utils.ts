import { IOptions } from '../components/types/types';

function getRandomIndex(length: number) : number{
    return Math.floor(Math.random() * (length - 1));
}

function getRandomColor(): string {
    const letters: string = "0123456789ABCDEF";
    let color: string = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createNewElement<T extends HTMLElement>(element: string, classes: string[], options?: IOptions) {
  const newElement = <T>document.createElement(element);
  for (const className of classes) {
      newElement.classList.add(className);
  }
  
  if (options) {
      for (const key in options) {
          (newElement as unknown as IOptions)[key] = options[key];
      }
  }
  return newElement;
}

export {getRandomIndex, getRandomColor, createNewElement};