import Header from './components/header.js';
import Task from './components/tasks.js';
import Footer from './components/footer.js';

let inputContainer = document.querySelector('.input-container');
let inputText;
let footer;
let taskComponent;
let selectedListType = "allSelected";

let header = new Header(inputContainer, setInput, notifyAllCheck);

function setInput(text) {
  inputText = text;

  if (inputText) {
    header.renderCheckAllBtn();

    let taskContainer = document.querySelector('.task-container');

    taskComponent = new Task(taskContainer, onDeleteBtnClick, onCheckboxCheck);
    taskComponent.addTodo(inputText);

    footer = new Footer(document.querySelector('.footer'), notifyClearCompleted, notifySelectAll, notifySelectActive, notifySelectCompleted);
    footer.render();
    updateItemsLeft();
    refreshListType();
  }
}

function onDeleteBtnClick() {
  updateItemsLeft();
}

function onCheckboxCheck() {
  updateItemsLeft();
  refreshListType();
}

let refreshListType = () => {
  if (selectedListType === "allSelected") {
    taskComponent.allSelect();
  } else if (selectedListType === "activeSelected") {
    taskComponent.activeSelect();
  } else if (selectedListType === "completedSelected") {
    taskComponent.completedSelect();
  }
}

function notifyAllCheck() {
  taskComponent.checkAll();
  updateItemsLeft();
}

function notifyClearCompleted() {
  taskComponent.clearCompleted();
  updateItemsLeft();
}

let notifySelectAll = () => {
  selectedListType = taskComponent.allSelect();
}

let notifySelectActive = () => {
  selectedListType = taskComponent.activeSelect();
}

let notifySelectCompleted = () => {
  selectedListType = taskComponent.completedSelect();
}

let updateItemsLeft = () => {
  let itemsLeft = taskComponent.countItemsLeft();
  footer.renderCounter(itemsLeft);

  let totalItems = taskComponent.countTotalItems();
  if (totalItems === 0) {
    footer.hide();
    header.hideCheckAll();
  }
}
