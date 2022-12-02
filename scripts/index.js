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

const initialCards = [
   {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];


function openEditPopup() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
   openPopup(popupEdit);
}

function closeEditPopup() {
   closePopup(popupEdit);
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
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
   closeEditPopup();
}

function createCard(itemArgImg, itemArgName) {
  
   const itemElement = templateElements.cloneNode(true);
   const itemElementLi = itemElement.querySelector('.elements__element');
   const itemElementName = itemElement.querySelector('elements__title');
   const itemElementImg = itemElement.querySelector('.elements__image');
   const itemElementLike = itemElement.querySelector('.elements__button-like');
   const itemElementDelete = itemElement.querySelector('.elements__button-delete');

   itemElement.querySelector('.elements__image').src = itemArgImg;
   itemElement.querySelector('.elements__title').textContent = itemArgName;

   const itemName = itemElement.querySelector('.elements__title').textContent;
   const itemImg = itemElement.querySelector('.elements__image').src;

   /*обработчик лайка для карточек*/
   itemElementLike.addEventListener('click', function () {
      itemElementLike.classList.toggle('elements__button-like_active');
   });

   /*обработчик удаления для карточек*/
   itemElementDelete.addEventListener('click', function () {
      itemElementLi.remove();
   });

   /*обработчик открыть изображение для карточек*/
   itemElementImg.addEventListener('click', function () {
      openPopup(popupImg);
      titleImgPopup.textContent = itemName;
      photoPopup.src = itemImg;
   });  
   return itemElement;
}

initialCards.forEach(function (cardItem) {   
   let element=createCard(cardItem.link, cardItem.name);
   elementsList.append(element);
})


function formAddSubmitHandler(evt) {
   evt.preventDefault();
   let element = createCard(linkImgInput.value, nameImgInput.value);

   elementsList.prepend(element);
   linkImgInput.value = '';
   nameImgInput.value = '';
   closePopup(popupAdd);
}


addButton.addEventListener('click', ()=>openPopup(popupAdd));
buttonCloseAdd.addEventListener('click', ()=>closePopup(popupAdd));

editButton.addEventListener('click', openEditPopup);
buttonCloseEdit.addEventListener('click', closeEditPopup);

buttonCloseImg.addEventListener('click', ()=>closePopup(popupImg));

formEditElement.addEventListener('submit', formEditSubmitHandler); 
formAddElement.addEventListener('submit', formAddSubmitHandler); 