
export class FormValidator {
   constructor(config, form) {
      this._config = config;
      this._form = form;
   }

   enableValidation() {      
      this._setEventListener(this._form, this._config);
   }

   _setEventListener() {
      this._inputArray = Array.from(this._form.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
      this._form.addEventListener('reset', () => {
         setTimeout(() => {
            this._inputArray.forEach((inputElement) => {
               this._hideInputError(inputElement);
            })
            this._toggleButton();
         }, 0);
      })
      this._toggleButton();
      this._inputArray.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
            this._toggleInputErrorState(inputElement);
            this._toggleButton();
         });

        
      });
   }

   _toggleInputErrorState(inputElement) {
      if (!inputElement.validity.valid) {
         this._showInputError(inputElement, inputElement.validationMessage);
      }
      else {
         this._hideInputError(inputElement);
      }
   }

   _showInputError(inputElement, errorMessage) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = errorMessage;
   }

   _hideInputError(inputElement) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = '';
   }

   _toggleButton() {
      if (this._hasInvalidInput()) {
         this._buttonElement.classList.add(this._config.inactiveButtonClass);
         this._buttonElement.disabled = true;
      }
      else {
         this._buttonElement.classList.remove(this._config.inactiveButtonClass);
         this._buttonElement.disabled = false;
      }
   }

   _hasInvalidInput() {
      return this._inputArray.some((inputElement) => {
         return !inputElement.validity.valid;
      })
   }
}