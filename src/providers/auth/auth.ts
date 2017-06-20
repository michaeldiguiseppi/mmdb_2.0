import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { LoginPage } from '../../pages/login/login';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  baseUrl: string;

  constructor(public http: Http, private storage: Storage) {
    this.http = http;
    this.storage = storage;
    this.baseUrl = "http://mmdb-api.herokuapp.com";
  }

  login(userData) {
    return this.http.post(this.baseUrl + '/auth/login', { email: userData.email, password: userData.password })
      .map((res) => res.json());
  }

  logout() {
    this.storage.remove('user');
    this.storage.remove('token');
  }

  register(userData) {
    return this.http.post(this.baseUrl + '/auth/register', userData)
      .map((res) => res.json());
  }

  setUserInfo(userData) {
    this.storage.set('user', JSON.stringify(userData.message.user));
    this.storage.set('token', JSON.stringify(userData.message.token));
  }

  getUserInfo() {
    return this.storage.get('user');
  }

}
