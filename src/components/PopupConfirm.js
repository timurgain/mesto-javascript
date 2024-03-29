import Popup from "./Popup";


export default class PopupConfirm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._confirmEntityId = null;
    this._confirmEntityElement = null;
    this._form = this._popup.querySelector('.popup__confirm-form');
    this._formSubmitHandler = formSubmitHandler
  }

  // entity - who call the popup (e.g. card instance)
  open(entityInstance) {
    this._entityInstance = entityInstance;
    super.open();
  }

  close() {
    this._confirmEntityId = null;
    this._confirmEntityElement = null;
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._entityInstance);
    });
  }

}
