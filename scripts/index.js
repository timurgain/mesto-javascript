import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { profilePopup, profileForm, profileEditBtn,
         placePopup, placeAddBtn, placeForm, placeFormName, placeFormLink,
         initialCards,
         popupCardImageSelectors,
         formSelectors,
         formList } from './constants.js'
import { fillFormProfile, saveFormProfileValues, createCard,
         profileSubmitHandler, addPlaceSubmitHandler } from './utils.js'


// 1. Create Instances
// 1.1. cards section
export const sectionCard = new Section(
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
export const popupWithImage = new PopupWithImage(popupCardImageSelectors);
popupWithImage.setEventListeners();

// 1.4. popup profile form
const popupProfile = new PopupWithForm('.profile-popup', profileSubmitHandler)
popupProfile.setEventListeners();

// 1.5. popup add place form
const popupAddPlace = new PopupWithForm('.place-popup', addPlaceSubmitHandler)
popupAddPlace.setEventListeners();

// Popup Listeners

// profileForm.addEventListener('submit', (evt) => {
//   saveFormProfileValues();
//   closePopup(profilePopup);
//   profileForm.reset();
//   evt.preventDefault();
// });

// placeForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const item = createCard(placeFormLink.value, placeFormName.value);
//   sectionCard.addItem(item, 'prepend');
//   closePopup(placePopup);
//   placeForm.reset();
// })



// Open popup listeners

placeAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
});

profileEditBtn.addEventListener('click', () => {
  // отобразить попап
  popupProfile.open();

  // значения из профиля переносим в инпуты формы
  // fillFormProfile();

});

