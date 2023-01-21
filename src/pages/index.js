import './index.css'; // webpack needs it

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { profileEditBtn, placeAddBtn, profileAvatar,
         userSelectors, popupCardImageSelectors, formSelectors,
         formList,
         baseUrlServer, tokenServer } from '../components/constants.js'
import { createCard,
         profileSubmitHandler, addPlaceSubmitHandler,
         deleteCardSubmitHandler, editAvatarSubmitHandler } from '../components/utils.js'


// main

// 1. Create Instances

// 1.1. cards section
export const sectionCard = new Section({
  renderer: (item) => createCard(item),
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
export const popupProfile = new PopupWithForm('.profile-popup', profileSubmitHandler);
popupProfile.setEventListeners();

// 1.5. popup add a place form
export const popupAddPlace = new PopupWithForm('.place-popup', addPlaceSubmitHandler);
popupAddPlace.setEventListeners();

// 1.6. popup edit a profile avatar
export const popupEditAvatar = new PopupWithForm('.avatar-popup', editAvatarSubmitHandler);
popupEditAvatar.setEventListeners();

// 1.7. popup confirm a card deletion
export const popupCardConfirm = new PopupConfirm('.confirm-popup', deleteCardSubmitHandler);
popupCardConfirm.setEventListeners();

// 1.8. user info on page
export const userInfo = new UserInfo(userSelectors)

// 1.9. api instance
export const api = new Api(baseUrlServer, tokenServer);


// 2. Use Api

// These promises will run in Promise.all
const getUserPromise = api.getUserMe().then(response => api.convertResponseToJson(response))
const getCardsPromise = api.getCards().then(response => api.convertResponseToJson(response))

Promise.all([getUserPromise, getCardsPromise])
  .then(([dataUser, dataCards]) => {
    userInfo.setUserInfo(dataUser.name, dataUser.about, dataUser._id);
    userInfo.setUserAvatar(dataUser.avatar);
    sectionCard.addItemsArray(dataCards)
  })
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

// 3.3. open profile avatar popup
profileAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
});
