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

  // User
  getUserMe() {
    this._options.method = 'GET';
    return fetch(`${this._baseUrl}/users/me`, this._options)
            .then(response => this._convertResponseToJson(response))
  }

  patchUserMe(name, about) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({
      name: name,
      about: about
    })
    return fetch(`${this._baseUrl}/users/me`, this._options)
            .then(response => this._convertResponseToJson(response))
  }

  patchUserMeAvatar(url) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({
      avatar: url
    })
    return fetch(`${this._baseUrl}/users/me/avatar`, this._options)
            .then(response => this._convertResponseToJson(response))
  }

  // Cards
  getCards() {
    this._options.method = 'GET';
    return fetch(`${this._baseUrl}/cards`, this._options)
            .then(response => this._convertResponseToJson(response))
  }

  postCard(link, name) {
    this._options.method = 'POST';
    this._options.body = JSON.stringify({
      name: name,
      link: link
    })
    return fetch(`${this._baseUrl}/cards`, this._options)
            .then(response => this._convertResponseToJson(response))
  }

  deleteCard(cardId) {
    this._options.method = 'DELETE';
    return fetch(`${this._baseUrl}/cards/${cardId}`, this._options)
            .then(response => this._convertResponseToJson(response))
  }

  // Likes
  putLike(cardId) {
    this._options.method = 'PUT';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, this._options)
            .then(response => this._convertResponseToJson(response))
  }

  deleteLike(cardId) {
    this._options.method = 'DELETE';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, this._options)
            .then(response => this._convertResponseToJson(response))
  }

  _convertResponseToJson(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

}
