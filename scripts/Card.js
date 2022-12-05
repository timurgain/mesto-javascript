class Card {

  static _template = document.querySelector('#card').content;

  constructor(imgSrc, header) {
    this._imgSrc = imgSrc;
    this._header = header;
  }

  createCard() {
    this._cardElement = this._getCardElement();
    this._makeCardElementSelectors();
    this._fillCardElement();
    this._setEventListeners();
    return this._cardElement
  }

  _getCardElement() {
    return Card._template.cloneNode(true)
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

  _setEventListeners() {
      this._cardLikeBtn.addEventListener(
        'click', () => {this._cardLikeBtn.classList.toggle('card__like-btn_active')}
      );
      this._cardTrashBtn.addEventListener(
        'click', () => {this._cardTrashBtn.closest('li').remove()}
      );
      // this._cardImage.addEventListener(
      //   'click', () => {
      //     cardImagePopup.src = cardImage.src;
      //     cardImagePopup.alt = cardImage.alt;
      //     cardCaptionPopup.textContent = cardHeader.textContent;
      //     openPopup(cardPopup);
      //   }
      // );
  }
}
