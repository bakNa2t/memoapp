const itemForm = document.getElementById("item__form");
const itemInput = document.getElementById("item__input");
const itemList = document.getElementById("item__list");
const itemClear = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const switchEditBtn = itemForm.querySelector("button");
const themeBtn = document.querySelector(".theme__container");
let isEditMode = false;

//===== get items from Local Storage and display them
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });

  resetListInterface();
}

//===== add function 'omAddItemSubmit'
function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //check if input is empty
  if (newItem.trim() === "") {
    alert("Please enter a MemoNote");
    return;
  }

  //===== check if item on edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".items_edit_mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("items_edit_mode");
    itemToEdit.remove();
    switchEditBtn.classList.remove("items_edit_mode");
    isEditMode = false;
  } else {
    if (checkDuplicateItem(newItem)) {
      alert("MemoNote is alredy in the MEMOAPP");
      return;
    }
  }

  // ===== create DOM element in the List
  addItemToDOM(newItem);

  //===== add items to Local Storage
  addItemsToStorage(newItem);

  //===== clear display from filter input and clear button
  resetListInterface();

  itemInput.value = "";
}

// ===== add item to the DOM
function addItemToDOM(item) {
  //create element with new list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove__item btn__link icon_color");
  li.appendChild(button);

  //===== add new item to list in the start of the list
  if (itemList === null) {
    itemList.appendChild(li);
  } else {
    itemList.insertBefore(li, itemList.firstChild);
  }
}

//===== create button inside list item
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-regular fa-trash-can");
  button.appendChild(icon);
  return button;
}

//===== create 'cross mark' icon inside button
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

//===== add item to Local Storage
function addItemsToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  //===== add new item to array
  itemsFromStorage.push(item);

  //===== convert to JSON string and set to Local Storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//===== get items from Local Storage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

//===== find 'li' element from DOM to remove
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove__item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    if (!e.target.classList.contains("items")) {
      setItemToEdit(e.target);
    }
  }
}

//===== set 'li' element to edit mode
function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("items_edit_mode"));

  item.classList.toggle("items_edit_mode");
  switchEditBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Memo';
  switchEditBtn.classList.add("items_edit_mode");
  itemInput.value = item.textContent;
}

//===== check if duplicate item exists
function checkDuplicateItem(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemInput.value = "";
  return itemsFromStorage.includes(item);
}

//===== remove 'li' element from list clicking 'cross mark' icon from DOM
function removeItem(item) {
  if (confirm("Are you really want to remove MemoNote?")) {
    //=====  remove 'li' element from DOM
    item.remove();
    //===== remove Edit mode class
    switchEditBtn.classList.remove("items_edit_mode");
    //===== remove 'li' element from Local Storage
    removeItemFromStorage(item.textContent);

    resetListInterface();
  }
}

//===== remove item from Local Storage
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  //===== filter out item to removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //===== re-set to Local Storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearAllItems() {
  if (confirm("Are you really want to remove all MemoNotes?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    //===== remove all items from Local Storage
    localStorage.removeItem("items");
  }

  resetListInterface();
}

//===== filter list items
function filterItems(e) {
  const items = document.querySelectorAll("li");
  const inputText = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(inputText) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//===== hide filter input and clear button with empty list
function resetListInterface() {
  itemInput.value = "";

  const items = document.querySelectorAll("li");

  if (items.length === 0) {
    itemClear.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    itemClear.style.display = "block";
    itemFilter.style.display = "block";
  }

  switchEditBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Memo';

  isEditMode = false;
}

// Toggle Dark/Light mode
function toggleTheme() {
  let elem = document.body;

  elem.classList.toggle("light");

  if (elem.classList.contains("light")) {
    document.querySelector(".theme__light").style.display = "flex";
    document.querySelector(".theme__dark").style.display = "none";
  } else {
    document.querySelector(".theme__light").style.display = "none";
    document.querySelector(".theme__dark").style.display = "flex";
  }
}

//===== run all eventListeners
function init() {
  //===== add eventListeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  itemClear.addEventListener("click", clearAllItems);
  itemFilter.addEventListener("input", filterItems);
  themeBtn.addEventListener("click", toggleTheme);
  document.addEventListener("DOMContentLoaded", displayItems);

  resetListInterface();
}

init();
