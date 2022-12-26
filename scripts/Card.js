export class Card {
   constructor(cardData, templateSelector, handleOpenImg) {
      this._templateSelector = templateSelector;
      this._cardLink = cardData.link;
      this._cardName = cardData.name;
      this._handleOpenImg = handleOpenImg;
   }

   generateCard() {
      this._itemElement = this._createCard();

      this._itemElementImg = this._itemElement.querySelector('.elements__image');
      this._itemElementTitle = this._itemElement.querySelector('.elements__title')
      this._itemElementLike = this._itemElement.querySelector('.elements__button-like');
      this._itemElementDelete = this._itemElement.querySelector('.elements__button-delete');

      this._itemElementImg.src = this._cardLink;
      this._itemElementImg.alt = this._cardName;
      this._itemElementTitle.textContent = this._cardName;

      this._setEventListener();

      return this._itemElement;
   }
   _createCard() {
      return document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode('true')
   }
   _setEventListener() {
      this._itemElementLike.addEventListener('click', () => this._handleLike());
      this._itemElementDelete.addEventListener('click', () => this._handleDelete());
      this._itemElementImg.addEventListener('click', () => this._openImg());
   }

   _openImg() {
      this._handleOpenImg(this._cardName, this._cardLink);
   }

   _handleDelete() {
      this._itemElement.remove();
   }

   _handleLike() {
      this._itemElementLike.classList.toggle('elements__button-like_active');
   }

}