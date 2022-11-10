let buttonClose = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

let formElement = document.querySelector('.popup__container');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_description');


function openPopup() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
   popup.classList.add('popup_opened');
}

function closePopup() {
   popup.classList.remove('popup_opened');
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;
   closePopup();
}

editButton.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 