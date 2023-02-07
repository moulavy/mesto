export default class UserInfo{
   constructor(selectorName,selectorInfo,selectorAvatar) {
      this._name = document.querySelector(selectorName);
      this._about = document.querySelector(selectorInfo);
      this._avatar = document.querySelector(selectorAvatar);
   }
   //когда данные пользователя нужно будет подставить в форму при открытии
   getUserInfo() {
      return {
         name: this._name.textContent,
         about: this._about.textContent,
         avatar: this._avatar,
         profileId:this._id
      }     
   }
   //принимает новые данные пользователя и обновляет их на странице
   setUserInfo(user) {
      this._name.textContent = user.name;
      this._about.textContent = user.about;      
      this._id = user._id;      
   }

   getUserId() {
      return this._id;
   }

   setUserAvatar(user) {
      this._avatar.src = user.avatar;
   }
}