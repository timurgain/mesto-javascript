import './index.css'; // webpack needs it

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { profileEditBtn, placeAddBtn,
         initialCards,
         userSelectors, popupCardImageSelectors, formSelectors,
         formList,
         baseUrlServer, tokenServer } from '../components/constants.js'
import { createCard,
         profileSubmitHandler, addPlaceSubmitHandler,
         convertResponseToJson } from '../components/utils.js'


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
export const userInfo = new UserInfo(userSelectors)


// 2. Api
// 2.1. GET user profile
const api = new Api(baseUrlServer, tokenServer);
api.fetchUserMe()
  .then(response => convertResponseToJson(response))
  .then(data => userInfo.setUserInfo(data.name, data.about))
  .catch(err => reportError(err))


// 2. Page buttons listeners
// 2.1. open add new place popup
placeAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
});

// 2.2. open profile popup
profileEditBtn.addEventListener('click', () => {
  const userPageInfo = userInfo.getUserInfo();
  popupProfile.setInputValues(userPageInfo);
  popupProfile.open();
});
