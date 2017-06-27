import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the CollectionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CollectionProvider {
  baseUrl: string;
  user: any = {};

  constructor(public http: Http, public storage: Storage) {
    this.http = http;
    this.baseUrl = "http://mmdb-api.herokuapp.com";
    // this.baseUrl = "http://localhost:3000";
    this.user = {};
    this.fetchUser();
  }

  fetchUser() {
    return this.storage.get('user').then((data) => {
      this.user = data;
    });
  }

  fetchCollection() {
    this.fetchUser();
    return this.http.get(this.baseUrl + '/users/' + this.user._id + '/movies/collection')
      .map((res) => res.json());
  }

  fetchWishlist() {
    this.fetchUser();
    return this.http.get(this.baseUrl + '/users/' + this.user._id + '/movies/wishlist')
      .map((res) => res.json());
  }

  fetchIndividual(id) {
    return this.http.get(this.baseUrl + '/movies/searchById/' + id)
      .map((res) => res.json());
  }

  removeFromCollection(item, location) {
    this.fetchUser();
    return this.http.put(this.baseUrl + '/users/' + this.user._id + '/movie/' + item.imdbID + '/delete/' + location, {})
      .map((res) => res.json());
  }

  addToCollection(item, location) {
    this.fetchUser();
    return this.http.post(this.baseUrl + '/users/' + this.user._id + '/movie/add/' + location, item)
      .map((res) => res.json());
  }
}
