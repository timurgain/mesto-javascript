import FormValidator from './FormValidator.js';
import Section from './Section.js';
import { profilePopup, profileForm, profileEditBtn,
         placePopup, placeAddBtn, placeForm, placeFormName, placeFormLink,
         popupSections,
         initialCards,
         formSelectors,
         formList } from './constants.js'
import { openPopup, closePopup, fillFormProfile, saveFormProfileValues, createCard } from './utils.js'


// Create section with cards
const sectionCard = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item.link, item.name)
  },
  '.elements__cards'
);
sectionCard.renderItems()

// Enable forms validation
formList.forEach((formElement) => {
  const form = new FormValidator(formSelectors, formElement);
  form.enableValidation();
})


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
  const item = createCard(placeFormLink.value, placeFormName.value);
  sectionCard.addItem(item, 'prepend');
  closePopup(placePopup);
  placeForm.reset();

})

// Open popup listeners

placeAddBtn.addEventListener('click', () => openPopup(placePopup));

profileEditBtn.addEventListener('click', () => {
  openPopup(profilePopup);
  fillFormProfile();
});

