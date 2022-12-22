import { profileFormName, profileFormDescription, profileName, profileDescription,
         cardSelectors } from './constants.js';
import Card from './Card.js';
import { sectionCard, popupWithImage } from './index.js';


export function handleCardClick(cardImage, cardHeader) {
  popupWithImage.open(cardImage, cardHeader);
}

export function profileSubmitHandler() {
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
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
