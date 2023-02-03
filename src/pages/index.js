import './index.css';

import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { cardsContainerSelector, buttonOpenProfilePopup, buttonOpenCardPopup, settingsValidate, initialCards } from '../utils/constans.js'

const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
   headers: {
      authorization: '38bff190-d9e4-489d-92fd-14576c2befb7',
      'Content-Type': 'application/json'
   }
}); 
/*получаем данные с сервера*/
Promise.all([api.getUserInfo(), api.getInitialCards()])
   .then(([resUser, resCards]) => {
      userInfo.setUserInfo(resUser); 
      userInfo.setUserAvatar(resUser);
      const cardList = new Section({
         items: resCards,
         renderer: (item) => {
            const card = createCard(item);
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
         },
      }, cardsContainerSelector);
      cardList.renderItems();
   })
   .catch((err) => {
      console.log(err);
   });



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
   api.updateUserInfo(data)
      .then((res) => {
         console.log(res);
         userInfo.setUserInfo(data);
      })
   editPopupWithForm.close();   
}
const editPopupWithForm = new PopupWithForm('.popup-edit', editFormSubmitCallback);
editPopupWithForm.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__description','.profile__avatar');

const imagePopup = new PopupWithImage('.popup-img');
imagePopup.setEventListeners();



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


