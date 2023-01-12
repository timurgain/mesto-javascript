import Card from './Card.js';
import { cardSelectors } from './constants.js';
import { sectionCard, popupWithImage, userInfo, api } from '../pages/index.js';



export function handleCardClick(cardImage, cardHeader) {
  popupWithImage.open(cardImage, cardHeader);
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
  const item = createCard(link, name);
  sectionCard.addItem(item, 'prepend');
}

export function createCard(imgSrc, header) {
  const card = new Card(imgSrc, header,
                        cardSelectors, handleCardClick);
  return card.createCard()
}

export function checkResponseOk(response) {
  if (!response.ok) {throw new Error('HTTP status code is not OK')};
}

export function convertResponseToJson(response) {
  checkResponseOk(response);
  return response.json();
}
