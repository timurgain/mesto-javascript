import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValuesArr = [];
    this._formInputs.forEach((input) => {
      inputValuesArr.push(input.value)
    })
    return inputValuesArr;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValuesArr = this._getInputValues()
      this._formSubmitHandler(inputValuesArr[0], inputValuesArr[1]);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset()
  }

}
