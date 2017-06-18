import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SearchProvider } from '../../providers/search/search';

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
  searchResults: object;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public searchProvider: SearchProvider) {
    this.searchProvider = searchProvider;
    this.searchOptions = {
      type: 'movie',
    };
    this.advancedSearchResults = {
      Search: [],
    }
    this.showAdvanced = false;
  }

  showAdvancedSearch() {
    this.showAdvanced = !this.showAdvanced;
  }

  doSearch() {
    console.log(this.searchOptions);
    this.searchProvider.doSearch(this.searchOptions).subscribe((data) => {
      console.log(data);
      this.searchResults = data;
    });
  }

  advancedSearch() {
    console.log(this.searchOptions);
    if (this.searchOptions.title) {
      this.searchProvider.searchWithParams(this.searchOptions).subscribe((data) => {
        console.log(data);
        data.Search.forEach((item) => {
        })
        this.advancedSearchResults = data;
      });
      this.searchOptions = {
        type: 'movie',
      }
    } else {
      this.advancedSearchResults = [];
      this.errorMessage = "Please enter a title."
    }
  }

}
