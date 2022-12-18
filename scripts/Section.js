export default class Section {
  constructor({items, renderer}, containerSelector, ) {
    this._items = items;  // массив, который добавить в контейер
    this._renderer = renderer;  // функция, создает и отрисовывает данные на странице
    this._container = document.querySelector(containerSelector);
  }

  addItem(item, where='append') {
    if (where === 'prepend') {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    };
  }

  renderItems() {
    this._items.forEach(item => {
      const element = this._renderer(item);
      this.addItem(element);
    })
  }

}
