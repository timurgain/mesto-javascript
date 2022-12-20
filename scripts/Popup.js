export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseBound = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened')
    const handleEscCloseBinded = this._handleEscClose.bind(this)
    document.addEventListener('keydown', this._handleEscCloseBound)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscCloseBound)
  }

  _handleEscClose(evt) {
    if (evt.key !== 'Escape' || !this._popup) return;
    this.close()
  }

  setEventListeners() {

    this._popup.addEventListener('mousedown', (evt) => {
      if ((evt.target === this._popup) || (evt.target.classList.contains('popup__close-btn'))) {
        this.close();
      }
    })
  }

}
