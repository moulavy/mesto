export default class Popup{
   constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
   }
   open() {      
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
   }
   close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
   }

   _handleEscClose=(e)=> {
      if (e.key === 'Escape') {
         this.close();
      }   
   }

   setButtonText(text) {
      this._popup.querySelector('.popup__button').textContent = text;
   }

   _handleOverlayClose(e) {
      if (e.target.classList.contains('popup_opened')) {
         this.close();
      }
   }
   
   setEventListeners() {
      const buttonClose = this._popup.querySelector(".popup__button-close");
      buttonClose.addEventListener("click", this.close.bind(this));
      this._popup.addEventListener("mousedown", this._handleOverlayClose.bind(this));
      
   }
}