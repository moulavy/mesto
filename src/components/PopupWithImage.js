import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._titleImg = this._popup.querySelector('.popup-img__subtitle');
    this._photoPopup = this._popup.querySelector('.popup-img__photo');
  }
  open(cardName, cardLink) {
    super.open();
    this._titleImg.textContent = cardName;
    this._photoPopup.src = cardLink;
    this._photoPopup.alt = cardName;
  }

}