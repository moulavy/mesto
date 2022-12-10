/*для edit*/
const buttonCloseEdit = document.querySelector('.popup-edit__button-close');
const popupEdit = document.querySelector('.popup-edit');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const formEditElement = document.querySelector('.popup-edit__container');
const nameInput = formEditElement.querySelector('.popup__input_value_name');
const jobInput = formEditElement.querySelector('.popup__input_value_description');
const buttonSubmitProfileEdit = formEditElement.querySelector('.popup__button-save');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

/*для add*/
const buttonCloseAdd = document.querySelector('.popup-add__button-close');
const popupAdd = document.querySelector('.popup-add');
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const formAddElement = document.querySelector('.popup-add__container');
const nameImgInput = formAddElement.querySelector('.popup__input_value_name-img');
const linkImgInput = formAddElement.querySelector('.popup__input_value_link-img');
const buttonSubmitCardAdd = formAddElement.querySelector('.popup__button-add');
/*для popup-img*/
const buttonCloseImg = document.querySelector('.popup-img__button-close');
const popupImg = document.querySelector('.popup-img');
const photoPopup = document.querySelector('.popup-img__photo');
const titleImgPopup = document.querySelector('.popup-img__subtitle');


/*вывод карточек из массива на страницу*/
const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#elements__element').content;

function deactivationButton(button) {
   button.classList.add('popup__button_disabled');
   button.setAttribute('disabled', 'disabled');
}

function activationButton(button) {
   button.classList.remove('popup__button_disabled');
   button.removeAttribute('disabled', 'disabled');
}

function restartError(popup) {
   const inputArray = Array.from(popup.querySelectorAll(".popup__input"));
   inputArray.forEach((inputElement) => {
      const errorElement = popup.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove("popup__input_type_error");
      errorElement.textContent = '';
   })
}

function openEditPopup() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
   activationButton(buttonSubmitProfileEdit);
   openPopup(popupEdit);
}

function closePopup(popup) {
   popup.classList.remove('popup_opened');  
   if (popup === popupEdit || popup === popupAdd) {
      //добавила проверку, чтобы не усложнять функции закрыть по оверлею или по Escape. Ошибки не выходит при закрытии popupImg
      form = popup.querySelector('.popup__container');
      form.reset(); 
   }
   document.removeEventListener('keydown', closeByEsc);   
}

function closeByEsc(e) {
   if (e.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
   }
}

function closePopupOverlay(e) {
   if (e.target.classList.contains('popup_opened')) {
      closePopup(e.target);
   }
}

function openPopup(popup) {
   if (popup === popupEdit || popup === popupAdd) {
      restartError(popup);
   }
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', closeByEsc);   
}

function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;
   
   closePopup(popupEdit);

}

function createCard(card) {
   const itemElement = cardTemplate.cloneNode(true);
   const itemElementLi = itemElement.querySelector('.elements__element');
   const itemElementImg = itemElement.querySelector('.elements__image');
   const itemElementTitle = itemElement.querySelector('.elements__title')
   const itemElementLike = itemElement.querySelector('.elements__button-like');
   const itemElementDelete = itemElement.querySelector('.elements__button-delete');

   itemElementImg.src = card.link;
   itemElementImg.alt = card.name;
   itemElementTitle.textContent = card.name;

   function openImg() {
      openPopup(popupImg);
      titleImgPopup.textContent = card.name;
      photoPopup.src = card.link;
      photoPopup.alt = card.name;
   }

   function handlerDelete() {
      itemElementLi.remove();
   }
   function handlerLike() {
      itemElementLike.classList.toggle('elements__button-like_active');
   }

   itemElementLike.addEventListener('click', handlerLike);
   itemElementDelete.addEventListener('click', handlerDelete);
   itemElementImg.addEventListener('click', openImg);

   return itemElement;
}

function renderCard(cardItem, container) {
   container.prepend(createCard(cardItem));
}

function handleCardFormSubmit(evt) {
   evt.preventDefault();
   const data = {};
   data.name = nameImgInput.value;
   data.link = linkImgInput.value;
   renderCard(data, cardsContainer);   
   closePopup(popupAdd);   
   deactivationButton(buttonSubmitCardAdd);

}

/*создание карточек из массива*/
initialCards.forEach((cardItem) => {
   renderCard(cardItem, cardsContainer)
});


buttonOpenCardPopup.addEventListener('click', () => openPopup(popupAdd));
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd));

popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);
popupImg.addEventListener('click', closePopupOverlay);

buttonOpenProfilePopup.addEventListener('click', openEditPopup);
buttonCloseEdit.addEventListener('click', () => closePopup(popupEdit));

buttonCloseImg.addEventListener('click', () => closePopup(popupImg));

formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleCardFormSubmit);

