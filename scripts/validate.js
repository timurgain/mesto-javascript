// Внутри страницы перебрать формы

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector))

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}

// Внутри формы перебрать popup__field (popup__input, popup__error)

function setEventListeners(formElement) {
  const fieldList = Array.from(formElement.querySelectorAll(selectors.fieldSelector));
  const submitButton = formElement.querySelector(selectors.submitButtonSelector);

  // начальное состояние кнопки submit, на основе начальной валидности всех input формы
  toggleButtonState(submitButton, fieldList);

  // слушатель события input, срабатывает валидация
  fieldList.forEach((fieldElement) => {
    fieldElement.addEventListener(
      'input', () => {
        checkInputValidity(fieldElement);
        toggleButtonState(submitButton, fieldList);
      });
  });
}

// Обработка инпута и его сообщения об ошибке валидации

function checkInputValidity(fieldElement) {
  const inputElement = fieldElement.querySelector(selectors.inputSelector);
  const errorElement = fieldElement.querySelector(selectors.errorSelector);
  const isValid = inputElement.validity.valid
  if (isValid) {
    hideInputError(inputElement, errorElement);
  } else {
    showInputError(inputElement, errorElement);
  };
}

function hideInputError(inputElement, errorElement) {
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
}

function showInputError(inputElement, errorElement) {
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.classList.add(selectors.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

// Обработка кнопки submit

function toggleButtonState(submitButton, fieldList) {
  if (hasInvalidInput(fieldList)) {
    submitButton.classList.add(selectors.inactiveButtonClass);
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.classList.remove(selectors.inactiveButtonClass);
    submitButton.removeAttribute('disabled', '');
  }
}

function hasInvalidInput(fieldList) {
  return fieldList.some((fieldElement) => {
    const inputElement = fieldElement.querySelector(selectors.inputSelector);
    return !inputElement.validity.valid;
  })
}


const selectors = {
  formSelector: '.popup__form',
  fieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  submitButtonSelector: '.popup__save-btn',
  // no dots, use for classList
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation()
