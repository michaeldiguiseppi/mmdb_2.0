import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CollectionProvider } from '../../providers/collection/collection';
import { Storage } from '@ionic/storage';

import { WishlistPage } from '../../pages/wishlist/wishlist';
import { CollectionPage } from '../../pages/collection/collection';



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
  location: string;
  arrayOfKeys: string[];
  showSaveButtons: boolean;
  showRemoveButtons: boolean;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public collectionProvider: CollectionProvider, public alertController: AlertController, public storage: Storage) {
    this.media = navParams.data.data;
    this.location = navParams.data.location;
    this.collectionProvider = collectionProvider;
    this.alertController = alertController;
    this.storage = storage;
    this.storage.get('user').then((data) => {
      if (data._id) {
        this.user = data;
      }
    });
  }

  showRemoveButtonsHandler() {
    this.showRemoveButtons = !this.showRemoveButtons;
  }

  removeFromCollection(item, location) {
    this.collectionProvider.removeFromCollection(item, location).subscribe((res) => {
      this.navCtrl.pop();
    });
  }

  showSaveButtonsHandler() {
    this.showSaveButtons = !this.showSaveButtons;
  }

  save(media, location) {
    this.collectionProvider.addToCollection(media, location).subscribe((data) => {
      let page = (location == 'collection' ? CollectionPage : WishlistPage );
      this.navCtrl.setRoot(page).then(() => {
        this.navCtrl.push(DetailsPage, { data: media, location: location })
      });
    });
  }

  getRelated() {
    console.log('Getting related titles');
  }

  getStreaming() {
    console.log('Getting streaming sources');
  }
}
