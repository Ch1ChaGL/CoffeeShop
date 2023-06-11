import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);

    // Получение данных из localStorage
    const storedBasket = localStorage.getItem('basket');
    this.basket = storedBasket ? JSON.parse(storedBasket) : [];
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get getRole() {
    return this.user.RoleId;
  }
  get getbasket() {
    return this.basket;
  }
  addToBasket(product, Count) {
    const existingProductIndex = this.basket.findIndex(
      item => item.ProductId === product.ProductId,
    );

    if (existingProductIndex !== -1) {
      // Если продукт уже есть в корзине, обновляем его количество
      this.basket[existingProductIndex].Count += Count;
    } else {
      // Если продукта нет в корзине, добавляем его
      this.basket.push({ ...product, Count });
    }
    this.saveBasketToLocalStorage();
  }
  deleteFromBasketById(ProductId) {
    console.log('this.basket');
    console.log(this.getbasket);
    this.basket = this.basket.filter(item => item.ProductId !== ProductId);
    this.saveBasketToLocalStorage();
  }
  deleteFromBasket() {
    this.basket = [];
    this.saveBasketToLocalStorage();
  }

  updateBasket(product, Count) {
    console.log(this);
    this.basket = this.basket.map(item => {
      console.log(Count);
      console.log(item);
      console.log(item.ProductId);
      console.log(product.ProductId);
      if (item.ProductId === product.ProductId) {
        return { ...product, Count };
      }
      return item;
    });
    console.log(this.basket);
    this.saveBasketToLocalStorage();
  }

  saveBasketToLocalStorage() {
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }
}
