class Tasks {
  #container;
  #notifyDeleteBtnClick;
  #notifyCheckBox;

  constructor(container, notifyDeleteBtnClick, notifyCheckBox) {
    this.#container = container;
    this.#notifyDeleteBtnClick = notifyDeleteBtnClick;
    this.#notifyCheckBox = notifyCheckBox;
  }

  addTodo(text) {
    let list = this.#container.querySelector('.task-list');
    let newLi = document.createElement('li');
    newLi.innerHTML = `<div><input class="check-box" type="checkbox"/> <input class="task-text" disabled type="text" value=${text}> </div>
          <i class="bi bi-file-x delete-btn d-none"></i>`;
    list.appendChild(newLi);

    let deleteBtn = newLi.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', this.#onDeleteButtonClick.bind(this));

    let checkBox = newLi.querySelector('.check-box');
    checkBox.addEventListener('click', this.#onCheckBox.bind(this));

    let taskText = newLi.querySelector('.task-text').parentNode.parentNode;
    taskText.addEventListener('dblclick', this.#onTaskDbleClick.bind(this));
    taskText.addEventListener('keypress', this.#onKeyPress.bind(this));
  }

  #onCheckBox(event) {
    this.#notifyCheckBox();
    let selectedTask = event.target.parentElement;
    let checkBox = event.target;

    if (checkBox.checked) {
      selectedTask.classList.add('strike-out');
    } else {
      selectedTask.classList.remove('strike-out');
    }
  }

  #onDeleteButtonClick(event) {
    let currentButton = event.target;
    let listItem = currentButton.parentElement;
    listItem.remove();
    this.#notifyDeleteBtnClick();
  }

  #onTaskDbleClick(event) {
    let taskTextBox = event.target.querySelector('.task-text');
    taskTextBox.disabled = false;
  }

  #onKeyPress(event) {
    if (event.key === 'Enter') {
      let taskTextBox = event.target;
      taskTextBox.disabled = true;
      taskTextBox.focus();
    }
  }

  checkAll() {
    let allListItems = this.#container.querySelectorAll('.check-box');
    let allChecked = true;

    for (let i = 0; i < allListItems.length; i++) {
      if (allListItems[i].checked === false) {
        allChecked = false;
        break;
      }
    }

    if (allChecked === true) {
      for (let i = 0; i < allListItems.length; i++) {
        allListItems[i].checked = false;
        let selectedTask = allListItems[i].parentElement;
        selectedTask.classList.remove('strike-out');
      }
    } else {
      for (let i = 0; i < allListItems.length; i++) {
        allListItems[i].checked = true;
        let selectedTask = allListItems[i].parentElement;
        selectedTask.classList.add('strike-out');
      }
    }
  }

  clearCompleted() {
    let allListCheckBoxes = this.#container.querySelectorAll('.check-box');
    for (let i = 0; i < allListCheckBoxes.length; i++) {
      if (allListCheckBoxes[i].checked) {
        let listItem = allListCheckBoxes[i].parentElement.parentElement;
        listItem.remove();
      }
    }
  }

  allSelect() {
    let allListItems = this.#container.querySelectorAll('li');
    for (let i = 0; i < allListItems.length; i++) {
      allListItems[i].classList.remove('d-none');
    }
    return "allSelected";
  }

  #displayCheckedTasks(checked) {
    this.allSelect();
    let allListCheckBoxes = this.#container.querySelectorAll('.check-box');
    for (let i = 0; i < allListCheckBoxes.length; i++) {
      let listItem = allListCheckBoxes[i].parentElement.parentElement;
      if (allListCheckBoxes[i].checked === checked) {
        listItem.classList.remove('d-none');
      } else {
        listItem.classList.add('d-none');
      }
    }
  }

  activeSelect() {
    this.#displayCheckedTasks(false);
    return "activeSelected";
  }

  completedSelect() {
    this.#displayCheckedTasks(true);
    return "completedSelected";
  }

  countItemsLeft() {
    let allListItems = this.#container.querySelectorAll('.check-box');
    let activeItemsLeft = 0;
    for (let i = 0; i < allListItems.length; i++) {
      if (allListItems[i].checked == false) {
        activeItemsLeft++;
      }
    }
    return activeItemsLeft;
  }

  countTotalItems() {
    let allListItems = this.#container.querySelectorAll('li');
    return allListItems.length;
  }
}

export default Tasks;
