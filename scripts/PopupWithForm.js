import Popup from "./Popup";

export default class PopupWithForm extends Popup{
   constructor(popupSelector, formSubmitCallback) {
      super(popupSelector);
      this._formSubmitCallback = formSubmitCallback;
   }

   _getInputValues() {
      
   }

   setEventListeners() {
      
   }

   close() {
      
   }
}