// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit", itemHandle);
//clear item
list.addEventListener("click", clearItem);
//edit item
list.addEventListener("click", editItem);
//clear items (all)
clearBtn.addEventListener("click", clearItems);
//load items
window.addEventListener("DOMContentLoaded", loadItems);

// ****** FUNCTIONS **********
//add item
function itemHandle(ev) {
  ev.preventDefault();
  const value = grocery.value;
  //generate random id (1000-9999)
  const id = createID();
  //add item
  if (value && !editFlag) {
    addItem(id, value);
    displayAlert("item added to the list", "success", 2);
    container.classList.add("show-container");
    //add to local storage
    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();
  }
  //edit item
  else if (value && editFlag) {
    editElement = document.querySelectorAll(`[data-id="${editID}"]`);
    editElement[0].firstChild.textContent = value;
    displayAlert("item modified successfully", "success", 2);
    //edit item to local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger", 2);
  }
}

//add item
function addItem(id, value) {
  const element = document.createElement("article");
  element.classList.add("grocery-item");
  element.setAttribute("data-id", id);
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
  list.appendChild(element);
}

//clear item
function clearItem(ev) {
  const btn = ev.target.parentNode;
  if (!btn.classList.contains("delete-btn")) {
    return;
  }
  const item = btn.parentNode.parentNode;
  const id = item.dataset.id;
  list.removeChild(item);
  displayAlert("item removed", "success", 2);
  const itemNo = document.querySelectorAll(
    ".grocery-list .grocery-item"
  ).length;
  if (itemNo < 1) {
    container.classList.remove("show-container");
    localStorage.removeItem("list");
  } else {
    removeFromLocalStorage(id);
  }
  setBackToDefault();
}

//edit item
function editItem(ev) {
  item = ev.target.parentNode;
  if (!item.classList.contains("edit-btn")) {
    return;
  }
  editID = item.parentNode.parentNode.getAttribute("data-id");
  editFlag = true;
  submitBtn.textContent = "edit";
  grocery.value = item.parentNode.previousElementSibling.textContent;
  displayAlert("edit mode active", "danger", 2);
}

//clear all items
function clearItems() {
  const itemsToClear = list.querySelectorAll(".grocery-item");
  itemsToClear.forEach(function (item) {
    const id = item.dataset.id;
    item.remove();
  });
  localStorage.removeItem("list");
  displayAlert("all items cleared!", "success", 2);
  container.classList.remove("show-container");
  setBackToDefault();
}

//generate random ID (as string)
function createID() {
  //generate random id (1000-9999)
  let id = Math.floor(new Date().getTime() % 10000);
  if (id < 1000 && id > 99) {
    id = id *= 10;
  } else if (id < 100 && id > 9) {
    id = id *= 100;
  } else if (id < 10) {
    id = id *= 1000;
  }
  return id.toString();
}

//display alert
function displayAlert(text, action, timeoutSec) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, timeoutSec * 1000);
}
//set back to defualt
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id: id, value: value };
  let items = getFromLocal();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  const grocery = { id: id, value: value };
  let items = getFromLocal();
  const index = items.findIndex((item) => {
    return item.id === id;
  });
  items.splice(index, 1, grocery);

  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  const items = getFromLocal();
  const filteredItems = items.filter((item) => {
    return item.id !== id;
  });
  localStorage.setItem("list", JSON.stringify(filteredItems));
}

function getFromLocal() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// ****** SETUP ITEMS **********
function loadItems() {
  const items = getFromLocal();
  if (items.length > 0) {
    items.forEach((item) => {
      addItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
