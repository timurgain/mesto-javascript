// Уникальные элементы на странице

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Функции выбора попапа и работы с формами

function getFormElem(formNameAttr) {
  return document.querySelector(`.popup__form[name="${formNameAttr}"]`);
}

// function getFormInputElem(FormElem, inputNameAttr) {
//   return FormElem.querySelector(`.popup__input[name="${inputNameAttr}"]`);
// }

// function getFormSubmitElem(FormElem) {
//   return FormElem.querySelector('.popup__save-btn');
// }

function getPopupSectionElem(formElement) {
  const formParentDiv = formElement.parentElement;
  return formParentDiv.parentElement;
}

function getPopupCloseBtnElem(PopupSectionElem) {
  return PopupSectionElem.querySelector('.popup__close-btn');
}

function togglePopup(popupSectionElem) {
  popupSectionElem.classList.toggle('popup_opened');
}

function fillFormProfile(FormElem) {
  const popupProfileName = FormElem.querySelector('.popup__input[name="name"]');
  const popupProfileDescription = FormElem.querySelector('.popup__input[name="description"]');
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
}

function saveFormProfileValues(FormElem) {
  const popupProfileName = FormElem.querySelector('.popup__input[name="name"]');
  const popupProfileDescription = FormElem.querySelector('.popup__input[name="description"]');
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
}

// Функции работы с карточкой

function getCardElement() {
  const cardTemplateContent = document.querySelector('#card').content;
  return cardTemplateContent.cloneNode(true);
}

function fillCardElement(cardElement, cardLink, cardName) {
  if (cardLink.length < 1 || cardName.length < 1) return alert('Пустые поля');

  cardElement.querySelector('.card__image').setAttribute('src', cardLink);
  cardElement.querySelector('.card__header').textContent = cardName;
}

function addCardElementToCardList(cardElement, where='append') {
  const cardList = document.querySelector('.elements__cards');
  if (where === 'prepend') {
    cardList.prepend(cardElement);
  } else {
    cardList.append(cardElement);
  };
}

// Popup Edit Profile

const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileForm = getFormElem("profile");
const profilePopup = getPopupSectionElem(profileForm);
const profilePopupCloseBtn = getPopupCloseBtnElem(profilePopup);

profileEditBtn.addEventListener('click', () => {
  togglePopup(profilePopup);
  fillFormProfile(profileForm);
});

profileForm.addEventListener('submit', (evt) => {
  saveFormProfileValues(profileForm); togglePopup(profilePopup); evt.preventDefault()});

profilePopupCloseBtn.addEventListener('click', () => togglePopup(profilePopup));

// Popup Add a Place

const placeAddBtn = document.querySelector('.profile__add-btn');
const placeForm = getFormElem("place");
const placePopup = getPopupSectionElem(placeForm);
const placePopupCloseBtn = getPopupCloseBtnElem(placePopup);

placeAddBtn.addEventListener('click', () => togglePopup(placePopup));

placeForm.addEventListener('submit', (evt) => {
  const placeName = placeForm.querySelector('.popup__input[name="name"]').value;
  const placeLink = placeForm.querySelector('.popup__input[name="link"]').value;
  const card = getCardElement();
  fillCardElement(card, placeLink, placeName);
  addCardElementToCardList(card, where='prepend');
  togglePopup(placePopup);
  evt.preventDefault();
})

placePopupCloseBtn.addEventListener('click', () => togglePopup(placePopup));

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

initialCards.forEach((initialCard) => {
  const card = getCardElement();
  fillCardElement(card, initialCard.link, initialCard.name);
  addCardElementToCardList(card);
})
