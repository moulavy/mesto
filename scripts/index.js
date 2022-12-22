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

const cardFormAdd = popupAdd.querySelector('.popup__container');
const cardFormEdit = popupEdit.querySelector('.popup__container');



function restartError(popup) {
   const inputArray = Array.from(popup.querySelectorAll(".popup__input"));
   inputArray.forEach((inputElement) => {
      const errorElement = popup.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove("popup__input_type_error");
      errorElement.textContent = '';
   })
}

function closePopup(popup) {  
   popup.classList.remove('popup_opened');  
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
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', closeByEsc);   
}

function openEditPopup() {
   restartError(popupEdit);
   cardFormEdit.reset();
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;  
   openPopup(popupEdit);
}

function openAddPopup() {
   restartError(popupAdd);   
   cardFormAdd.reset();
   openPopup(popupAdd);
}

function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;   
   closePopup(popupEdit);
}

class Card{
   constructor(card,cardTemplate){
      this._cardTemplate = cardTemplate;
      this._cardLink = card.link;
      this._cardName = card.name;

      this._itemElement = this._cardTemplate.cloneNode(true);
      this._itemElementLi = this._itemElement.querySelector('.elements__element');
      this._itemElementImg = this._itemElement.querySelector('.elements__image');
      this._itemElementTitle = this._itemElement.querySelector('.elements__title')
      this._itemElementLike = this._itemElement.querySelector('.elements__button-like');
      this._itemElementDelete = this._itemElement.querySelector('.elements__button-delete');

      

      this._itemElementImg.src = this._cardLink;
      this._itemElementImg.alt = this._cardName;
      this._itemElementTitle.textContent = this._cardName;
   }
/*getTemplate
   _getTemplate(){
      const itemElement = document.querySelector(this._templateSelector).content.cloneNode(true);
      const itemElementLi = itemElement.querySelector('.elements__element');
      const itemElementImg = itemElement.querySelector('.elements__image');
      const itemElementTitle = itemElement.querySelector('.elements__title')
      const itemElementLike = itemElement.querySelector('.elements__button-like');
      const itemElementDelete = itemElement.querySelector('.elements__button-delete');

      itemElementImg.src = this._cardLink;
      itemElementImg.alt = this._cardName;
      itemElementTitle.textContent = this._cardName;

      return itemElement;
   }
   */
   generateCard(){      
      this._setEventListener();
      return this._itemElement;
   }

   _setEventListener(){
      this._itemElementLike.addEventListener('click',()=> this._handleLike());
      this._itemElementDelete.addEventListener('click',()=> this._handleDelete());
      this._itemElementImg.addEventListener('click',()=> this._openImg());
   }

   _openImg() {
      openPopup(popupImg);
      titleImgPopup.textContent = this._cardName;
      photoPopup.src = this._cardLink;
      photoPopup.alt = this._cardName;
   }

   _handleDelete() {
      this._itemElementLi.remove();
   }

   _handleLike() {
      this._itemElementLike.classList.toggle('elements__button-like_active');
   } 
   
}

/*createCard
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
   
   function handleDelete() {
      itemElementLi.remove();
   }
   function handleLike() {
      itemElementLike.classList.toggle('elements__button-like_active');
   }

   itemElementLike.addEventListener('click', handleLike);
   itemElementDelete.addEventListener('click', handleDelete);
   itemElementImg.addEventListener('click', openImg);

   return itemElement;
}
*/
function renderCard(cardItem, container) {
   const card = new Card(cardItem, cardTemplate);  
   
   container.prepend(card.generateCard());
}

function handleCardFormSubmit(evt) {
   evt.preventDefault();
   const data = {};
   data.name = nameImgInput.value;
   data.link = linkImgInput.value;
   renderCard(data,cardsContainer);   
   closePopup(popupAdd);     
}

/*создание карточек из массива*/
initialCards.forEach((cardItem) => {
   renderCard(cardItem, cardsContainer)
});


buttonOpenCardPopup.addEventListener('click', openAddPopup);
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd));

popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);
popupImg.addEventListener('click', closePopupOverlay);

buttonOpenProfilePopup.addEventListener('click', openEditPopup);
buttonCloseEdit.addEventListener('click', () => closePopup(popupEdit));

buttonCloseImg.addEventListener('click', () => closePopup(popupImg));

formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleCardFormSubmit);

