import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, saveBtnText, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__input');
    this._saveBtn = this._form.querySelector('.popup__save-btn');
    this._saveBtnText = saveBtnText
  }

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => {
      inputValues[input.getAttribute('name')] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._formInputs.forEach((input) => {
      input.value = data[input.name]
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._saveBtn.textContent = this._saveBtnText.pending;
      const inputValues = this._getInputValues();
      this._formSubmitHandler(inputValues, this._saveBtn, this._saveBtnText.initial);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

}
