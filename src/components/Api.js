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
            about: data.about
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
 
}

