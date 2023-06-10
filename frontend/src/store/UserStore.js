import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this.basket = [];
    makeAutoObservable(this);
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
  addToBasket(ProductId, Count) {}
  deleteFromBasket(ProductId, Count) {}
  updateBasket(ProductId, Count) {}
}
