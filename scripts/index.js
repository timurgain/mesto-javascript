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

const cardList = document.querySelector('.elements__cards');

const popupSections = document.querySelectorAll('.popup');

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

const cardSelectors = {
  cardTemplateSelector: '#card',
  cardPopupSelector: '.card-popup',
  cardImagePopupSelector: '.popup__image',
  cardCaptionPopupSelector: '.popup__image'
}

const formSelectors = {
  formSelector: '.popup__form',
  fieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));


// Core functions

function addCardElementToCardList(cardElement, where='append') {
  if (where === 'prepend') {
    cardList.prepend(cardElement);
  } else {
    cardList.append(cardElement);
  };
}


// Popup Functions

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);

}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  if (evt.key !== 'Escape') return;
  const popup = document.querySelector('.popup_opened');
  if (!!popup === false) return;
  closePopup(popup);
}

function fillFormProfile() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

function saveFormProfileValues() {
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
}

// Popup Listeners

profileForm.addEventListener('submit', (evt) => {
  saveFormProfileValues();
  closePopup(profilePopup);
  profileForm.reset();
  evt.preventDefault();
});

popupSections.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if ((evt.target === popup) || (evt.target.classList.contains('popup__close-btn'))) {
      closePopup(popup);
    }
  })
})

placeForm.addEventListener('submit', (evt) => {
  const card = new Card(placeFormLink.value, placeFormName.value, cardSelectors);
  addCardElementToCardList(card.createCard(), where='prepend');
  closePopup(placePopup);
  placeForm.reset();
  evt.preventDefault();
})

// Open popup listeners

placeAddBtn.addEventListener('click', () => openPopup(placePopup));

profileEditBtn.addEventListener('click', () => {
  openPopup(profilePopup);
  fillFormProfile();
});


// Procedures

// Filling the inital cards
initialCards.forEach((initialCard) => {
  const card = new Card(initialCard.link, initialCard.name, cardSelectors);
  addCardElementToCardList(card.createCard());
});

// Enable forms validation
formList.forEach((formElement) => {
  const form = new FormValidator (formSelectors, formElement);
  form.enableValidation();
})
