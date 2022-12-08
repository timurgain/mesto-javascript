export class Card {

  static _template = document.querySelector('#card').content.children[0];

  constructor(imgSrc, header, cardSelectors, openCardImagePopup) {
    this._imgSrc = imgSrc;
    this._header = header;
    this._cardSelectors = cardSelectors;
    this._openCardImagePopup = openCardImagePopup;
  }

  createCard() {
    this._cardElement = this._getCardElement();
    this._defineCardElements();
    this._fillCardElement();
    this._setEventListeners();
    return this._cardElement
  }

  _getCardElement() {
    return Card._template.cloneNode(true);
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

  _setEventListeners() {
    this._cardLikeBtn.addEventListener(
      'click', () => {this._cardLikeBtn.classList.toggle(this._cardSelectors.cardLikeBtnActive)}
    );
    this._cardTrashBtn.addEventListener(
      'click', () => {this._cardElement.remove()}
    );
    this._cardImage.addEventListener(
      'click', () => this._openCardImagePopup(this._cardImage, this._cardHeader)
    );
  }
}
