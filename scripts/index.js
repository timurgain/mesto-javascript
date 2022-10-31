let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let popupProfileName = document.querySelector('.popup__input[name="name"]');
let popupProfileDescription = document.querySelector('.popup__input[name="description"]');

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

// Построение начальной сетки

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Отобразить начальные карточки
const cardTemplateContent = document.querySelector('#card').content;
initialCards.forEach((initialCard) => {
  const cardElement = cardTemplateContent.cloneNode(true);
  cardElement.querySelector('.card__image').setAttribute('src', initialCard.link);
  cardElement.querySelector('.card__header').textContent = initialCard.name;

  const cardList = document.querySelector('.elements__cards');
  cardList.append(cardElement);
})

