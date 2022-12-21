export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseBound = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key !== 'Escape' || !this._popup) return;
    this.close()
  }

  _handleClickClose(evt) {
    if ((evt.target === this._popup) || (evt.target.classList.contains('popup__close-btn'))) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscCloseBound)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscCloseBound)
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => this._handleClickClose(evt))
  }

}
