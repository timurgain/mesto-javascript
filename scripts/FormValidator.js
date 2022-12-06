class FormValidator {
  constructor(selectors, formElement) {
    this.selectors = selectors;
    this.formElement = formElement;
  }

  enableValidation() {
    this._fieldList = Array.from(this.formElement.querySelectorAll(this.selectors.fieldSelector));
    this._submitButton = this.formElement.querySelector(this.selectors.submitButtonSelector);

    // initial form and submit button state, disabled
    this._isFormValid = false;
    this._toggleButtonState();

    // realtime input validation, realtime submit button state setting
    this._fieldList.forEach((fieldElement) => {
      fieldElement.addEventListener(
        'input', () => {
          this._checkInputValidity(fieldElement);
          this._isFormValid = !this._hasInvalidInput();
          this._toggleButtonState();
        });
    });

    // final state of submit button, disabling after form reset event
    this.formElement.addEventListener('reset', () => {
      // setTimeout is here to start handler in the end of event
      setTimeout(() => {
        this._isFormValid = false;
        this._toggleButtonState();
      }, 0);
    });

  }

  _checkInputValidity(fieldElement) {
    const inputElement = fieldElement.querySelector(this.selectors.inputSelector);
    const errorElement = fieldElement.querySelector(this.selectors.errorSelector);
    const isValid = inputElement.validity.valid
    if (isValid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement);
    };
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this.selectors.inputErrorClass);
    errorElement.classList.remove(this.selectors.errorClass);
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this.selectors.inputErrorClass);
    errorElement.classList.add(this.selectors.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hasInvalidInput() {
    return this._fieldList.some((fieldElement) => {
      const inputElement = fieldElement.querySelector(this.selectors.inputSelector);
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._isFormValid) {
      this._submitButton.classList.remove(this.selectors.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', '');
    } else {
      this._submitButton.classList.add(this.selectors.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', '');
    }
  }
}
