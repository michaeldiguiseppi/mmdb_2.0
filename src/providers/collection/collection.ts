import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CollectionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CollectionProvider {
  baseUrl: string;

  constructor(public http: Http) {
    this.http = http;
    this.baseUrl = "http://mmdb-api.herokuapp.com";
  }

  fetchCollection() {
    return this.http.get(this.baseUrl + '/users/57460e5025db1f1100ae751a/movies/collection')
      .map((res) => res.json());
  }

  fetchWatchlist() {
    return this.http.get(this.baseUrl + '/users/57460e5025db1f1100ae751a/movies/watchlist')
      .map((res) => res.json());
  }

  fetchIndividual(title) {
    return this.http.get(this.baseUrl + '/movies/find/' + title)
      .map((res) => res.json());
  }

  removeFromCollection(item, location) {
    return this.http.put(this.baseUrl + '/users/57460e5025db1f1100ae751a/movie/' + item.imdbID + '/delete/' + location, {})
    .map((res) => res.json());
  }
}
