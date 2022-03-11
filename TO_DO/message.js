const displayMessage = (color, text, time) => {
  const element = document.querySelector(".message");
  element.classList.add(color);
  element.textContent = text;
  setTimeout(() => {
    element.classList.remove(color);
    element.textContent = "_";
  }, time);
};

export default displayMessage;
