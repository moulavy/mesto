function showInputError(formElement, inputElement, errorMessage, config) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(config.inputErrorClass);
   errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, config) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(config.inputErrorClass);
   errorElement.textContent = '';
}

function isValid(formElement, inputElement, config) {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
   }
   else {
      hideInputError(formElement, inputElement, config);
   }
}

function hasInvalidInput(inputArray) {
   return inputArray.some((inputElement) => {
      return !inputElement.validity.valid;
   })
}

function toggleButton(inputArray, buttonElement, config) {
   if (hasInvalidInput(inputArray)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = 'disabled';
   }
   else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
   }
}

function setEventListener(formElement, config) {
   const inputArray = Array.from(formElement.querySelectorAll(config.inputSelector));
   const buttonElement = formElement.querySelector(config.submitButtonSelector);
   toggleButton(inputArray, buttonElement, config);
   inputArray.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
         isValid(formElement, inputElement, config);
         toggleButton(inputArray, buttonElement, config);
      });
   });
}

function enableValidation(config) {
   const formArray = Array.from(document.querySelectorAll(config.formSelector));
   formArray.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      setEventListener(formElement, config);
   })
}

enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
}); 
