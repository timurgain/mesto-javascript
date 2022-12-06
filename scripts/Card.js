class Card {

  static _template = document.querySelector('#card').content;

  constructor(imgSrc, header, cardSelectors) {
    this._imgSrc = imgSrc;
    this._header = header;
    this._cardSelectors = cardSelectors;
  }

  createCard() {
    this._cardElement = this._getCardElement();
    this._makeCardElementSelectors();
    this._fillCardElement();
    this._setEventListeners();
    return this._cardElement
  }

  _getCardElement() {
    return Card._template.cloneNode(true).children[0];
  }

  _makeCardElementSelectors() {
      this._cardImage = this._cardElement.querySelector('.card__image');
      this._cardHeader = this._cardElement.querySelector('.card__header');
      this._cardLikeBtn = this._cardElement.querySelector('.card__like-btn');
      this._cardTrashBtn = this._cardElement.querySelector('.card__trash-btn')
  }

  _fillCardElement() {
      this._cardImage.setAttribute('src', this._imgSrc);
      this._cardImage.setAttribute('alt', `Изображение: ${this._header}`);
      this._cardHeader.textContent = this._header;
  }

  _openCardImagePopup() {
    this._cardPopup = document.querySelector(this._cardSelectors.cardPopupSelector);
    this._cardImagePopup = this._cardPopup.querySelector(this._cardSelectors.cardImagePopupSelector);
    this._cardCaptionPopup = this._cardPopup.querySelector(this._cardSelectors.cardCaptionPopupSelector);

    this._cardImagePopup.src = this._cardImage.src;
    this._cardImagePopup.alt = this._cardImage.alt;
    this._cardCaptionPopup.textContent = this._cardHeader.textContent;
    openPopup(this._cardPopup);
  }

  _setEventListeners() {
      this._cardLikeBtn.addEventListener(
        'click', () => {this._cardLikeBtn.classList.toggle('card__like-btn_active')}
      );
      this._cardTrashBtn.addEventListener(
        'click', () => {this._cardTrashBtn.closest('li').remove()}
      );
      this._cardImage.addEventListener(
        'click', () => this._openCardImagePopup()
      );
  }
}
