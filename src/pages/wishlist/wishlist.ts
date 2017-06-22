import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CollectionProvider } from '../../providers/collection/collection';
import { AuthProvider } from '../../providers/auth/auth';

import { DetailsPage } from '../details/details';

/**
 * Generated class for the WishlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  searchTerm: any = '';
  wishlistItems: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private collectionProvider: CollectionProvider, public authProvider: AuthProvider) {
    this.navCtrl = navCtrl;
    this.getWishlistItems();
  }

  ionViewWillEnter() {
    this.getWishlistItems();
  }

  // ionViewCanEnter(): boolean {
  //   console.log(this.user);
  //   if (this.user.email) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getWishlistItems() {
    this.collectionProvider.fetchWishlist().subscribe((data) => {
      this.wishlistItems = data;
      this.wishlistItems.sort((prev, curr) => {
        return (prev.Title > curr.Title) ? 1 : -1;
      });
    });
  }

  getDetails(item, location) {
    this.collectionProvider.fetchIndividual(item.Title).subscribe((data) => {
      this.navCtrl.push(DetailsPage, {data: data, location: location});
    });
  }

  setFilteredItems(ev) {
    this.searchTerm = ev.target.value;
  }

  removeItem(item, location) {
    this.collectionProvider.removeFromCollection(item, location).subscribe((res) => {
      this.getWishlistItems();
    });
  }
}
