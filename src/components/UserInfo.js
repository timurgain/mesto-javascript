export default class UserInfo{
  constructor({profileSelector, nameSelector, descriptionSelector, avatarSelector}) {
    this._profile = document.querySelector(profileSelector);
    this._name = this._profile.querySelector(nameSelector);
    this._description = this._profile.querySelector(descriptionSelector);
    this._avatar = this._profile.querySelector(avatarSelector);
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

  setUserAvatar(avatarUrl) {
    this._avatar.style.backgroundImage = `url('${avatarUrl}')`;
  }

}
