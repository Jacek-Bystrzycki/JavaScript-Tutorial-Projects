import getRandom from "./getRandom.js";
import displayItems from "./displayItems.js";
import toLocalStorage from "./toLocalStorage.js";
import displayMessage from "./message.js";

const form = document.querySelector(".form");
const formInput = document.querySelector(".input");
const list = document.querySelector(".list");
const submit = document.querySelector(".submit");
const clearBtn = document.querySelector(".clear-btn");

let id = 1;
let edit = false;
let items = [];

const setDefaults = () => {
  id = 0;
  edit = false;
  formInput.value = "";
  submit.textContent = "Input";
};

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("items")) {
    items = JSON.parse(localStorage.getItem("items"));
    displayItems(items);
    setDefaults();
    clearBtn.classList.remove("clear-hide");
  } else {
    items = [];
  }
});

//form
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const value = formInput.value;

  if (value && !edit) {
    const item = { id: getRandom(), value: value };
    items.push(item);
    displayItems(items);
    setDefaults();
    toLocalStorage(items);
    displayMessage("green", "Item added", 2000);
    clearBtn.classList.remove("clear-hide");
  } else if (value && edit) {
    const index = items.findIndex((item) => {
      return item.id === id;
    });
    items[index].value = value;
    displayItems(items);
    setDefaults();
    toLocalStorage(items);
    displayMessage("green", "Item edited", 2000);
  } else {
    displayMessage("red", "Type some text!!!", 2000);
  }
});

list.addEventListener("click", (ev) => {
  id = parseInt(ev.target.parentElement.parentElement.dataset.id);
  const index = items.findIndex((item) => {
    return item.id === id;
  });
  if (
    !ev.target.classList.contains("btn-edit") &&
    !ev.target.classList.contains("btn-delete")
  )
    return;
  //edit
  else if (ev.target.classList.contains("btn-edit")) {
    console.log(index);
    formInput.value = items[index].value;
    submit.textContent = "Edit";
    edit = true;
    displayMessage("red", "EDIT MODE", 5000);
  }
  //delete
  else {
    items.splice(index, 1);
    displayItems(items);
    setDefaults();
    toLocalStorage(items);
    displayMessage("red", "Item removed", 2000);
    if (items.length < 1) {
      clearBtn.classList.add("clear-hide");
      localStorage.clear();
    }
  }
});

clearBtn.addEventListener("click", () => {
  items = [];
  displayItems(items);
  setDefaults();
  //   toLocalStorage(items);
  localStorage.clear();
  clearBtn.classList.add("clear-hide");
  displayMessage("red", "All removed", 2000);
});
