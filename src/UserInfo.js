export default class UserInfo{
  constructor({profileSelector, nameSelector, descriptionSelector}) {
    this._profile = document.querySelector(profileSelector);
    this._name = this._profile.querySelector(nameSelector);
    this._description = this._profile.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      'name': this._name.textContent,
      'description': this._description.textContent
    }
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

}
