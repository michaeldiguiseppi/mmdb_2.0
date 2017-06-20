import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SearchProvider } from '../../providers/search/search';
import { DetailsPage } from '../details/details';


/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchOptions: any;
  showAdvanced: boolean;
  advancedSearchResults: object;
  errorMessage: any;
  lastSearch: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public searchProvider: SearchProvider) {
    this.searchProvider = searchProvider;
    this.searchOptions = {
      type: 'movie',
    };
    this.errorMessage = {};
    this.advancedSearchResults = {
      Search: [],
    }
    this.showAdvanced = false;
  }

  showAdvancedSearch() {
    this.showAdvanced = !this.showAdvanced;
  }

  doSearch() {
    this.searchProvider.doSearch(this.searchOptions).subscribe((data) => {
      this.navCtrl.push(DetailsPage, {data: data, location: 'Search'});
      this.searchOptions = {
        type: 'movie',
      };
      this.errorMessage = {};
    },
    (err) => {
      let errors = JSON.parse(err._body);
      this.errorMessage = errors;
    });
  }

  advancedSearch() {
    // if (this.searchOptions.title) {
      this.searchProvider.searchWithParams(this.searchOptions).subscribe((data) => {
        console.log(data);
        if (data.Error) {
          this.errorMessage = {
            status: 'danger',
            data: 'No results found. Please try again.'
          }
          return this.errorMessage;
        }
        data.Search.forEach((item) => {
        })
        this.advancedSearchResults = data;
        this.errorMessage = {};
      },
      (err) => {
        let errors = JSON.parse(err._body);
        this.errorMessage = errors;
      });
      this.lastSearch = this.searchOptions.title;
  }

  getDetails(result) {
    if (result.imdbID) {
      this.searchProvider.getDetails(result.imdbID).subscribe((data) => {
        this.navCtrl.push(DetailsPage, {data: data, location: 'Search'});
      });
    }
  }

}
