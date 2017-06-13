import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollectionProvider } from '../../providers/collection/collection';

import { DetailsPage } from '../details/details';

/**
 * Generated class for the WatchlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-watchlist',
  templateUrl: 'watchlist.html',
})
export class WatchlistPage {
  watchlistItems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private collectionProvider: CollectionProvider) {
    this.navCtrl = navCtrl;
    this.getWatchlistItems();
  }

  ionViewWillEnter() {
    this.getWatchlistItems();
  }

  getWatchlistItems() {
    this.collectionProvider.fetchWatchlist().subscribe((data) => {
      this.watchlistItems = data;
    });
  }

  getDetails(item, location) {
    this.collectionProvider.fetchIndividual(item.Title).subscribe((data) => {
      this.navCtrl.push(DetailsPage, {data: data, location: location});
    });
  }
}
