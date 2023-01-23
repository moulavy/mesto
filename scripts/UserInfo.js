export default class UserInfo{
   constructor(selectorName,selectorInfo) {
      this._name = document.querySelector(selectorName);
      this._info = document.querySelector(selectorInfo);
   }
   //когда данные пользователя нужно будет подставить в форму при открытии
   getUserInfo() {
      return {
         profileName: this._name.textContent,
         profileDescription: this._info.textContent
      }
     
   }
   //принимает новые данные пользователя и обновляет их на странице
   setUserInfo(user) {
      this._name.textContent = user.name;
      this._info.textContent = user.description;
   }
}