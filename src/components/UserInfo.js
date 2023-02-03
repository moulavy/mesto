export default class UserInfo{
   constructor(selectorName,selectorInfo,selectorAvatar) {
      this._name = document.querySelector(selectorName);
      this._info = document.querySelector(selectorInfo);
      this._avatar = document.querySelector(selectorAvatar);
   }
   //когда данные пользователя нужно будет подставить в форму при открытии
   getUserInfo() {
      return {
         profileName: this._name.textContent,
         profileDescription: this._info.textContent,
         profileAvatar: this._avatar,
         profileId:this._id
      }     
   }
   //принимает новые данные пользователя и обновляет их на странице
   setUserInfo(user) {
      this._name.textContent = user.name;
      this._info.textContent = user.about;
      this._avatar.src = user.avatar;
      this._id = user._id;      
   }

   setUserAvatar(user) {
      this._avatar.src = user.avatar;
   }
}