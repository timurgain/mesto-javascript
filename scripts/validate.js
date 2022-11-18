// Inside document, browse forms

function enableValidation({formSelector, ...selectors}) {
  const formList = Array.from(document.querySelectorAll(formSelector))

  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  })
}

// Inside one form, browse popup__field (popup__input, popup__error)

function setEventListeners(formElement, {fieldSelector, submitButtonSelector, ...selectors}) {
  const fieldList = Array.from(formElement.querySelectorAll(fieldSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  // submit button initial state
  toggleButtonState(submitButton, fieldList, selectors.inputSelector, selectors.inactiveButtonClass);

  // input-event listener
  fieldList.forEach((fieldElement) => {
    fieldElement.addEventListener(
      'input', () => {
        checkInputValidity(fieldElement, selectors.inputSelector, selectors.errorSelector, selectors.inputErrorClass, selectors.errorClass);
        toggleButtonState(submitButton, fieldList, selectors.inputSelector, selectors.inactiveButtonClass);
      });
  });
}

// Input and error message handling

function checkInputValidity(fieldElement, inputSelector, errorSelector, inputErrorClass, errorClass) {
  const inputElement = fieldElement.querySelector(inputSelector);
  const errorElement = fieldElement.querySelector(errorSelector);
  const isValid = inputElement.validity.valid
  if (isValid) {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
  };
}

function hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function showInputError(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

// Submit button handling

function toggleButtonState(submitButton, fieldList, inputSelector, inactiveButtonClass) {
  if (hasInvalidInput(fieldList, inputSelector)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled', '');
  }
}

function hasInvalidInput(fieldList, inputSelector) {
  return fieldList.some((fieldElement) => {
    const inputElement = fieldElement.querySelector(inputSelector);
    return !inputElement.validity.valid;
  })
}

// Start validation

enableValidation({
  formSelector: '.popup__form',
  fieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})
