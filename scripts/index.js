// Profile const
const profilePopup = document.querySelector('.profile-popup');
const profileNamePopup = profilePopup.querySelector('.popup__input[name="name"]');
const profileDescriptionPopup = profilePopup.querySelector('.popup__input[name="description"]');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Place const
const placePopup = document.querySelector('.place-popup');

// Card const
const cardPopup = document.querySelector('.card-popup');



function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function fillFormProfile() {
  profileNamePopup.value = profileName.textContent;
  profileDescriptionPopup.value = profileDescription.textContent;
}

function saveFormProfileValues() {
  profileName.textContent = profileNamePopup.value;
  profileDescription.textContent = profileDescriptionPopup.value;
}



function getFormElem(formNameAttr) {
  return document.querySelector(`.popup__form[name="${formNameAttr}"]`);
}

function getPopupCloseBtnElem(PopupSectionElem) {
  return PopupSectionElem.querySelector('.popup__close-btn');
}


// Popup - Edit Profile

const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileForm = getFormElem("profile");

const profilePopupCloseBtn = getPopupCloseBtnElem(profilePopup);

profileEditBtn.addEventListener('click', () => {
  openPopup(profilePopup);
  fillFormProfile();
});

profileForm.addEventListener('submit', (evt) => {
  saveFormProfileValues(); closePopup(profilePopup); evt.preventDefault()});

profilePopupCloseBtn.addEventListener('click', () => closePopup(profilePopup));

// Popup - Add a Place

const placeAddBtn = document.querySelector('.profile__add-btn');
const placeForm = getFormElem("place");

const placePopupCloseBtn = getPopupCloseBtnElem(placePopup);

placeAddBtn.addEventListener('click', () => openPopup(placePopup));

placeForm.addEventListener('submit', (evt) => {
  const placeName = placeForm.querySelector('.popup__input[name="name"]').value;
  const placeLink = placeForm.querySelector('.popup__input[name="link"]').value;
  const card = getCardTemplate();
  fillCardElement(card, placeLink, placeName);
  addCardElementToCardList(card, where='prepend');
  closePopup(placePopup);
  evt.preventDefault();
})

placePopupCloseBtn.addEventListener('click', () => closePopup(placePopup));


// Card and Card popup

const popupCard = document.querySelector('#popup-card');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__caption');
const popupCardCloseBtn = popupCard.querySelector('.popup__close-btn');

function getCardTemplate() {
  const cardTemplateContent = document.querySelector('#card').content;
  return cardTemplateContent.cloneNode(true);
}

function fillCardElement(cardElement, cardLink, cardName) {
  if (cardLink.length < 1 || cardName.length < 1) return alert('Пустые поля');

  // attributes and text
  cardElement.querySelector('.card__image').setAttribute('src', cardLink);
  cardElement.querySelector('.card__header').textContent = cardName;

  // event listeners
  cardElement.querySelector('.card__like-btn').addEventListener(
    'click', (evt) => {evt.target.classList.toggle('card__like-btn_active')}
  );
  cardElement.querySelector('.card__trash-btn').addEventListener(
    'click', (evt) => {
      const trashBtn = evt.target;
      // trash-btn < figure < li
      trashBtn.parentElement.parentElement.remove();
    }
  );
  cardElement.querySelector('.card__image').addEventListener(
    'click', (evt) => {
      // from card
      const img = evt.target;
      const parentElement = img.parentElement;
      const placeLink = img.src;
      const placeName = parentElement.querySelector('.card__header').textContent;
      // into popup
      popupCardImage.src = placeLink;
      popupCardImage.alt = `Фотогафия ${placeName}`;
      popupCardCaption.textContent = placeName;
      // display popup
      openPopup(popupCard);
    }
  );
}

popupCardCloseBtn.addEventListener('click', () => closePopup(popupCard));

function addCardElementToCardList(cardElement, where='append') {
  const cardList = document.querySelector('.elements__cards');
  if (where === 'prepend') {
    cardList.prepend(cardElement);
  } else {
    cardList.append(cardElement);
  };
}


// Filling the inital cards

const initialCards = [
  {
    name: 'Северный чуйский хребет',
    link: 'images/chuiskiy-hrebet.jpg'
  },
  {
    name: 'Камчатка',
    link: 'images/kamchatka.jpg'
  },
  {
    name: 'Суздаль',
    link: 'images/suzdal.jpg'
  },
  {
    name: 'Ольхон',
    link: 'images/olhon.jpg'
  },
  {
    name: 'Териберка',
    link: 'images/teriberka.jpg'
  },
  {
    name: 'Уральские горы',
    link: 'images/ural.jpg'
  }
];

initialCards.forEach((initialCard) => {
  const card = getCardTemplate();
  fillCardElement(card, initialCard.link, initialCard.name);
  addCardElementToCardList(card);
})
