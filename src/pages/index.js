import './index.css';

import { Card } from '../components/Card.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { cardsContainerSelector, buttonOpenProfilePopup, buttonOpenCardPopup, settingsValidate, initialCards } from '../utils/constans.js'

function createCard(data) {
   const cardElement = new Card(data, '#elements__element', imagePopup.open.bind(imagePopup));
   return cardElement;
}

function addFormSubmitCallback (data) {   
   const card = createCard(data);
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
      const card = createCard(item);
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


