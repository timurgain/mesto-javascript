export const baseUrlServer = 'https://mesto.nomoreparties.co/v1/cohort-57';
export const tokenServer = '411b4699-7ab1-47ad-aa53-52186a7d47e6';

export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const placeAddBtn = document.querySelector('.profile__add-btn');
export const profileAvatar = document.querySelector('.profile__avatar');

export const saveBtnText = { initial: 'Сохранить', pending: 'Сохранение...' }

export const userSelectors = {
  profileSelector: '.profile',
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
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
  cardLikeCounterSelector: '.card__like-counter',
  cardLikeCounterActive: 'card__like-counter_active',
  cardTrashBtnSelector: '.card__trash-btn',
  cardTrashBtnVisible: 'card__trash-btn_visible'
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
