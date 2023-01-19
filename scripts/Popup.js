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

   _handleEscClose(e) {
      if (e.key === 'Escape') {
         this.close();
      }   
   }

   _handleOverlayClose(e) {
      if (e.target.classList.contains('popup_opened')) {
         this.close();
      }
   }

   setEventListeners() {
      const buttonClose = this._popup.querySelector(".popup__button-close");

      buttonClose.addEventListener("click", this.close);

      this._popup.addEventListener("click", this._handleOverlayClose);
      
   }
}