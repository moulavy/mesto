/*для edit*/
let buttonCloseEdit = document.querySelector('.popup-edit__button-close');
let popupEdit = document.querySelector('.popup-edit');
let editButton = document.querySelector('.profile__edit-button');
let formEditElement = document.querySelector('.popup-edit__container');
let nameInput = formEditElement.querySelector('.popup__input_value_name');
let jobInput = formEditElement.querySelector('.popup__input_value_description');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

/*для add*/
let buttonCloseAdd = document.querySelector('.popup-add__button-close');
let popupAdd = document.querySelector('.popup-add');
let addButton = document.querySelector('.profile__add-button');
let formAddElement = document.querySelector('.popup-add__container');
let nameImgInput = formAddElement.querySelector('.popup__input_value_name-img');
let linkImgInput = formAddElement.querySelector('.popup__input_value_link-img');

/*для popup-img*/
let buttonCloseImg = document.querySelector('.popup-img__button-close');
let popupImg = document.querySelector('.popup-img');
let buttonImg = document.querySelector('elements__button-img');
let photoPopup = document.querySelector('.popup-img__photo');
let titleImgPopup = document.querySelector('.popup-img__subtitle');
let popupImgContainer = document.querySelector('.popup-img__container');



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


/*вывод карточек из массива на страницу*/
const elementsList = document.querySelector('.elements__list');
const templateElements = document.querySelector('#elements__element').content;

initialCards.forEach(function (cardItem) {
   const itemElement = templateElements.cloneNode(true);
   const itemElementLi = itemElement.querySelector('.elements__element');
   const itemElementImg = itemElement.querySelector('.elements__image');
   const itemElementName = itemElement.querySelector('.elements__title');
   const itemElementLike = itemElement.querySelector('.elements__button-like');
   const itemElementDelete = itemElement.querySelector('.elements__button-delete');

   itemElementImg.src = cardItem.link;
   itemElementName.textContent = cardItem.name;  
   
   /*обработчик лайка для карточек из массива*/
   itemElementLike.addEventListener('click', function(){
      itemElementLike.classList.toggle('elements__button-like_active');
   });
   itemElementDelete.addEventListener('click', function () {
      itemElementLi.remove();
   });

   function openImgPopup() {
      openPopup(popupImg);      
      titleImgPopup.textContent = itemElementName.textContent;
      photoPopup.src = itemElementImg.src;
      
   }

   itemElementImg.addEventListener('click', openImgPopup);

   elementsList.append(itemElement);
      
})
 

function formAddSubmitHandler(evt) {
   evt.preventDefault();  
   let itemElement = templateElements.cloneNode(true);
   const itemElementLi = itemElement.querySelector('.elements__element');
   let itemElementName = itemElement.querySelector('elements__title');
   let itemElementImg = itemElement.querySelector('.elements__image');
   itemElement.querySelector('.elements__image').src = linkImgInput.value;
   itemElement.querySelector('.elements__title').textContent = nameImgInput.value;
   
   const itemElementLike = itemElement.querySelector('.elements__button-like');
   const itemElementDelete = itemElement.querySelector('.elements__button-delete');
   
   /*добавление в массив новой карточки*/
   const newElement = {};
   newElement.name = nameImgInput.value;
   newElement.link = linkImgInput.value;
   initialCards.push(newElement);
  
   /*обработчик лайка для карточек, добавленных со страницы*/
   itemElementLike.addEventListener('click', function () {
      itemElementLike.classList.toggle('elements__button-like_active');
   });
   
   itemElementDelete.addEventListener('click', function () {
      itemElementLi.remove();
   });

   function openImgPopup() {
       
      openPopup(popupImg);
      titleImgPopup.textContent = nameImgInput.value;
      photoPopup.src = linkImgInput.value;
   }
  

   elementsList.prepend(itemElement);
   linkImgInput.value = '';
   nameImgInput.value = '';
   closePopup(popupAdd);
}

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


addButton.addEventListener('click', ()=>openPopup(popupAdd));
buttonCloseAdd.addEventListener('click', ()=>closePopup(popupAdd));

editButton.addEventListener('click', openEditPopup);
buttonCloseEdit.addEventListener('click', closeEditPopup);

buttonCloseImg.addEventListener('click', ()=>closePopup(popupImg));

formEditElement.addEventListener('submit', formEditSubmitHandler); 
formAddElement.addEventListener('submit', formAddSubmitHandler); 