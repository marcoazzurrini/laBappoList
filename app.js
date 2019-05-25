// GRAM ELEMENTS
const todoInput = document.querySelector('#todoInput');
const dateInput = document.querySelector('#dateInput');
const todoBtn = document.querySelector('#todoBtn');
const todoGroup = document.querySelector('#todoGroup');
const dateGroup = document.querySelector('#dateGroup');
const alertDiv = document.querySelector('.alertDiv');
const clearTasks = document.querySelector('#clearTasks');

const Today = new Date();
const day = Today.getDate();
const month = Today.getMonth();
const year = Today.getFullYear();
const minDate = `${year}0${month + 1}${day}`;
const minDateNumber = parseInt(minDate);
console.log(minDateNumber);

// SET MIN VALUE FOR DATE INPUT
dateInput.setAttribute('min', minDate);

// ADD EVENT LISTENERS
todoBtn.addEventListener('click', addTodo);
clearTasks.addEventListener('click', clearAllTasks);
// DOM Load event
document.addEventListener('DOMContentLoaded', getTasks);

// DECLARE ALERTS
// FAIL ALERT
const failAlert = document.createElement('div');
failAlert.classList.add('alert', 'alert-danger');
failAlert.innerHTML = 'Riempi Ognihosa!';

// SUCCESS ALERT
const successAlert = document.createElement('div');
successAlert.classList.add('alert', 'alert-success');
successAlert.innerHTML = 'Perfetto, Incastrao Alla Grande!';

// REMOVE ALERT
const removeAlert = document.createElement('div');
removeAlert.classList.add('alert', 'alert-warning');
removeAlert.innerHTML = 'Coso scastrato';

//GET TASKS FROM LS
function getTasks() {
    let todos;
    let dates;

    if (localStorage.getItem('todos') === null) {
        todos = [];
        dates = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        dates = JSON.parse(localStorage.getItem('dates'));
    }

    todos.forEach(function (todo) {
        // INIT DELETE ICN
        const deleteIcn = document.createElement('i');
        deleteIcn.classList.add('fas', 'fa-trash', 'text-danger', 'ml-auto');
        deleteIcn.id = 'deleteIcn';

        // Create Element
        let todoItem = document.createElement('li');

        // Add classes
        todoItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'item');

        // Add input value to todo item
        todoItem.innerText = todo;
        // Append deleteIcn & dateItem to todoItem
        todoItem.appendChild(deleteIcn);
        // append todo to list group
        todoGroup.appendChild(todoItem);
    });

    dates.forEach(function (date) {
        // Create Element
        let dateItem = document.createElement('li');
        // Add classes
        dateItem.classList.add('list-group-item', 'text-center', 'align-items-center', 'date');
        // Add input value to todo item
        dateItem.innerText = date;
        // append date to list group
        dateGroup.appendChild(dateItem);
    });

    //DINAMICALLY ADD CLASSES TO TODO & DATE
    let itemsList = document.getElementsByClassName('item');
    let datesList = document.getElementsByClassName('date');
    for (let i = 0; i < itemsList.length; i++) {
        Array.from(itemsList).forEach(function (item) {
            itemsList[i].classList.add(i);
        });
        Array.from(datesList).forEach(function (date) {
            datesList[i].classList.add(i);
        });
    }
}



// addTodo FUNCTION
function addTodo(e) {

    if (todoInput.value === '' || dateInput.value === '') {

        // append fail alert
        alertDiv.appendChild(failAlert);
        // remove alert from alertDiv
        setTimeout(function () {
            alertDiv.innerHTML = '';
        }, 2000);

    } else {


        const dateInputValue = dateInput.value;
        const dateInputValueArr = dateInputValue.split('-');

        const dateInputYear = dateInputValueArr[0],
            dateInputMonth = dateInputValueArr[1],
            dateInputDay = dateInputValueArr[2],
            dateInputNum = `${dateInputYear}${dateInputMonth}${dateInputDay}`;

        if (dateInputNum < minDateNumber || dateInputYear.length > 4 || parseInt(dateInputYear, 10) > 2099) {
            // FAIL DATE ALERT
            const DateFailAlert = document.createElement('div');
            DateFailAlert.classList.add('alert', 'alert-danger');
            DateFailAlert.innerHTML = 'Icche fai le cose ni passato? Gnamo fai a modino, metti una data futura!';
            // append fail alert
            alertDiv.appendChild(DateFailAlert);
            // remove alert from alertDiv
            setTimeout(function () {
                alertDiv.innerHTML = '';
            }, 4000);
            // Clear fields
            todoInput.value = '';
            dateInput.value = '';
        } else {


            // INIT DELETE ICN
            const deleteIcn = document.createElement('i');
            deleteIcn.classList.add('fas', 'fa-trash', 'text-danger', 'ml-auto');
            deleteIcn.id = 'deleteIcn';

            // Create Element
            let todoItem = document.createElement('li');
            let dateItem = document.createElement('li');

            // Add classes
            todoItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'item');
            dateItem.classList.add('list-group-item', 'text-center', 'align-items-center', 'date');

            // Add input value to todo item
            todoItem.innerText = todoInput.value;
            dateItem.innerText = dateInput.value;

            // Append deleteIcn & dateItem to todoItem
            todoItem.appendChild(deleteIcn);

            // append todo to list group
            dateGroup.appendChild(dateItem);
            todoGroup.appendChild(todoItem);

            // STORE TO LS
            storeTaskToLs(todoInput.value, dateInput.value);

            // Clear field after append
            todoInput.value = '';
            dateInput.value = '';

            // append success alert
            alertDiv.appendChild(successAlert);

            // remove alert from alertDiv
            setTimeout(function () {
                alertDiv.innerHTML = '';
            }, 2000);

            //DINAMICALLY ADD CLASSES TO TODO & DATE
            let itemsList = document.getElementsByClassName('item');
            for (let i = 0; i < itemsList.length; i++) {
                todoItem.classList.add(i);
                dateItem.classList.add(i);
            }

        }
    }

    e.preventDefault();
}



// STORE TODO AND DATE TO LS
function storeTaskToLs(todo, date) {
    let todos;
    let dates;

    if (localStorage.getItem('todos') === null) {
        todos = [];
        dates = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        dates = JSON.parse(localStorage.getItem('dates'));
    }

    todos.push(todo);
    dates.push(date);

    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('dates', JSON.stringify(dates));
}


// ADD EVENT LISTENER TO DELETE ICN (REMOVE TASKS)
document.body.addEventListener('click', function (e) {
    if (e.srcElement.id === 'deleteIcn') {
        //REMOVE LI
        let item = e.target.parentElement;

        let classLength = item.classList.length;
        let sameClass = item.classList[classLength - 1];
        let dateItems = document.getElementsByClassName('date');
        for (let i = 0; i < dateItems.length; i++) {
            let eachDate = dateItems[i];
            if (eachDate.classList.contains(sameClass)) {
                item.parentElement.removeChild(item);
                eachDate.parentElement.removeChild(eachDate);
            }
        }

        console.log(sameClass);

        // append success alert
        alertDiv.appendChild(removeAlert);

        // remove alert from alertDiv
        setTimeout(function () {
            alertDiv.innerHTML = '';
        }, 2000);

        //REMOVE FROM LS
        removeTaskFromLocalStorage(e.target.parentElement);
    }
});

// REMOVE FROM LS FUNCTION
function removeTaskFromLocalStorage(todoItem) {
    let todos;
    let dates;
    if (localStorage.getItem('todos') === null) {
        todos = [];
        dates = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        dates = JSON.parse(localStorage.getItem('dates'));
    }

    todos.forEach(function (todo, index) {
        if (todoItem.textContent === todo) {
            todos.splice(index, 1);
            dates.splice(index, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('dates', JSON.stringify(dates));
}

// CLEAR TASKS FUNCTION

function clearAllTasks() {
    todoGroup.innerHTML = '';
    dateGroup.innerHTML = '';

    // append success alert
    alertDiv.appendChild(removeAlert);

    // remove alert from alertDiv
    setTimeout(function () {
        alertDiv.innerHTML = '';
    }, 2000);

    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}