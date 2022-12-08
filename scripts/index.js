/*для edit*/
const buttonCloseEdit = document.querySelector('.popup-edit__button-close');
const popupEdit = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__edit-button');
const formEditElement = document.querySelector('.popup-edit__container');
const nameInput = formEditElement.querySelector('.popup__input_value_name');
const jobInput = formEditElement.querySelector('.popup__input_value_description');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

/*для add*/
const buttonCloseAdd = document.querySelector('.popup-add__button-close');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const formAddElement = document.querySelector('.popup-add__container');
const nameImgInput = formAddElement.querySelector('.popup__input_value_name-img');
const linkImgInput = formAddElement.querySelector('.popup__input_value_link-img');

/*для popup-img*/
const buttonCloseImg = document.querySelector('.popup-img__button-close');
const popupImg = document.querySelector('.popup-img');
const buttonImg = document.querySelector('elements__button-img');
const photoPopup = document.querySelector('.popup-img__photo');
const titleImgPopup = document.querySelector('.popup-img__subtitle');
const popupImgContainer = document.querySelector('.popup-img__container');

/*вывод карточек из массива на страницу*/
const elementsList = document.querySelector('.elements__list');
const templateElements = document.querySelector('#elements__element').content;



function openEditPopup() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
   openPopup(popupEdit);
}

function openPopup(item) {
   item.classList.add('popup_opened');
}

function closePopup(item) {
   item.classList.remove('popup_opened');
}


function formEditSubmitHandler(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;   
   closePopup(popupEdit);
}

function createCard(card)
/*я передавала изначально как объект, но свойства у этого объекта разные 
там где мы вызываем функцию, из input передается value, а из массива name и link.*/
{  
   const itemElement = templateElements.cloneNode(true);
   const itemElementLi = itemElement.querySelector('.elements__element');
   const itemElementImg = itemElement.querySelector('.elements__image');
   const itemElementLike = itemElement.querySelector('.elements__button-like');
   const itemElementDelete = itemElement.querySelector('.elements__button-delete');
   
   itemElement.querySelector('.elements__image').src = card.link;
   itemElement.querySelector('.elements__image').alt = card.name;
   itemElement.querySelector('.elements__title').textContent = card.name;

   const itemName = itemElement.querySelector('.elements__title').textContent;
   const itemImg = itemElement.querySelector('.elements__image').src;

   function openImg() {
      openPopup(popupImg);
      titleImgPopup.textContent = itemName;
      photoPopup.src = itemImg;
      photoPopup.alt = itemName;
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
function renderCard(cardItem, listI) {
   listI.prepend(createCard(cardItem));
}

function formAddSubmitHandler(evt) {
   evt.preventDefault();
   const data = {};
   data.name = nameImgInput.value;
   data.link = linkImgInput.value;
   renderCard(data, elementsList);
   linkImgInput.value = '';
   nameImgInput.value = '';
   closePopup(popupAdd);
}
initialCards.forEach((cardItem) => {
   renderCard(cardItem, elementsList)
}); 

const formError = document.querySelector('.name-input-error');

function showInputError(element,errorMessage) {
   element.classList.add('popup__input_type_error');
   formError.textContent = errorMessage;
   formError.classList.add('popup__input-error_active');
}

function hideInputError(element) {
   element.classList.add('popup__input_type_error');
   formError.classList.remove('popup__input-error_active');
   formError.textContent = '';
}

function isValid() {
   if (!nameInput.validity.valid) {
      showInputError(nameInput,nameInput.validationMessage);
   }
   else {
      hideInputError(nameInput);
   }
}

nameInput.addEventListener('input', isValid);

addButton.addEventListener('click', ()=>openPopup(popupAdd));
buttonCloseAdd.addEventListener('click', ()=>closePopup(popupAdd));

editButton.addEventListener('click', openEditPopup);
buttonCloseEdit.addEventListener('click', ()=>closePopup(popupEdit));

buttonCloseImg.addEventListener('click', ()=>closePopup(popupImg));

formEditElement.addEventListener('submit', formEditSubmitHandler); 
formAddElement.addEventListener('submit', formAddSubmitHandler);
 