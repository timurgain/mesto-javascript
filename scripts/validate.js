// 1. Обойти все формы на странице, установить прослушку события input
const formList = Array.from(document.querySelectorAll('.popup__form'))

formList.forEach((formElement) => {
  setEventListeners(formElement);
})

// 2. В каждой форме обойти инпуты
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  // 2.1  На каждый инпут навесить прослушку события input и передать на проверку валидности
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => checkInputValidity(inputElement))
  });
}

// 3. Проверка на валидность, выбор стилей
function checkInputValidity(inputElement) {
  const isValid = inputElement.validity.valid
  if (isValid) {
    // снять модификатор
  } else {
    // поставить модификатор стиля ошибки
  }
}



const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  // no dots, use for classList
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
