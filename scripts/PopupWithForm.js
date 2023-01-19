import Popup from "./Popup";

export default class PopupWithForm extends Popup{
   constructor(popupSelector,formSubmit) {
      super(popupSelector);
      this._formSubmit = formSubmit;
   }

   _getInputValues() {
      
   }

   setEventListeners() {
      
   }

   close() {
      
   }
}