import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { profileEditBtn, placeAddBtn,
         initialCards,
         userSelectors, popupCardImageSelectors, formSelectors,
         formList } from './constants.js'
import { createCard,
         profileSubmitHandler, addPlaceSubmitHandler } from './utils.js'


// main

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

// 1.6. user info on page
const userInfo = new UserInfo(userSelectors)
userInfo.setUserInfo('Жак-Ив Кусто', 'Исследователь океана')


// 2. Page buttons listeners
// 2.1. open add new place popup
placeAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
});

// 2.2. open profile popup
profileEditBtn.addEventListener('click', () => {
  const userPage = userInfo.getUserInfo();
  popupProfile.setInputValues(userPage);
  popupProfile.open();
});
