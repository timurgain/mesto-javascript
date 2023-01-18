export default class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._options = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'authorization': token,
      }
    }
  }

  // методы возвращают промисы

  // User
  getUserMe() {
    this._options.method = 'GET';
    return fetch(`${this._baseUrl}/users/me`, this._options)
  }

  patchUserMe(name, about) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({
      name: name,
      about: about
    })
    return fetch(`${this._baseUrl}/users/me`, this._options)
  }

  // Cards
  getCards() {
    this._options.method = 'GET';
    return fetch(`${this._baseUrl}/cards`, this._options)
  }

  postCard(link, name) {
    this._options.method = 'POST';
    this._options.body = JSON.stringify({
      name: name,
      link: link
    })
    return fetch(`${this._baseUrl}/cards`, this._options)
  }

  deleteCard(cardId) {
    this._options.method = 'DELETE';
    return fetch(`${this._baseUrl}/cards/${cardId}`, this._options);
  }

  // Likes
  putLike(cardId) {
    this._options.method = 'PUT';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, this._options);
  }

  deleteLike(cardId) {
    this._options.method = 'DELETE';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, this._options);
  }

}
