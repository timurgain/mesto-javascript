export default class FormValidator {
  constructor (formSelectors, formElement) {
    this.formSelectors = formSelectors;
    this.formElement = formElement;
  }

  enableValidation() {
    this._fieldList = Array.from(this.formElement.querySelectorAll(this.formSelectors.fieldSelector));
    this._submitButton = this.formElement.querySelector(this.formSelectors.submitButtonSelector);

    // initial form and submit button state, disabled
    this._isFormValid = false;
    this._toggleButtonState();

    // realtime input validation, realtime submit button state setting
    this._setInputListener();

    // final state of submit button, disabling after form reset event
    this._setResetListener();
  }

  _checkInputValidity(fieldElement) {
    const inputElement = fieldElement.querySelector(this.formSelectors.inputSelector);
    const errorElement = fieldElement.querySelector(this.formSelectors.errorSelector);
    const isValid = inputElement.validity.valid
    if (isValid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement);
    };
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this.formSelectors.inputErrorClass);
    errorElement.classList.remove(this.formSelectors.errorClass);
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this.formSelectors.inputErrorClass);
    errorElement.classList.add(this.formSelectors.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hasInvalidInput() {
    return this._fieldList.some((fieldElement) => {
      const inputElement = fieldElement.querySelector(this.formSelectors.inputSelector);
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._isFormValid) {
      this._submitButton.classList.remove(this.formSelectors.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', '');
    } else {
      this._submitButton.classList.add(this.formSelectors.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', '');
    }
  }

  _resetValidation() {
    this._fieldList.forEach((fieldElement) => {
      const inputElement = fieldElement.querySelector(this.formSelectors.inputSelector);
      const errorElement = fieldElement.querySelector(this.formSelectors.errorSelector);
      this._hideInputError(inputElement, errorElement);
    })
  }

  _setInputListener() {
    this._fieldList.forEach((fieldElement) => {
      fieldElement.addEventListener(
        'input', () => {
          this._checkInputValidity(fieldElement);
          this._isFormValid = !this._hasInvalidInput();
          this._toggleButtonState();
        });
    });
  }

  _setResetListener() {
    this.formElement.addEventListener('reset', () => {
      // setTimeout is here to start handler in the end of event
      setTimeout(() => {
        this._isFormValid = false;
        this._toggleButtonState();
        this._resetValidation();
      }, 0);
    });
  }

}
