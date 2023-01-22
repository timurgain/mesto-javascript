import Card from './Card.js';
import { cardSelectors } from './constants.js';
import { sectionCard, userInfo, api,
         popupWithImage, popupCardConfirm,
         popupAddPlace, popupEditAvatar, popupProfile } from '../pages/index.js';


// Submit Handlers

export function handleProfileSubmit({ name, description }) {
  api.patchUserMe(name, description)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      popupProfile.close();
    })
    .catch(err => reportError(err))
    .finally(() => popupProfile.setSaveBtnText('initial'))
}

export function handlePlaceSubmit({ link, name }) {
  api.postCard(link, name)
    .then((item) => {
      const card = createCard(item);
      sectionCard.addItem(card, 'prepend');
      popupAddPlace.close();
    })
    .catch(err => reportError(err))
    .finally(() => popupAddPlace.setSaveBtnText('initial'))
}

export function handleAvatarSubmit({ link }) {
  api.patchUserMeAvatar(link)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      popupEditAvatar.close();
    })
    .catch(err => reportError(err))
    .finally(() => popupEditAvatar.setSaveBtnText('initial'))
}

export function handleCardDeletionSubmit(cardInstance) {
  const attrs = cardInstance.getAttributes();
  api.deleteCard(attrs.cardId)
    .then(() => {
      cardInstance.delete();
      popupCardConfirm.close();
    })
    .catch(err => reportError(err))
}

// Click Handlers

export function handleCardClick(cardImage, cardHeader) {
  popupWithImage.open(cardImage, cardHeader);
}

export function handleCardTrashBtnClick(cardInstance) {
  popupCardConfirm.open(cardInstance);
}

function handleCardLikeBtnClick(cardInstance) {
  const attrs = cardInstance.getAttributes();
  if (attrs.isLiked) {
    api.deleteLike(attrs.cardId)
      .then((updatedCardData) => cardInstance.toggleLike(updatedCardData))
      .catch(err => reportError(err))
  } else {
    api.putLike(attrs.cardId)
      .then((updatedCardData) => cardInstance.toggleLike(updatedCardData))
      .catch(err => reportError(err))
  }
}

export function createCard(item) {
  const currentUserId = userInfo.getUserInfo().id;
  const card = new Card(item,
                        currentUserId, cardSelectors,
                        handleCardClick, handleCardTrashBtnClick, handleCardLikeBtnClick);
  return card.create()
}
