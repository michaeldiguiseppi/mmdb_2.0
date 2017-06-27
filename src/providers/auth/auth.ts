import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  baseUrl: string;
  public token: any;
  public user: any;

  constructor(public http: Http, private storage: Storage, public events: Events) {
    this.http = http;
    this.storage = storage;
    this.events = events;
    this.baseUrl = "http://mmdb-api.herokuapp.com";
  }

  register(userData) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.baseUrl + '/auth/register', JSON.stringify(userData), {headers: headers})
        .subscribe((res) => {
          let data = res.json();
          this.token = data.message.token;
          this.storage.set('token', data.message.token);
          this.storage.set('user', data.message.user);
          this.events.publish('user:register');
          resolve(data.message);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(userData) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.baseUrl + '/auth/login', JSON.stringify(userData), { headers: headers })
        .subscribe((res) => {
          let data = res.json();
          this.token = data.message.token;
          this.storage.set('token', data.message.token);
          this.storage.set('user', data.message.user);
          this.events.publish('user:login');
          resolve(data.message);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() {
    this.storage.set('user', '');
    this.storage.set('token', '');
    this.events.publish('user:logout');
  }

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get('user').then((value) => {
      return value ? true : false;
    });
  };
}
