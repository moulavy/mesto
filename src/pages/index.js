import './index.css';

import { Card } from '../components/Card.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { settingsValidate, initialCards } from '../utils/constans.js'

const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const formEditElement = document.querySelector('.popup-edit__container');
const nameInput = formEditElement.querySelector('.popup__input_value_name');
const jobInput = formEditElement.querySelector('.popup__input_value_description');
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const cardsContainerSelector = '.elements__list';

function addFormSubmitCallback (data) {   
   const card = new Card(data, '#elements__element', imagePopup.open.bind(imagePopup));
   cardList.addItem(card.generateCard());
   addPopupWithForm.close();  
}

const addPopupWithForm = new PopupWithForm('.popup-add', addFormSubmitCallback);
addPopupWithForm.setEventListeners();

function editFormSubmitCallback(data) {   
   userInfo.setUserInfo(data);
   editPopupWithForm.close();   
}
const editPopupWithForm = new PopupWithForm('.popup-edit', editFormSubmitCallback);
editPopupWithForm.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__description');

const imagePopup = new PopupWithImage('.popup-img');
imagePopup.setEventListeners();

const cardList = new Section({
   items: initialCards,
   renderer: (item) => {
      const card = new Card(item, '#elements__element', imagePopup.open.bind(imagePopup))
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
   },
}, cardsContainerSelector);

cardList.renderItems();

function enableFormsValidation(config) {
   const formArray = Array.from(document.querySelectorAll(config.formSelector));
   formArray.forEach((formElement) => {
      const form = new FormValidator(settingsValidate, formElement);
      form.enableValidation();
   })
}

enableFormsValidation(settingsValidate);

buttonOpenCardPopup.addEventListener('click', addPopupWithForm.open.bind(addPopupWithForm));
buttonOpenProfilePopup.addEventListener('click', () => {
   const userData = userInfo.getUserInfo();
   editPopupWithForm.setInputValues(userData);   
   editPopupWithForm.open();
});


