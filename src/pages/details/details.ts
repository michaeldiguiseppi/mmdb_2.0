import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CollectionProvider } from '../../providers/collection/collection';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  media: object;
  arrayOfKeys: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public collectionProvider: CollectionProvider) {
    this.media = navParams.data;
    this.collectionProvider = collectionProvider;
    console.log(this.media)
  }

  removeFromCollection(item) {
    this.collectionProvider.removeFromCollection(item, 'collection').subscribe((res) => {
      console.log(res);
      if (res.status == 'success') {
        this.navCtrl.pop();
      }
    });
  }
}
