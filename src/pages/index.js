import './index.css';

import { Api } from '../components/Api.js'
import { Card } from '../components/Card.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { cardsContainerSelector, buttonOpenProfilePopup, buttonOpenCardPopup, buttonOpenAvatarPopup, settingsValidate } from '../utils/constans.js'


const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
   headers: {
      authorization: '38bff190-d9e4-489d-92fd-14576c2befb7',
      'Content-Type': 'application/json'
   }
}); 

/*получаем данные с сервера(данные профиля и массив карточек)*/
Promise.all([api.getUserInfo(), api.getInitialCards()])
   .then(([resUser, resCards]) => {
      userInfo.setUserInfo(resUser); 
      userInfo.setUserAvatar(resUser);      
      cardList.renderItems(resCards);           
   })
   .catch((err) => {
      console.log(err);
   });

/*добавление карточки из формы*/
function addFormSubmitCallback(data) {     
   addPopupWithForm.setButtonText('Создание...');
   api.addNewCard(data)
      .then((res) => {
         const card = createCard(res);
         cardList.addItem(card.generateCard());         
      })
      .catch((err) => {
         console.log(err);
      })
      .finally(() => {
         addPopupWithForm.close();
         addPopupWithForm.setButtonText('Создать');
      });    
}

/*редактирование данных профиля*/
function editFormSubmitCallback(data) {
   editPopupWithForm.setButtonText('Сохранение...');
   api.updateUserInfo(data)
      .then((res) => {
         userInfo.setUserInfo(res);         
      })
      .catch((err) => {
         console.log(err);
      })
      .finally(() => {
         editPopupWithForm.close();
         editPopupWithForm.setButtonText('Сохранить');
      });

}

/*обновление аватара*/
function avatarFormSubmitCallback(data) {
   avatarPopupWithForm.setButtonText('Сохранение...');
   api.updateAvatar(data)
      .then((res) => {
         userInfo.setUserAvatar(res);         
      })
      .catch((err) => {
         console.log(err);
      })
      .finally(() => {
         avatarPopupWithForm.close();
         avatarPopupWithForm.setButtonText('Сохранить');
      })
}

function createCard(data) {   
   const card = new Card(data, '#elements__element', userInfo.getUserId(), imagePopup.open.bind(imagePopup), 
      {
         handleDeleteCard: () => {
            confirmPopup.open();
            confirmPopup.handlerSubmit(data._id, () => {
               confirmPopup.setButtonText('Удаление...');
               api.deleteCard(data._id)
                  .then(() => {
                     card.deleteCard();                     
                  })
                  .catch((err) => {
                     console.log(err)
                  })
                  .finally(() => {                    
                     confirmPopup.close();
                     confirmPopup.setButtonText('Да');
                  })                  
            })
         },
         handleLikeCard: () => {
            if (card.isLiked()) {
               api.deleteLike(data._id)
                  .then((res) => {
                     card.updateLikes(res.likes);
                  })
                  .catch((err) => {
                     console.log(err)
                  })
            }
            else {
               api.addLike(data._id)
                  .then((res) => {
                     card.updateLikes(res.likes);
                  })
                  .catch((err) => {
                     console.log(err)
                  })
            }
         }

   });
   return card;
}

/*валидация, ошибки*/
function enableFormsValidation(config) {
   const formArray = Array.from(document.querySelectorAll(config.formSelector));
   formArray.forEach((formElement) => {
      const form = new FormValidator(settingsValidate, formElement);
      form.enableValidation();
   })
}

const addPopupWithForm = new PopupWithForm('.popup-add', addFormSubmitCallback);
addPopupWithForm.setEventListeners();

const editPopupWithForm = new PopupWithForm('.popup-edit', editFormSubmitCallback);
editPopupWithForm.setEventListeners();

const avatarPopupWithForm = new PopupWithForm('.popup-avatar', avatarFormSubmitCallback);
avatarPopupWithForm.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__description','.profile__avatar');

const imagePopup = new PopupWithImage('.popup-img');
imagePopup.setEventListeners();

const confirmPopup = new PopupWithConfirmation('.popup-confirm');
confirmPopup.setEventListeners();

const cardList = new Section({   
   renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
   },
}, cardsContainerSelector);

enableFormsValidation(settingsValidate);

buttonOpenCardPopup.addEventListener('click', addPopupWithForm.open.bind(addPopupWithForm));
buttonOpenProfilePopup.addEventListener('click', () => {
   const userData = userInfo.getUserInfo();
   editPopupWithForm.setInputValues(userData);   
   editPopupWithForm.open();
});
buttonOpenAvatarPopup.addEventListener('click', avatarPopupWithForm.open.bind(avatarPopupWithForm));

