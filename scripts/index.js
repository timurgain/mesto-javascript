import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { profilePopup, profileForm, profileEditBtn,
         placePopup, placeAddBtn, placeForm, placeFormName, placeFormLink,
         popupSections,
         initialCards,
         cardSelectors,
         formSelectors,
         formList } from './constants.js'
import { openPopup, closePopup, fillFormProfile, saveFormProfileValues,
         openCardImagePopup,
         addCardElementToCardList } from './utils.js'


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
