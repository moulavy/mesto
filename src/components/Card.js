export class Card {
   constructor(cardData, templateSelector, userId, handleOpenImg, { handleDeleteCard, handleLikeCard}) {
      this._templateSelector = templateSelector;
      this._cardData = cardData;
      this._cardLink = cardData.link;
      this._cardName = cardData.name; 
      this._userId = userId;
      this._handleOpenImg = handleOpenImg;       
      this._handleDeleteCard = handleDeleteCard; 
      this._handleLikeCard = handleLikeCard;
   }
   

   generateCard() {
      this._itemElement = this._createCard();

      this._itemElementImg = this._itemElement.querySelector('.elements__image');
      this._itemElementTitle = this._itemElement.querySelector('.elements__title')
      this._itemElementLike = this._itemElement.querySelector('.elements__button-heart');
      this._itemElementLikeCounter = this._itemElement.querySelector('.elements__like-counter');
      this._itemElementDelete = this._itemElement.querySelector('.elements__button-delete');
      

      this._itemElementImg.src = this._cardLink;
      this._itemElementImg.alt = this._cardName;
      this._itemElementTitle.textContent = this._cardName;
      this._itemElementLikeCounter.textContent = this._cardData.likes.length;

      if (this._userId != this._cardData.owner._id) {
         this._itemElementDelete.classList.add('elements__button-delete_disabled');
      }

      if (this.isLiked()) {
         this._itemElementLike.classList.add('elements__button-heart_active');
      }

      this._setEventListener();

      return this._itemElement;
   }
   _createCard() {
      return document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode('true')
   }
   _setEventListener() {
      this._itemElementLike.addEventListener('click', () => this._handleLikeCard());
      this._itemElementDelete.addEventListener('click', () => this._handleDeleteCard());
      this._itemElementImg.addEventListener('click', () => this._openImg());
   }

   _openImg() {
      this._handleOpenImg(this._cardName, this._cardLink);
   }

   deleteCard() {     
      this._itemElement.remove();      
   }
   
   isLiked() {
      if (this._cardData.likes.find((item) => item._id === this._userId)) {
         return true
      }
   }

   updateLikes(arrayLikes) {
      this._cardData.likes = arrayLikes;
      this._itemElementLikeCounter.textContent = this._cardData.likes.length;
      if (this.isLiked()) {
         this._itemElementLike.classList.add('elements__button-heart_active');
      }
      else {
         this._itemElementLike.classList.remove('elements__button-heart_active');
      }
   }

   // _handleLike() {
   //    this._itemElementLike.classList.toggle('elements__button-heart_active');
      
   // }

}