import Popup from "./Popup";


export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open() {
    console.log('открываю')
    super.open()
  }

}
