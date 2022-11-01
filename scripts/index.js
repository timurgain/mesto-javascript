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
    name: 'Уральские горы',
    link: 'images/ural.jpg'
  },
  {
    name: 'Суздаль',
    link: 'images/suzdal.jpg'
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

function getCardElement() {
  const cardTemplateContent = document.querySelector('#card').content;
  return cardTemplateContent.cloneNode(true);
}

function fillCardElement(cardElement, cardLink, cardName) {
  cardElement.querySelector('.card__image').setAttribute('src', cardLink);
  cardElement.querySelector('.card__header').textContent = cardName;
}

function addCardElementToCardList(cardElement) {
  const cardList = document.querySelector('.elements__cards');
  cardList.append(cardElement);
}

initialCards.forEach((initialCard) => {
  const card = getCardElement();
  fillCardElement(card, initialCard.link, initialCard.name);
  addCardElementToCardList(card);
})

//
