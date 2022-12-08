import { FormValidator } from './FormValidator.js';
import { profilePopup, profileForm, profileEditBtn,
         placePopup, placeAddBtn, placeForm, placeFormName, placeFormLink,
         popupSections,
         initialCards,
         formSelectors,
         formList } from './constants.js'
import { openPopup, closePopup, fillFormProfile, saveFormProfileValues,
         addCardElementToCardList, createCard } from './utils.js'


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
  addCardElementToCardList(createCard(placeFormLink.value, placeFormName.value), 'prepend');
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
  addCardElementToCardList(createCard(initialCard.link, initialCard.name));
});

// Enable forms validation
formList.forEach((formElement) => {
  const form = new FormValidator(formSelectors, formElement);
  form.enableValidation();
})
