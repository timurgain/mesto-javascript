export default class Card {
  constructor(imgSrc, header, cardSelectors, handleCardClick) {
    this._imgSrc = imgSrc;
    this._header = header;
    this._cardSelectors = cardSelectors;
    this._handleCardClick = handleCardClick;

  }

  createCard() {
    this._cardElement = this._getCardElement();
    this._defineCardElements();
    this._fillCardElement();
    this._setEventListeners();
    return this._cardElement
  }

  _getCardElement() {
    this._template = document.querySelector(this._cardSelectors.cardTemplateSelector).content.children[0];
    return this._template.cloneNode(true);
  }

  _defineCardElements() {
    this._cardImage = this._cardElement.querySelector(this._cardSelectors.cardImageSelector);
    this._cardHeader = this._cardElement.querySelector(this._cardSelectors.cardHeaderSelector);
    this._cardLikeBtn = this._cardElement.querySelector(this._cardSelectors.cardLikeBtnSelector);
    this._cardTrashBtn = this._cardElement.querySelector(this._cardSelectors.cardTrashBtnSelector);
  }

  _fillCardElement() {
    this._cardImage.setAttribute('src', this._imgSrc);
    this._cardImage.setAttribute('alt', `Изображение: ${this._header}`);
    this._cardHeader.textContent = this._header;
  }

  _toggleLike() {
    this._cardLikeBtn.classList.toggle(this._cardSelectors.cardLikeBtnActive)
  }

  _deleteCard() {
    this._cardElement.remove()
  }

  _handleCardClick() {
    this._handleCardClick(this._cardImage, this._cardHeader)
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener('click', this._toggleLike.bind(this));
    this._cardTrashBtn.addEventListener('click', this._deleteCard.bind(this));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardImage, this._cardHeader));
  }
}
