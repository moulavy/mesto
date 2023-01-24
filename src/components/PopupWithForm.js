import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
   constructor(popupSelector, formSubmitCallback) {
      super(popupSelector);
      this._formSubmitCallback = formSubmitCallback;
      this._form = this._popup.querySelector('.popup__form');
      this._inputs = [...this._form.querySelectorAll('.popup__input')];
     
   }

   _getInputValues(){
      const inputValues = {};
      this._inputs.forEach((input) => {
         inputValues[input.name] = input.value;
      });
      
      return inputValues;
   }

   setInputValues(data) {      
      this._inputs.forEach((input) => {
         input.value = data[input.name];         
      });
   }

   setEventListeners() {      
      super.setEventListeners();      
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._formSubmitCallback(this._getInputValues())
      })
   }

   close() {      
      super.close();
      this._form.reset();
   }
}