import { Card } from './Card.js'
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import { FormValidator } from './FormValidator.js';
import { settingsValidate, initialCards } from './constans.js'


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
//export const popupImg = document.querySelector('.popup-img');
//export const photoPopup = document.querySelector('.popup-img__photo');
//export const titleImgPopup = document.querySelector('.popup-img__subtitle');

/*вывод карточек из массива на страницу*/
const cardsContainerSelector = '.elements__list';
const cardTemplate = document.querySelector('#elements__element').content;

const cardFormAdd = popupAdd.querySelector('.popup__container');
const cardFormEdit = popupEdit.querySelector('.popup__container');

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

export function openPopup(popup) {
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', closeByEsc);
}

function openEditPopup() {
   cardFormEdit.reset();
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
   openPopup(popupEdit);
}

function openAddPopup() {
   cardFormAdd.reset();
   openPopup(popupAdd);
}

function handleProfileFormSubmit(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;
   closePopup(popupEdit);
}

const imagePopup = new PopupWithImage('.popup-img');

const cardList = new Section({
   items: initialCards,
   renderer: (item) => {
      const card = new Card(item, '#elements__element', imagePopup.open.bind(imagePopup))
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
   },
}, cardsContainerSelector);

cardList.renderItems();

function handleCardFormSubmit(evt) {
   evt.preventDefault();
   const data = {
      name: nameImgInput.value,
      link: linkImgInput.value
   };

   const card = new Card(data, '#elements__element', imagePopup.open.bind(imagePopup));
   cardList.addItem(card.generateCard());
   closePopup(popupAdd);
}

function enableFormsValidation(config) {
   const formArray = Array.from(document.querySelectorAll(config.formSelector));
   formArray.forEach((formElement) => {
      const form = new FormValidator(settingsValidate, formElement);
      form.enableValidation();
   })
}

enableFormsValidation(settingsValidate);

buttonOpenCardPopup.addEventListener('click', openAddPopup);
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd));

popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);


buttonOpenProfilePopup.addEventListener('click', openEditPopup);
buttonCloseEdit.addEventListener('click', () => closePopup(popupEdit));
imagePopup.setEventListeners();


formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleCardFormSubmit);

