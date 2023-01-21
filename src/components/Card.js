export default class Card {
  constructor(item, currentUserId, cardSelectors, handleCardClick, handleCardTrashBtnClick, handleCardLikeBtnClick) {
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._imgSrc = item.link;
    this._header = item.name;
    this._currentUserId = currentUserId;
    this._cardSelectors = cardSelectors;
    item.likes.length == 0 ? this._likeCounter = '' : this._likeCounter = item.likes.length;  // если 0 тогда просто сердечко
    this._isLiked = item.likes.some((user) => {return user._id === currentUserId});
    this._handleCardClick = handleCardClick;
    this._handleCardTrashBtnClick = handleCardTrashBtnClick;
    this._handleCardLikeBtnClick = handleCardLikeBtnClick;
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
    this._cardLikeCounter = this._cardElement.querySelector(this._cardSelectors.cardLikeCounterSelector);
    this._cardTrashBtn = this._cardElement.querySelector(this._cardSelectors.cardTrashBtnSelector);
  }

  _fillCardElement() {
    this._cardImage.setAttribute('src', this._imgSrc);
    this._cardImage.setAttribute('alt', `Изображение: ${this._header}`);
    this._cardHeader.textContent = this._header;
    this._cardLikeCounter.textContent = this._likeCounter;
    if (this._isLiked) {
      this._cardLikeBtn.classList.toggle(this._cardSelectors.cardLikeBtnActive);
      this._cardLikeCounter.classList.toggle(this._cardSelectors.cardLikeCounterActive);
    }
    if (this._currentUserId === this._ownerId) {
      this._cardTrashBtn.classList.add(this._cardSelectors.cardTrashBtnVisible)
    }
  }

  _toggleLike() {
    this._handleCardLikeBtnClick(this._cardId, this._cardLikeBtn, this._cardLikeCounter, this._cardSelectors)
  }

  // _deleteCard() {
  //   this._cardElement.remove()
  // }

  _handleCardClick() {
    this._handleCardClick(this._cardImage, this._cardHeader)
  }

  _setEventListeners() {
    this._cardLikeBtn.addEventListener('click', this._toggleLike.bind(this));
    this._cardTrashBtn.addEventListener('click', () => this._handleCardTrashBtnClick(this._cardId, this._cardElement));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardImage, this._cardHeader));
  }
}
