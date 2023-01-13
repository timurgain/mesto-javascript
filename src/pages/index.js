import './index.css'; // webpack needs it

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { profileEditBtn, placeAddBtn,
         userSelectors, popupCardImageSelectors, formSelectors,
         formList,
         baseUrlServer, tokenServer } from '../components/constants.js'
import { createCard,
         profileSubmitHandler, addPlaceSubmitHandler,
         convertResponseToJson } from '../components/utils.js'


// main

// 1. Create Instances
// 1.1. cards section
export const sectionCard = new Section({
  renderer: (item) => createCard(item.link, item.name, item.likes.length),
  containerSelector: '.elements__cards'
});

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

// 1.7. api instance
export const api = new Api(baseUrlServer, tokenServer);


// 2. Use Api
// 2.1. GET user profile
api.getUserMe()
  .then(response => convertResponseToJson(response))
  .then(data => userInfo.setUserInfo(data.name, data.about))
  .catch(err => reportError(err))

// 2.2. GET cards, render cards
api.getCards()
  .then(response => convertResponseToJson(response))
  .then((cards) => {sectionCard.addItemsArray(cards)})
  .catch(err => reportError(err))


// 3. Page buttons listeners
// 3.1. open add new place popup
placeAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
});

// 3.2. open profile popup
profileEditBtn.addEventListener('click', () => {
  const userPageInfo = userInfo.getUserInfo();
  popupProfile.setInputValues(userPageInfo);
  popupProfile.open();
});
