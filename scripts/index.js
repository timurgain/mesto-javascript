let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popupProfileName = document.querySelector('.popup__profile-name');
let popupProfileDescription = document.querySelector('.popup__profile-description');

let profileEditBtn = document.querySelector('.profile__edit-btn');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function writeIntoInput() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
}

function getFromInput() {
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
}

profileEditBtn.addEventListener('click', () => {togglePopup(); writeIntoInput();});
popupForm.addEventListener('submit', (evt) => {getFromInput(); togglePopup(); evt.preventDefault()});
popupCloseBtn.addEventListener('click', togglePopup);
