let buttonClose = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

let formElement = document.querySelector('.popup__container');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__description');


function editClick() {
   popup.classList.add('popup_opened');
}

editButton.addEventListener('click', editClick);

function closeClick() {
   popup.classList.remove('popup_opened');
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
}

buttonClose.addEventListener('click', closeClick);


/*обработка полей ввода*/


nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;
function formSubmitHandler(evt) {
   evt.preventDefault(); 
   
   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;
   closeClick();
}

formElement.addEventListener('submit', formSubmitHandler); 