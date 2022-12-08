function showInputError(formElement, inputElement, errorMessage,obj) {
   
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(obj.inputErrorClass);
   errorElement.textContent = errorMessage;
   // errorElement.classList.add(obj.errorClass);
}

function hideInputError(formElement, inputElement,obj) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(obj.inputErrorClass);
   // errorElement.classList.remove(obj.errorClass);
   errorElement.textContent = '';
}

function isValid(formElement, inputElement,obj) {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage,obj);
   }
   else {
      hideInputError(formElement, inputElement,obj);
   }
}

function setEventListener(formElement,obj) {
   const inputArray = Array.from(formElement.querySelectorAll(obj.inputSelector));
   const buttonElement = formElement.querySelector(obj.submitButtonSelector);
   toggleButton(inputArray, buttonElement,obj);
   inputArray.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
         toggleButton(inputArray, buttonElement,obj);
         isValid(formElement, inputElement,obj);

      });
      buttonCloseAdd.addEventListener('click', () => {
         const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
         inputElement.classList.remove(obj.inputErrorClass);
         // errorElement.classList.remove(obj.errorClass);
         errorElement.textContent = '';
      });
      buttonCloseEdit.addEventListener('click', () => {
         const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
         inputElement.classList.remove(obj.inputErrorClass);
         // errorElement.classList.remove(obj.errorClass);
         errorElement.textContent = '';
      })
   });
}

function enableValidation(obj) {
   const formArray = Array.from(document.querySelectorAll(obj.formSelector));
   
   formArray.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
     
      setEventListener(formElement,obj);
   })
}

function hasInvalidInput(inputArray) {
   return inputArray.some((inputElement) => {
      return !inputElement.validity.valid;
   })

}

function toggleButton(inputArray, buttonElement,obj) {
   if (hasInvalidInput(inputArray)) {
      buttonElement.classList.add(obj.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
   }
   else {
      buttonElement.classList.remove(obj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
   }
}

enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
}); 
