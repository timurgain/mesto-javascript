// Global Constants

const profilePopup = document.querySelector('.profile-popup');
const profileForm = document.forms['profile'];
const profileFormName = profileForm.elements['name'];
const profileFormDescription = profileForm.elements['description'];
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditBtn = document.querySelector('.profile__edit-btn');

const placePopup = document.querySelector('.place-popup');
const placeAddBtn = document.querySelector('.profile__add-btn');
const placeForm = document.forms['place'];
const placeFormName = placeForm.elements['name'];
const placeFormLink = placeForm.elements['link'];

const cardPopup = document.querySelector('.card-popup');
const cardImagePopup = cardPopup.querySelector('.popup__image');
const cardCaptionPopup = cardPopup.querySelector('.popup__caption');

const cardList = document.querySelector('.elements__cards');

const buttonsPopupClose = document.querySelectorAll('.popup__close-btn');


// Functions

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function fillFormProfile() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

function saveFormProfileValues() {
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
}

function getCardTemplate() {
  const cardTemplateContent = document.querySelector('#card').content;
  return cardTemplateContent.cloneNode(true);
}

function createCard(cardLink, cardName) {
  const card = getCardTemplate();
  fillCardElement(card, cardLink, cardName);
  return card;
}

function addCardElementToCardList(cardElement, where='append') {
  if (where === 'prepend') {
    cardList.prepend(cardElement);
  } else {
    cardList.append(cardElement);
  };
}

function fillCardElement(cardElement, cardLink, cardName) {
  if (cardLink.length < 1 || cardName.length < 1) return alert('Пустые поля');
  // constants
  const cardImage = cardElement.querySelector('.card__image');
  const cardHeader = cardElement.querySelector('.card__header');
  const cardLikeBtn = cardElement.querySelector('.card__like-btn');
  const cardTrashBtn = cardElement.querySelector('.card__trash-btn')
  // attributes and text
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', `Изображение: ${cardName}`);
  cardHeader.textContent = cardName;
  // event listeners
  cardLikeBtn.addEventListener(
    'click', (evt) => {evt.target.classList.toggle('card__like-btn_active')}
  );
  cardTrashBtn.addEventListener(
    'click', (evt) => {evt.target.closest('li').remove()}
  );
  cardImage.addEventListener(
    'click', () => {
      cardImagePopup.src = cardImage.src;
      cardImagePopup.alt = cardImage.alt;
      cardCaptionPopup.textContent = cardHeader.textContent;
      openPopup(cardPopup);
    }
  );
}


// Listeners

buttonsPopupClose.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'))
  })
})

profileEditBtn.addEventListener('click', () => {
  openPopup(profilePopup);
  fillFormProfile();
});

profileForm.addEventListener('submit', (evt) => {
  saveFormProfileValues(); closePopup(profilePopup); evt.preventDefault()});

placeAddBtn.addEventListener('click', () => openPopup(placePopup));

placeForm.addEventListener('submit', (evt) => {
  const card = createCard(placeFormLink.value, placeFormName.value)
  addCardElementToCardList(card, where='prepend');
  closePopup(placePopup);
  placeForm.reset();
  evt.preventDefault();
})


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
  const card = createCard(initialCard.link, initialCard.name);
  addCardElementToCardList(card);
})
