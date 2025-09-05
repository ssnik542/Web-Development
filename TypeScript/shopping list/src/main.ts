const itemForm = document.getElementById("item-form") as HTMLFormElement;
const itemInput = document.getElementById("item-input") as HTMLInputElement;
const itemList = document.getElementById("item-list") as HTMLUListElement;
const clearBtn = document.getElementById("clear") as HTMLButtonElement;
const itemFilter = document.getElementById("filter") as HTMLInputElement;
const formBtn = itemForm.querySelector("button") as HTMLButtonElement;
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item: string) => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e: Event) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit?.textContent || "");
    itemToEdit?.classList.remove("edit-mode");
    itemToEdit?.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That item already exists!");
      return;
    }
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

function addItemToDOM(item: string) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes: string) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes: string) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function addItemToStorage(item: string) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items") || "");
  }

  return itemsFromStorage;
}

function onClickItem(e: any) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item: string) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item: HTMLUListElement) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent || "";
}

function removeItem(item: { remove: () => void; textContent: string }) {
  if (confirm("Are you Sure want to delete it?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item: string) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i: string) => i !== item);

  // Re-set to localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Clear from localStorage
  localStorage.removeItem("items");
  checkUI();
}

function filterItems(e: Event) {
  const items = itemList.querySelectorAll("li");
  const { target } = e;
  let text = "";
  if (target) {
    text = (target as HTMLInputElement).value.toLowerCase();
  }

  items.forEach((item) => {
    let itemName: string = "";
    if (item.firstChild && item.firstChild.textContent) {
      itemName = item.firstChild.textContent.toLowerCase();
    }
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";

  isEditMode = false;
}

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
