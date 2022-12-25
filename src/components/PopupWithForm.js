import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => {
      inputValues[input.getAttribute('name')] = input.value;
    });
    return inputValues;
  }

  setInputValues({name, description}) {
    this._formInputs.forEach((input) => {
      if (input.getAttribute('name') === 'name') {
        input.value = name;
      }
      if (input.getAttribute('name') === 'description') {
        input.value = description;
      }
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._formSubmitHandler(inputValues);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset()
  }

}
