function getElement(selector, isList) {
  if (!isList) {
    const singleElement = document.querySelector(selector);
    if (singleElement) return singleElement;
    else {
      throw new Error("No selection exist");
    }
  } else {
    const arrayElements = [...document.querySelectorAll(selector)];
    if (arrayElements.length > 0) return arrayElements;
    else {
      throw new Error("No selections exist");
    }
  }
}

export default getElement;
