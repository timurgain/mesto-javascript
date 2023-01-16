import Card from './Card.js';
import { cardSelectors } from './constants.js';
import { sectionCard, popupWithImage, popupConfirm, userInfo, api } from '../pages/index.js';



export function handleCardClick(cardImage, cardHeader) {
  popupWithImage.open(cardImage, cardHeader);
}

export function handleCardTrashBtnClick() {
  popupConfirm.open();
}

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
      sectionCard.addItem(card, 'prepend');
    })
    .catch(err => reportError(err));
}

export function createCard(item) {
  const currentUserId = userInfo.getUserInfo().id;
  const card = new Card(item,
                        currentUserId, cardSelectors, handleCardClick, handleCardTrashBtnClick);
  return card.createCard()
}

export function checkResponseOk(response) {
  if (!response.ok) {throw new Error('HTTP status code is not OK')};
}

export function convertResponseToJson(response) {
  checkResponseOk(response);
  return response.json();
}
