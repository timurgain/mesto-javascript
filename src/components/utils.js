import Card from './Card.js';
import { cardSelectors } from './constants.js';
import { sectionCard, userInfo, api,
         popupWithImage, popupCardConfirm,
         popupAddPlace, popupEditAvatar, popupProfile } from '../pages/index.js';


// Submit Handlers

export function profileSubmitHandler({ name, description }, saveBtnElement, saveBtnTextInitial) {
  api.patchUserMe(name, description)
    .then(() => userInfo.setUserInfo(name, description))
    .catch(err => reportError(err))
    .finally(() => {
      saveBtnElement.textContent = saveBtnTextInitial;
      popupProfile.close()
    })
}

export function addPlaceSubmitHandler({ link, name }, saveBtnElement, saveBtnTextInitial) {
  api.postCard(link, name)
    .then((item) => {
      const card = createCard(item);
      sectionCard.addItem(card, item, 'prepend');
    })
    .catch(err => reportError(err))
    .finally(() => {
      saveBtnElement.textContent = saveBtnTextInitial;
      popupProfile.close()
    })
}

export function editAvatarSubmitHandler({ link }, saveBtnElement, saveBtnTextInitial) {
  api.patchUserMeAvatar(link)
    .then((data) => userInfo.setUserAvatar(data.avatar))
    .catch(err => reportError(err))
    .finally(() => {
      saveBtnElement.textContent = saveBtnTextInitial;
      popupProfile.close()
    })
}

export function deleteCardSubmitHandler(cardId, cardElement) {
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      popupCardConfirm.close();
    })
    .catch(err => reportError(err))
}

// Click Handlers

export function handleCardClick(cardImage, cardHeader) {
  popupWithImage.open(cardImage, cardHeader);
}

export function handleCardTrashBtnClick(cardId, cardElement) {
  popupCardConfirm.open(cardId, cardElement);
}

function handleCardLikeBtnClick(cardId, cardLikeBtnElement, cardLikeCounterElement, cardSelectors) {
  const currentUserId = userInfo.getUserInfo().id;
  sectionCard.cacheServerData.forEach((cachedCard) => {
    const paramsObj = {cachedCard, cardLikeBtnElement, cardLikeCounterElement, cardSelectors}

    if (cachedCard._id === cardId && cachedCard.likes.some((user) => {return user._id === currentUserId})) {
      api.deleteLike(cardId)
        .then((updatedCard) => updateCardLikes(updatedCard, paramsObj))
        .catch(err => reportError(err))
    } else if (cachedCard._id === cardId) {
      api.putLike(cardId)
        .then((updatedCard) => updateCardLikes(updatedCard, paramsObj))
        .catch(err => reportError(err))
    }
  })
}

// other

function updateCardLikes(updatedCard, {cachedCard, cardLikeBtnElement, cardLikeCounterElement, cardSelectors}) {
  cachedCard.likes = updatedCard.likes;
  updatedCard.likes.length == 0
    ? cardLikeCounterElement.textContent = ''  // display only a heart, without a zero
    : cardLikeCounterElement.textContent = updatedCard.likes.length;
  cardLikeBtnElement.classList.toggle(cardSelectors.cardLikeBtnActive);
  cardLikeCounterElement.classList.toggle(cardSelectors.cardLikeCounterActive);
}

export function createCard(item) {
  const currentUserId = userInfo.getUserInfo().id;
  const card = new Card(item,
                        currentUserId, cardSelectors,
                        handleCardClick, handleCardTrashBtnClick, handleCardLikeBtnClick);
  return card.createCard()
}
