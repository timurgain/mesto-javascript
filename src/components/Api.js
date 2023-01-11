

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

  fetchUserMe() {
    this._options.headers.method = 'GET';
    return fetch(`${this._baseUrl}/users/me`, this._options)
  }

}
