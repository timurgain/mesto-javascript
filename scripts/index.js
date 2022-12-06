const profilePopup = document.querySelector('.profile-popup');
const profileForm = document.forms['profile'];
const profileFormName = profileForm.elements['name'];
const profileFormDescription = profileForm.elements['description'];
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditBtn = document.querySelector('.profile__edit-btn');

const placePopup = document.querySelector('.place-popup');
const placeAddBtn = document.querySelector('.profile__add-btn');
const placeForm = document.forms['place'];
const placeFormName = placeForm.elements['name'];
const placeFormLink = placeForm.elements['link'];

const cardPopup = document.querySelector('.card-popup');
const cardImagePopup = cardPopup.querySelector('.popup__image');
const cardCaptionPopup = cardPopup.querySelector('.popup__caption');

const cardList = document.querySelector('.elements__cards');

const popupSections = document.querySelectorAll('.popup');


// Functions

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);

}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  if (evt.key !== 'Escape') return;
  const popup = document.querySelector('.popup_opened');
  if (!!popup === false) return;
  closePopup(popup);
}

function fillFormProfile() {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
}

function saveFormProfileValues() {
  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;
}

function addCardElementToCardList(cardElement, where='append') {
  if (where === 'prepend') {
    cardList.prepend(cardElement);
  } else {
    cardList.append(cardElement);
  };
}

// Listeners

profileEditBtn.addEventListener('click', () => {
  openPopup(profilePopup);
  fillFormProfile();
});

placeAddBtn.addEventListener('click', () => openPopup(placePopup));

profileForm.addEventListener('submit', (evt) => {
  saveFormProfileValues();
  closePopup(profilePopup);
  profileForm.reset();
  evt.preventDefault();
});

popupSections.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if ((evt.target === popup) || (evt.target.classList.contains('popup__close-btn'))) {
      closePopup(popup);
    }
  })
})

placeForm.addEventListener('submit', (evt) => {
  const card = new Card(placeFormLink.value, placeFormName.value);
  addCardElementToCardList(card.createCard(), where='prepend');
  closePopup(placePopup);
  placeForm.reset();
  evt.preventDefault();
})


// Filling the inital cards

const initialCards = [
  {
    name: 'Северный чуйский хребет',
    link: 'images/chuiskiy-hrebet.jpg'
  },
  {
    name: 'Камчатка',
    link: 'images/kamchatka.jpg'
  },
  {
    name: 'Суздаль',
    link: 'images/suzdal.jpg'
  },
  {
    name: 'Ольхон',
    link: 'images/olhon.jpg'
  },
  {
    name: 'Териберка',
    link: 'images/teriberka.jpg'
  },
  {
    name: 'Уральские горы',
    link: 'images/ural.jpg'
  }
];

initialCards.forEach((initialCard) => {
  const card = new Card(initialCard.link, initialCard.name);
  addCardElementToCardList(card.createCard());
});
