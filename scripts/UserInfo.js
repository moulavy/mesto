export default class UserInfo{
   constructor(selectorName,selectorInfo) {
      this._name = document.querySelector(selectorName);
      this._info = document.querySelector(selectorInfo);
   }
   getUserInfo() {
      const user ={
         profileName: this._name.textContent,
         profileDescription: this._info.textContent
      }
      return user;
   }
   setUserInfo(user) {
      this._name.textContent = user.name;
      this._info = user.job;
   }
}