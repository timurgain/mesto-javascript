import { profileFormName, profileFormDescription, profileName, profileDescription,
         cardPopup, cardImagePopup, cardCaptionPopup,
         cardList,
         cardSelectors } from './constants.js'
import { Card } from './Card.js';


// Popup Functions

export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);

}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  if (evt.key !== 'Escape') return;
  const popup = document.querySelector('.popup_opened');
  if (!!popup === false) return;
  closePopup(popup);
}

export function fillFormProfile() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

export function saveFormProfileValues() {
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
}

export function openCardImagePopup(cardImage, cardHeader) {
  cardImagePopup.src = cardImage.src;
  cardImagePopup.alt = cardImage.alt;
  cardCaptionPopup.textContent = cardHeader.textContent;
  openPopup(cardPopup);
}


// Core functions

export function createCard(imgSrc, header) {
  const card = new Card(imgSrc, header,
                        cardSelectors, openCardImagePopup);
  return card.createCard()
}

export function addCardElementToCardList(cardElement, where='append') {
  if (where === 'prepend') {
    cardList.prepend(cardElement);
  } else {
    cardList.append(cardElement);
  };
}
