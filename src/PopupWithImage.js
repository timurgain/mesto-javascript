import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({popupSelector, ...selectors}) {
    super(popupSelector);
    this._cardImagePopup = this._popup.querySelector(selectors.cardImagePopup);
    this._cardCaptionPopup = this._popup.querySelector(selectors.cardCaptionPopup);
  }

  open(cardImage, cardHeader) {
    this._cardImagePopup.src = cardImage.src;
    this._cardImagePopup.alt = cardImage.alt;
    this._cardCaptionPopup.textContent = cardHeader.textContent;
    super.open();
  }

}
