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
            .catch(err => reportError(err))
  }

  patchUserMe(name, about) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({
      name: name,
      about: about
    })
    return fetch(`${this._baseUrl}/users/me`, this._options)
            .then(response => this._convertResponseToJson(response))
            .catch(err => reportError(err))
  }

  patchUserMeAvatar(url) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({
      avatar: url
    })
    return fetch(`${this._baseUrl}/users/me/avatar`, this._options)
            .then(response => this._convertResponseToJson(response))
            .catch(err => reportError(err))
  }

  // Cards
  getCards() {
    this._options.method = 'GET';
    return fetch(`${this._baseUrl}/cards`, this._options)
            .then(response => this._convertResponseToJson(response))
            .catch(err => reportError(err))
  }

  postCard(link, name) {
    this._options.method = 'POST';
    this._options.body = JSON.stringify({
      name: name,
      link: link
    })
    return fetch(`${this._baseUrl}/cards`, this._options)
            .then(response => this._convertResponseToJson(response))
            .catch(err => reportError(err))
  }

  deleteCard(cardId) {
    this._options.method = 'DELETE';
    return fetch(`${this._baseUrl}/cards/${cardId}`, this._options)
            .then(response => this._convertResponseToJson(response))
            .catch(err => reportError(err))
  }

  // Likes
  putLike(cardId) {
    this._options.method = 'PUT';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, this._options)
            .then(response => this._convertResponseToJson(response))
            .catch(err => reportError(err))
  }

  deleteLike(cardId) {
    this._options.method = 'DELETE';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, this._options)
            .then(response => this._convertResponseToJson(response))
            .catch(err => reportError(err))
  }

  // other
  _checkResponseOk(response) {
    if (!response.ok) {throw new Error('HTTP status code is not OK')};
  }

  _convertResponseToJson(response) {
    this._checkResponseOk(response);
    return response.json();
  }

}
