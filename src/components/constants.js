export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const placeAddBtn = document.querySelector('.profile__add-btn');

export const baseUrlServer = 'https://mesto.nomoreparties.co/v1/cohort-57';
export const tokenServer = '411b4699-7ab1-47ad-aa53-52186a7d47e6';

// webpack needs urls like this
const chuiskiyHrebet = new URL('../images/chuiskiy-hrebet.jpg', import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const suzdal = new URL('../images/suzdal.jpg', import.meta.url);
const olhon = new URL('../images/olhon.jpg', import.meta.url);
const teriberka = new URL('../images/teriberka.jpg', import.meta.url);
const ural = new URL('../images/ural.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Северный чуйский хребет',
    link: chuiskiyHrebet
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Суздаль',
    link: suzdal
  },
  {
    name: 'Ольхон',
    link: olhon
  },
  {
    name: 'Териберка',
    link: teriberka
  },
  {
    name: 'Уральские горы',
    link: ural
  }
];

export const userSelectors = {
  profileSelector: '.profile',
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
};

export const popupCardImageSelectors = {
  popupSelector: '.card-popup',
  cardImagePopup: '.popup__image',
  cardCaptionPopup: '.popup__caption'
};

export const cardSelectors = {
  cardTemplateSelector: '#card',
  cardImageSelector: '.card__image',
  cardHeaderSelector: '.card__header',
  cardLikeBtnSelector: '.card__like-btn',
  cardLikeBtnActive: 'card__like-btn_active',
  cardTrashBtnSelector: '.card__trash-btn'
};

export const formSelectors = {
  formSelector: '.popup__form',
  fieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));
