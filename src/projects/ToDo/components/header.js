class Header {
  #container;
  #setInput;
  #notifyCheckAll
  #textInput;
  #checkAllBtn;

  constructor(container, setInput, notifyCheckAll) {
    this.#container = container;
    this.#setInput = setInput;
    this.#notifyCheckAll = notifyCheckAll;

    this.#textInput = this.#container.querySelector('.text-input');
    this.#checkAllBtn = this.#container.querySelector('.select-all-image');
    this.#textInput.addEventListener('keypress', this.#getInputText.bind(this));
    this.#checkAllBtn.addEventListener('click', this.#onCheckAllClick.bind(this));
  }

  #clearInput() {
    this.#textInput.value = '';
  }

  #getInputText(event) {
    if (event.key == 'Enter') {
      this.#setInput(this.#textInput.value);
      this.#clearInput();
    }
  }

  #onCheckAllClick() {
    this.#notifyCheckAll();
  }

  renderCheckAllBtn() {
    this.#checkAllBtn.classList.remove('d-none');
  }

  hideCheckAll() {
    this.#checkAllBtn.classList.add('d-none');
  }
}

export default Header;
