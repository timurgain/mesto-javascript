// Внутри страницы перебрать формы

function enableValidation({formSelector, ...selectors}) {
  const formList = Array.from(document.querySelectorAll(formSelector))

  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  })
}

// Внутри формы перебрать popup__field (popup__input, popup__error)

function setEventListeners(formElement, {fieldSelector, submitButtonSelector, ...selectors}) {
  const fieldList = Array.from(formElement.querySelectorAll(fieldSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  // начальное состояние кнопки submit, на основе начальной валидности всех input формы
  toggleButtonState(submitButton, fieldList, selectors.inputSelector, selectors.inactiveButtonClass);

  // слушатель события input, срабатывает валидация
  fieldList.forEach((fieldElement) => {
    fieldElement.addEventListener(
      'input', () => {
        checkInputValidity(fieldElement, selectors.inputSelector, selectors.errorSelector, selectors.inputErrorClass, selectors.errorClass);
        toggleButtonState(submitButton, fieldList, selectors.inputSelector, selectors.inactiveButtonClass);
      });
  });
}

// Обработка инпута и его сообщения об ошибке валидации

function checkInputValidity(fieldElement, {inputSelector, errorSelector, ...selectors}) {
  const inputElement = fieldElement.querySelector(inputSelector);
  const errorElement = fieldElement.querySelector(errorSelector);
  const isValid = inputElement.validity.valid
  if (isValid) {
    hideInputError(inputElement, errorElement, selectors.inputErrorClass, selectors.errorClass);
  } else {
    showInputError(inputElement, errorElement, selectors.inputErrorClass, selectors.errorClass);
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

// Обработка кнопки submit

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

// Запуск всей ваидации

enableValidation({
  formSelector: '.popup__form',
  fieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  submitButtonSelector: '.popup__save-btn',
  // no dots, use for classList
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})
