import { popupImg, openPopup, titleImgPopup, photoPopup } from './index.js';
export class Card {
   constructor(card, cardTemplate) {
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

   generateCard() {
      this._setEventListener();
      return this._itemElement;
   }

   _setEventListener() {
      this._itemElementLike.addEventListener('click', () => this._handleLike());
      this._itemElementDelete.addEventListener('click', () => this._handleDelete());
      this._itemElementImg.addEventListener('click', () => this._openImg());
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