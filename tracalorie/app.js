////// STORAGE CONTROLLER 
const storageController = (function () {
    // public methods
    return {
        // store item
        storeItem: function (newItem) {
            let items;
            // check LocalStorage for items
            if (localStorage.getItem("items") === null) {
                items = [];
                // push new item
                items.push(newItem);
                // put into LocalStorage, convert to string
                localStorage.setItem("items", JSON.stringify(items));
            } else {
                // get items from LocalStorage, convert to object
                items = JSON.parse(localStorage.getItem("items"));
                // push new item
                items.push(newItem);
                // put into LocalStorage, convert to string
                localStorage.setItem("items", JSON.stringify(items));
            }
        },
        // get items from LocalStorage
        getItemsFromLocalStorage: function () {
            let items;
            // check LocalStorage for items
            if (localStorage.getItem("items") === null) {
                items = [];
            } else {
                // put items from storage into variable, convert to object
                items = JSON.parse(localStorage.getItem("items"));
            }
            return items;
        },
        // update item in LocalStorage
        updateItemInLocalStorage: function (updatedItem) {
            // get items from local storage, convert to object
            let items = JSON.parse(localStorage.getItem("items"));
            // loop
            items.forEach(function (item, index) {
                if (updatedItem.id === item.id) {
                    // splice index item, put updated item
                    items.splice(index, 1, updatedItem);
                }
            });
            // put into LocalStorage, convert to string
            localStorage.setItem("items", JSON.stringify(items));
        },
        // delete item from LocalStorage
        deleteItemFromLocalStorage: function (id) {
            // get items from local storage, convert to object
            let items = JSON.parse(localStorage.getItem("items"));
            // loop
            items.forEach(function (item) {
                if (id === item.id) {
                    // splice item
                    items.splice(item, 1);
                }
            });
            // put into LocalStorage, convert to string
            localStorage.setItem("items", JSON.stringify(items));
        },
        // clear all from LocalStorage
        clearAllFromLocalStorage: function () {
            localStorage.removeItem("items");
        },
    }
})();










////// ITEM CONTROLLER
const itemController = (function () {
    // constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    // data
    const data = {
        items: storageController.getItemsFromLocalStorage(),
        currentItem: null,
        totalCalories: 0,
    }
    // public methods
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            // create ID
            let ID;
            // if array exists
            if (data.items.length > 0) {
                // find last item ID, increment by one
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                // if not, create first item
                ID = 0;
            }
            // convert calories to number
            calories = parseInt(calories);
            // create new item
            newItem = new Item(ID, name, calories);
            // push into items array
            data.items.push(newItem);
            // return
            return newItem;
        },
        getItemById: function (id) {
            let found = null;
            // loop
            data.items.forEach(function (item) {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        // update item
        updateItem: function (name, calories) {
            calories = parseInt(calories);
            let found = null;
            // loop
            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        // delete item
        deleteItem: function (id) {
            // get IDs
            const ids = data.items.map(function (item) {
                return item.id;
            });
            // get index
            const index = ids.indexOf(id);
            // remove item
            data.items.splice(index, 1);
        },
        // delete all items
        deleteAllItems: function () {
            data.items = [];
        },
        // set current item
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        // get current item
        getCurrentItem: function () {
            return data.currentItem;
        },
        // get total calories
        getTotalCalories: function () {
            // set variable
            let calories = 0;
            // loop through data.items array
            data.items.forEach(function (item) {
                // add all item.calories to calories
                calories += item.calories;
            });
            // rewrite data.totalCalories
            data.totalCalories = calories;
            // return data.totalCalories
            return data.totalCalories;
        },
        logData: function () {
            return data;
        },
    }
})();










////// UI CONTROLLER
const uiController = (function () {
    // UI variables
    const uiVariables = {
        itemList: "itemList",
        listItems: "#itemList li",
        addButton: "addButton",
        updateButton: "updateButton",
        deleteButton: "deleteButton",
        clearButton: "clearButton",
        backButton: "backButton",
        mealNameInput: "mealNameInput",
        mealCaloriesInput: "mealCaloriesInput",
        totalCalories: "totalCalories",
    }
    // public methods
    return {
        displayList: function (items) {
            // initialize empty variable
            let html = "";
            // loop through items
            items.forEach(item => {
                html += `
                    <li id="item-${item.id}" class="collection-item">
                        <strong>${item.name}:</strong> <em>${item.calories} kcal</em>
                        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    </li>
                `;
            });
            // put items into list
            document.getElementById(uiVariables.itemList).innerHTML = html;
        },
        // add list item
        addListItem: function (newItem) {
            // show list
            document.getElementById(uiVariables.itemList).classList.remove("hide");
            // set html to current list
            let html = document.getElementById(uiVariables.itemList).innerHTML;
            // append newItem
            html += `
                <li id="item-${newItem.id}" class="collection-item">
                    <strong>${newItem.name}:</strong> <em>${newItem.calories} kcal</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                </li>
            `;
            // display list with new item in it
            document.getElementById(uiVariables.itemList).innerHTML = html;
        },
        // update list item
        updateListItem: function (updatedItem) {
            // get current list as node list
            let listItems = document.querySelectorAll(uiVariables.listItems);
            // convert node list to array
            listItems = Array.from(listItems);
            // loop
            listItems.forEach(function (item) {
                const itemId = item.getAttribute("id");
                if (itemId === `item-${updatedItem.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML = `
                        <strong>${updatedItem.name}:</strong> <em>${updatedItem.calories} kcal</em>
                        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    `;
                }
            });
        },
        // delete list item
        deleteListItem: function (id) {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },
        // delete all list items
        deleteAllListItems: function () {
            document.getElementById(uiVariables.itemList).innerHTML = "";
        },
        // get UI variables
        getUiVariables: function () {
            return uiVariables;
        },
        // get input
        getInput: function () {
            // return input values
            return {
                name: document.getElementById(uiVariables.mealNameInput).value,
                calories: document.getElementById(uiVariables.mealCaloriesInput).value,
            }
        },
        // clear input
        clearInput: function () {
            document.getElementById(uiVariables.mealNameInput).value = "";
            document.getElementById(uiVariables.mealCaloriesInput).value = "";
        },
        // add item to form
        addItemToForm: function () {
            document.getElementById(uiVariables.mealNameInput).value = itemController.getCurrentItem().name;
            document.getElementById(uiVariables.mealCaloriesInput).value = itemController.getCurrentItem().calories;
            uiController.showEditState();
        },
        // hide list
        hideList: function () {
            document.getElementById(uiVariables.itemList).classList.add("hide");
        },
        // display calories
        displayCalories: function () {
            document.getElementById(uiVariables.totalCalories).textContent = itemController.getTotalCalories();
        },
        // clear edit state
        clearEditState: function () {
            // clear input
            uiController.clearInput();
            // show/hide buttons
            document.getElementById(uiVariables.updateButton).classList.add("hide");
            document.getElementById(uiVariables.deleteButton).classList.add("hide");
            document.getElementById(uiVariables.backButton).classList.add("hide");
            document.getElementById(uiVariables.addButton).classList.remove("hide");
        },
        // show edit state
        showEditState: function () {
            // show/hide buttons
            document.getElementById(uiVariables.updateButton).classList.remove("hide");
            document.getElementById(uiVariables.deleteButton).classList.remove("hide");
            document.getElementById(uiVariables.backButton).classList.remove("hide");
            document.getElementById(uiVariables.addButton).classList.add("hide");
        }
    }
})();










////// MAIN CONTROLLER
const mainController = (function (storageController, itemController, uiController) {
    // load event listeners
    const loadEventListeners = function () {
        // get UI variables
        const uiVariables = uiController.getUiVariables();
        // add item event
        document.getElementById(uiVariables.addButton).addEventListener("click", addItemSubmit);
        // disable submit on Enter key hit
        document.addEventListener("keypress", function (eventObject) {
            // 13 is code for Enter, ".which" is older syntax
            if (eventObject.keyCode === 13 || eventObject.which === 13) {
                eventObject.preventDefault();
                return false;
            }
        });
        // edit item event
        document.getElementById(uiVariables.itemList).addEventListener("click", itemEditClick);
        // update item event
        document.getElementById(uiVariables.updateButton).addEventListener("click", itemUpdateSubmit);
        // delete item event
        document.getElementById(uiVariables.deleteButton).addEventListener("click", itemDeleteSubmit);
        // back item event
        document.getElementById(uiVariables.backButton).addEventListener("click", uiController.clearEditState);
        // clear all event
        document.getElementById(uiVariables.clearButton).addEventListener("click", clearAll);
    }
    // add item submit
    const addItemSubmit = function (eventObject) {
        // get form input
        const input = uiController.getInput();
        // check if input not empty
        if (input.name !== "" && input.calories !== "") {
            // add item
            const newItem = itemController.addItem(input.name, input.calories);
            // display item in UI
            uiController.addListItem(newItem);
            // store
            storageController.storeItem(newItem);
            // clear input
            uiController.clearInput();
            // display total calories
            uiController.displayCalories();
        }
        // prevent default behaviour
        eventObject.preventDefault();
    }
    // item edit click
    const itemEditClick = function (eventObject) {
        // set eventObject.target to edit-item icon
        if (eventObject.target.classList.contains("edit-item")) {
            // get item ID (in <li>)
            const itemId = eventObject.target.parentNode.parentNode.id;
            // convert to array, divide by dash
            const itemIdArray = itemId.split("-");
            // set item ID to number part of array
            const id = parseInt(itemIdArray[1]);
            // get item to edit
            const itemToEdit = itemController.getItemById(id);
            // set currentItem
            itemController.setCurrentItem(itemToEdit);
            // add item to form
            uiController.addItemToForm();
        }
        // prevent default behaviour
        eventObject.preventDefault();
    }
    // item update submit event
    const itemUpdateSubmit = function (eventObject) {
        // get item input
        const input = uiController.getInput();
        // update item
        const updatedItem = itemController.updateItem(input.name, input.calories);
        // update UI
        uiController.updateListItem(updatedItem);
        // display total calories
        uiController.displayCalories();
        // clear input
        uiController.clearInput();
        // update LocalStorage
        storageController.updateItemInLocalStorage(updatedItem);
        // clear edit state
        uiController.clearEditState();
        // prevent default behaviour
        eventObject.preventDefault();
    }
    // item delete submit event
    const itemDeleteSubmit = function (eventObject) {
        // get current item
        const currentItem = itemController.getCurrentItem();
        // delete item
        itemController.deleteItem(currentItem.id);
        // delete from UI
        uiController.deleteListItem(currentItem.id);
        // display total calories
        uiController.displayCalories();
        // clear input
        uiController.clearInput();
        // delete from LocalStorage
        storageController.deleteItemFromLocalStorage(currentItem.id);
        // clear edit state
        uiController.clearEditState();
        // get items from data
        const items = itemController.getItems();
        // hide list if empty
        if (items.length === 0) {
            uiController.hideList();
        }
        // prevent default behaviour
        eventObject.preventDefault();
    }
    // clear all event
    const clearAll = function () {
        // delete all from data
        itemController.deleteAllItems();
        // delete all from UI
        uiController.deleteAllListItems();
        // display total calories
        uiController.displayCalories();
        // clear input
        uiController.clearInput();
        // clear all from LocalStorage
        storageController.clearAllFromLocalStorage();
        // clear edit state
        uiController.clearEditState();
        // get items from data
        const items = itemController.getItems();
        // hide list if empty
        if (items.length === 0) {
            uiController.hideList();
        }
    }

    // public methods
    return {
        init: function () {
            // clear edit state
            uiController.clearEditState();
            // get items from data
            const items = itemController.getItems();
            // hide list if empty
            if (items.length === 0) {
                uiController.hideList();
            } else {
                // display items
                uiController.displayList(items);
            }
            // display calories
            uiController.displayCalories();
            // load event listener
            loadEventListeners();
        }
    }
})(storageController, itemController, uiController);

// Call init
mainController.init();
