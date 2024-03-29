import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CollectionProvider } from '../../providers/collection/collection';

import { DetailsPage } from '../details/details';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
/**
 * Generated class for the CollectionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html',
})
export class CollectionPage {
  collectionItems: any = [];
  searchTerm: string = '';
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private collectionProvider: CollectionProvider, private authProvider: AuthProvider, public storage: Storage) {
    this.navCtrl = navCtrl;
    this.authProvider = authProvider;
  }

  ionViewWillEnter() {
    this.collectionProvider.fetchUser().then((data) => {
      this.getCollection();
    });
  }

  getCollection() {
    this.collectionProvider.fetchCollection().subscribe((data) => {
      this.collectionItems = data;
      this.collectionItems.sort((prev, curr) => {
        return (prev.Title > curr.Title) ? 1 : -1;
      });
    }, (err) => {
      console.log(err);
      this.collectionItems = [];
    });
  }

  getDetails(item, location) {
    this.collectionProvider.fetchIndividual(item.imdbID).subscribe((data) => {
      this.navCtrl.push(DetailsPage, {data: data, location: location});
    });
  }

  setFilteredItems(ev) {
    this.searchTerm = ev.target.value.toLowerCase();
  }

  removeItem(item, location) {
    this.collectionProvider.removeFromCollection(item, location).subscribe((res) => {
      this.getCollection();
    });
  }
}
