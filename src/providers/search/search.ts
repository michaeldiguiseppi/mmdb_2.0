import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchProvider {
  baseUrl: string;

  constructor(public http: Http) {
    this.http = http;
    // this.baseUrl = "http://mmdb-api.herokuapp.com";
    this.baseUrl = 'http://localhost:3000';
  }

  doSearch(query) {
    return this.http.get(this.baseUrl + '/movies/find/' + query.title)
      .map((res) => res.json());
  }

  searchWithParams(params) {
    params.year = params.year || '';
    params.type = params.type || '';
    return this.http.get(this.baseUrl + '/movies/search/' + params.title + '/' + params.type + '/' + params.year)
      .map((res) => res.json());
  }

  getDetails(id) {
    return this.http.get(this.baseUrl + '/movies/searchById/' + id)
      .map((res) => res.json());
  }

}
