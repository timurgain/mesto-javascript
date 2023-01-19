import Card from './Card.js';
import { cardSelectors } from './constants.js';
import { sectionCard, popupWithImage, popupCardConfirm, userInfo, api } from '../pages/index.js';


export function profileSubmitHandler({name, description}) {
  api.patchUserMe(name, description)
    .then((response) => {
      checkResponseOk(response);
      userInfo.setUserInfo(name, description);
    })
    .catch(err => reportError(err));
}

export function addPlaceSubmitHandler({link, name}) {
  api.postCard(link, name)
    .then((response) => convertResponseToJson(response))
    .then((item) => {
      const card = createCard(item);
      sectionCard.addItem(card, item, 'prepend');
    })
    .catch(err => reportError(err));
}

export function deleteCardSubmitHandler(cardId, cardElement) {
  api.deleteCard(cardId)
    .then((response) => checkResponseOk(response))
    .then((data) => {
      cardElement.remove();
      popupCardConfirm.close();
    })
    .catch(err => reportError(err))
}

export function editAvatarSubmitHandler(url) {
  console.log('типа editAvatarSubmitHandler')

  // заменить текст кнопки на Сохранение...

  api.patchUserMeAvatar(url)
    .then((response) => {convertResponseToJson(response)})
    .then((data) => {
      // подставить новый url в разметку страницы
      // вернуть прежний текст кнопки
      // закрыть попап
    })
    .catch(err => reportError(err))
}

export function handleCardClick(cardImage, cardHeader) {
  popupWithImage.open(cardImage, cardHeader);
}

export function handleCardTrashBtnClick(cardId, cardElement) {
  popupCardConfirm.open(cardId, cardElement);
}

function updateCardLikes(updatedCard, {cachedCard, cardLikeBtnElement, cardLikeCounterElement, cardSelectors}) {
  cachedCard.likes = updatedCard.likes;
  updatedCard.likes.length == 0
    ? cardLikeCounterElement.textContent = ''
    : cardLikeCounterElement.textContent = updatedCard.likes.length;
  cardLikeBtnElement.classList.toggle(cardSelectors.cardLikeBtnActive);
  cardLikeCounterElement.classList.toggle(cardSelectors.cardLikeCounterActive);
}

function handleCardLikeBtnClick(cardId, cardLikeBtnElement, cardLikeCounterElement, cardSelectors) {
  const currentUserId = userInfo.getUserInfo().id;
  sectionCard.cacheServerData.forEach((cachedCard) => {
    const paramsObj = {cachedCard, cardLikeBtnElement, cardLikeCounterElement, cardSelectors}

    if (cachedCard._id === cardId && cachedCard.likes.some((user) => {return user._id === currentUserId})) {
      api.deleteLike(cardId)
        .then((response) => convertResponseToJson(response))
        .then((updatedCard) => updateCardLikes(updatedCard, paramsObj))
        .catch(err => reportError(err))
    } else if (cachedCard._id === cardId) {
      api.putLike(cardId)
        .then((response) => convertResponseToJson(response))
        .then((updatedCard) => updateCardLikes(updatedCard, paramsObj))
        .catch(err => reportError(err))
    }
  })
}

export function createCard(item) {
  const currentUserId = userInfo.getUserInfo().id;  // async user creation in index.js
  const card = new Card(item,
                        currentUserId, cardSelectors,
                        handleCardClick, handleCardTrashBtnClick, handleCardLikeBtnClick);
  return card.createCard()
}

// about api

export function checkResponseOk(response) {
  if (!response.ok) {throw new Error('HTTP status code is not OK')};
}

export function convertResponseToJson(response) {
  checkResponseOk(response);
  return response.json();
}
