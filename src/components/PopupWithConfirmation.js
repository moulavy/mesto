import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup{
   constructor(popupSelector) {
      super(popupSelector);
      this._form = this._popup.querySelector('.popup__form');
   }

   handlerSubmit( cardId,handler) {      
      this._handlerSubmit = handler;
      this._cardId = cardId;
   };

   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._handlerSubmit();
      });
   }
}