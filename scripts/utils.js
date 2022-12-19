import { profileFormName, profileFormDescription, profileName, profileDescription,
         cardSelectors } from './constants.js';
import Card from './Card.js';
import { popupWithImage } from './index.js';


// Popup Functions

export function fillFormProfile() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

export function saveFormProfileValues() {
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
}

export function handleCardClick(cardImage, cardHeader) {
  popupWithImage.open(cardImage, cardHeader);
}


// Core functions

export function createCard(imgSrc, header) {
  const card = new Card(imgSrc, header,
                        cardSelectors, handleCardClick);
  return card.createCard()
}
