import Card from './Card.js';
import { cardSelectors } from './constants.js';
import { sectionCard, popupWithImage, userInfo } from '../pages/index.js';


export function handleCardClick(cardImage, cardHeader) {
  popupWithImage.open(cardImage, cardHeader);
}

export function profileSubmitHandler({name, description}) {
  userInfo.setUserInfo(name, description);
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
