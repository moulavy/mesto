const formError = document.querySelector('.name-input-error');

function showInputError(formElement, inputElement, errorMessage) {
   
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add('popup__input_type_error');
   errorElement.textContent = errorMessage;
   errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove('popup__input_type_error');
   errorElement.classList.remove('popup__input-error_active');
   errorElement.textContent = '';
}

function isValid(formElement, inputElement) {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
   }
   else {
      hideInputError(formElement, inputElement);
   }
}

function setEventListener(formElement) {
   const inputArray = Array.from(formElement.querySelectorAll('.popup__input'));
   const buttonElement = formElement.querySelector('.form__submit');
   toggleButton(inputArray, buttonElement);
   inputArray.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
         toggleButton(inputArray, buttonElement);
         isValid(formElement, inputElement);

      });
      buttonCloseAdd.addEventListener('click', () => {
         const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
         inputElement.classList.remove('popup__input_type_error');
         errorElement.classList.remove('popup__input-error_active');
         errorElement.textContent = '';
      });
      buttonCloseEdit.addEventListener('click', () => {
         const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
         inputElement.classList.remove('popup__input_type_error');
         errorElement.classList.remove('popup__input-error_active');
         errorElement.textContent = '';
      })
   });
}

function enableValidation() {
   const formArray = Array.from(document.querySelectorAll('.form'));

   formArray.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      
      setEventListener(formElement);
   })
}

function hasInvalidInput(inputArray) {
   return inputArray.some((inputElement) => {
      return !inputElement.validity.valid;
   })

}

function toggleButton(inputArray, buttonElement) {
   if (hasInvalidInput(inputArray)) {
      buttonElement.classList.add('form__submit_inactive');
   }
   else {
      buttonElement.classList.remove('form__submit_inactive');
   }
}

enableValidation();
