export default class Section {
  constructor({renderer, containerSelector, currentUserId}) {
    this._renderer = renderer;  // функция, создает и отрисовывает данные на странице
    this._container = document.querySelector(containerSelector);
    this._currentUserId = currentUserId;
    this.cacheServerData = []
  }

  addItem(item, itemforCache, where='append') {
    if (where === 'prepend') {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    };
    this.cacheServerData.push(itemforCache);
  }

  addItemsArray(items) {
    items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element, item);
    })
  }

}
