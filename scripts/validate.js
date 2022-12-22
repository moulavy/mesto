settingsValidate={
   formSelector: '.popup__form',
      inputSelector: '.popup__input',
         submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
               inputErrorClass: 'popup__input_type_error',
                  errorClass: 'popup__error_visible'
}

class FormValidator{
   constructor(config, form) {     
      this._config = config;
      this._form = form;
   }

   enableValidation() {
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      this._setEventListener(this._form, this._config);
   }

   _setEventListener() {
   const inputArray = Array.from(this._form.querySelectorAll(this._config.inputSelector));
   const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
   this._form.addEventListener('reset', () => {
      setTimeout(() => {
         this._toggleButton(inputArray, buttonElement);
      }, 0);
   })      
   this._toggleButton(inputArray, buttonElement);
   inputArray.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
         this._isValid(inputElement);
         this._toggleButton(inputArray, buttonElement);
      });
   });
   }

   _isValid(inputElement) {
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

   _toggleButton(inputArray, buttonElement) {
      if (this._hasInvalidInput(inputArray)) {
         buttonElement.classList.add(this._config.inactiveButtonClass);
         buttonElement.disabled = true;
      }
      else {
         buttonElement.classList.remove(this._config.inactiveButtonClass);
         buttonElement.disabled = false;
      }
   }

   _hasInvalidInput(inputArray) {
      return inputArray.some((inputElement) => {
         return !inputElement.validity.valid;
      })
   }
}

function enableValidationForms(config) {
   const formArray = Array.from(document.querySelectorAll(config.formSelector));
   formArray.forEach((formElement) => {
      const form = new FormValidator(settingsValidate, formElement);
      form.enableValidation();
   })
}

enableValidationForms(settingsValidate); 
