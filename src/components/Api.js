import { checkResponseOk } from './utils.js'

// 'к async await стоит привыкать и начинасть использовать? например вместо fetch'
// 'как дебажиться с настроенным вебпаком'
// 'как хранить секреты на фронтенде'

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

  getCards() {
    this._options.method = 'GET';
    return fetch(`${this._baseUrl}/cards`, this._options)
  }

}
