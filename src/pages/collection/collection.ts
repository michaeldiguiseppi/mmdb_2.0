import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollectionProvider } from '../../providers/collection/collection';

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
    this.getCollection();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectionPage');
  }

  getCollection() {
    this.collectionProvider.fetchCollection().subscribe((data) => {
      this.collectionItems = data;
    });
  }

}
