export const profileForm = document.forms['profile'];
export const profileFormName = profileForm.elements['name'];
export const profileFormDescription = profileForm.elements['description'];
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileEditBtn = document.querySelector('.profile__edit-btn');

export const placeAddBtn = document.querySelector('.profile__add-btn');

export const initialCards = [
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
