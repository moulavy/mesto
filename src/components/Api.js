export class Api {
   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, { 
         headers: this._headers
      })
      .then(res => {
            if (res.ok) {
               return res.json();
            }
      
         return Promise.reject(`Ошибка: ${res.status}`);
      })
   }

   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         headers: this._headers
      })
         .then(res => {
            if (res.ok) {
               return res.json();
            }
            
            return Promise.reject(`Ошибка: ${res.status}`);
         });
   }

   updateUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            about: data.about,            
         })
      })
            .then(res => {
               if (res.ok) {
                  return res.json();
               }
               return Promise.reject(`Ошибка: ${res.status}`);
            });
   }

   updateAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            avatar: data.avatar,            
         })
      })
         .then(res => {
            if (res.ok) {
               return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
         });
   }

   addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            link: data.link
         })
      })
         .then(res => {
            if (res.ok) {
               return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
         });
   }

   deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
         method: 'DELETE',
         headers: this._headers         
      })
         .then(res => {
            if (res.ok) {
               return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
         });
   }

   addLike(idCard) {
      return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
         method: 'PUT',
         headers: this._headers
      })
         .then((res) => {
            if (res.ok) {               
               return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
      })
   }

   deleteLike(idCard) {
      return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
         method: 'DELETE',
         headers: this._headers
      })
         .then(res => {
            if (res.ok) {
               return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
         })
   }
  
}

