import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollectionProvider } from '../../providers/collection/collection';

import { DetailsPage } from '../details/details';

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
  collectionItems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private collectionProvider: CollectionProvider) {
    this.navCtrl = navCtrl;
    this.getCollection();
  }

ionViewWillEnter() {
  this.getCollection();
}

  getCollection() {
    this.collectionProvider.fetchCollection().subscribe((data) => {
      this.collectionItems = data;
      this.collectionItems.sort((prev, curr) => {
        return (prev.Title > curr.Title) ? 1 : -1;
      });
    });
  }

  getDetails(item) {
    this.collectionProvider.fetchIndividual(item.Title).subscribe((data) => {
      this.navCtrl.push(DetailsPage, data);
    });
  }
}
