export default class UserInfo{
  constructor({profileSelector, nameSelector, descriptionSelector}) {
    this._profile = document.querySelector(profileSelector);
    this._name = this._profile.querySelector(nameSelector);
    this._description = this._profile.querySelector(descriptionSelector);
  }

  setUserInfo(name, description, userId) {
    this._name.textContent = name;
    this._description.textContent = description;
    this._userId = userId;
  }

  getUserInfo() {
    return {
      'name': this._name.textContent,
      'description': this._description.textContent,
      'id': this._userId
    }
  }

}
