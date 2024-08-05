class Footer {
    #container;
    #notifyClearCompleted;
    #clearCompletedBtn;
    #allBtn;
    #activeBtn;
    #completedBtn;
    #notifySelectAll;
    #notifySelectActive;
    #notifySelectCompleted;
    #counterContainer;

    constructor(container, notifyClearCompleted, notifySelectAll, notifySelectActive, notifySelectCompleted) {
        this.#container = container;
        this.#notifyClearCompleted = notifyClearCompleted;
        this.#notifySelectAll = notifySelectAll;
        this.#notifySelectActive = notifySelectActive;
        this.#notifySelectCompleted = notifySelectCompleted;

        this.#counterContainer = this.#container.querySelector('.counter');
        this.#clearCompletedBtn = this.#container.querySelector('.footer-end');

        this.#clearCompletedBtn.addEventListener('click', this.#clear.bind(this))
        this.#allBtn = document.querySelector('.select-all');
        this.#activeBtn = document.querySelector('.select-active');
        this.#completedBtn = document.querySelector('.select-completed');

        this.#allBtn.addEventListener('click', this.#onAllSelect.bind(this));
        this.#activeBtn.addEventListener('click', this.#onActiveSelect.bind(this));
        this.#completedBtn.addEventListener('click', this.#onCompletedSelect.bind(this));
    }

    render() {
        this.#container.classList.remove('d-none');
    }

    hide() {
        this.#container.classList.add('d-none');
    }

    #clear() {
        this.#notifyClearCompleted();
    }

    #onAllSelect() {
        this.#allBtn.classList.add('active-select');
        this.#activeBtn.classList.remove('active-select');
        this.#completedBtn.classList.remove('active-select');
        this.#notifySelectAll();
    }

    #onActiveSelect() {
        this.#allBtn.classList.remove('active-select');
        this.#activeBtn.classList.add('active-select');
        this.#completedBtn.classList.remove('active-select');
        this.#notifySelectActive();
    }

    #onCompletedSelect() {
        this.#allBtn.classList.remove('active-select');
        this.#activeBtn.classList.remove('active-select');
        this.#completedBtn.classList.add('active-select');
        this.#notifySelectCompleted();
    }

    renderCounter(items) {
        this.#counterContainer.innerHTML = '';
        if (items === 1) {
            this.#counterContainer.innerHTML = `${items} item left!`;
        } else {
            this.#counterContainer.innerHTML = `${items} items left!`;
        }
    }
}

export default Footer;