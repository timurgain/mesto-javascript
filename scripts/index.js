import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import { profilePopup, profileForm, profileEditBtn,
         placePopup, placeAddBtn, placeForm, placeFormName, placeFormLink,
         initialCards,
         popupCardImageSelectors,
         formSelectors,
         formList } from './constants.js'
import { fillFormProfile, saveFormProfileValues, createCard } from './utils.js'


// 1. Create Instances
// 1.1. cards section
const sectionCard = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item.link, item.name)
  },
  '.elements__cards'
);
sectionCard.renderItems()

// 1.2. forms validation
formList.forEach((formElement) => {
  const form = new FormValidator(formSelectors, formElement);
  form.enableValidation();
})

// 1.3. popup with cards images
export const popupWithImage = new PopupWithImage(popupCardImageSelectors)


// Popup Listeners

profileForm.addEventListener('submit', (evt) => {
  saveFormProfileValues();
  closePopup(profilePopup);
  profileForm.reset();
  evt.preventDefault();
});

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

