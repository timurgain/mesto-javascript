import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { profilePopup, profileForm, profileFormName, profileFormDescription, profileName, profileDescription, profileEditBtn,
         placePopup, placeAddBtn, placeForm, placeFormName, placeFormLink,
         cardPopup, cardImagePopup, cardCaptionPopup,
         cardList,
         popupSections,
         initialCards,
         cardSelectors,
         formSelectors,
         formList } from './constants.js'
         

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

function openCardImagePopup(cardImage, cardHeader) {
  cardImagePopup.src = cardImage.src;
  cardImagePopup.alt = cardImage.alt;
  cardCaptionPopup.textContent = cardHeader.textContent;
  openPopup(cardPopup);
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
  evt.preventDefault();
  const card = new Card(placeFormLink.value, placeFormName.value, cardSelectors, openCardImagePopup);
  addCardElementToCardList(card.createCard(), 'prepend');
  closePopup(placePopup);
  placeForm.reset();

})

// Open popup listeners

placeAddBtn.addEventListener('click', () => openPopup(placePopup));

profileEditBtn.addEventListener('click', () => {
  openPopup(profilePopup);
  fillFormProfile();
});

// Core functions

function addCardElementToCardList(cardElement, where='append') {
  if (where === 'prepend') {
    cardList.prepend(cardElement);
  } else {
    cardList.append(cardElement);
  };
}

// Procedures

// Filling the inital cards
initialCards.forEach((initialCard) => {
  const card = new Card(initialCard.link, initialCard.name, cardSelectors, openCardImagePopup);
  addCardElementToCardList(card.createCard());
});

// Enable forms validation
formList.forEach((formElement) => {
  const form = new FormValidator(formSelectors, formElement);
  form.enableValidation();
})
