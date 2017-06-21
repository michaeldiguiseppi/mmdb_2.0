import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  location: string;
  arrayOfKeys: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public collectionProvider: CollectionProvider, public alertController: AlertController) {
    this.media = navParams.data.data;
    this.location = navParams.data.location;
    this.collectionProvider = collectionProvider;
    this.alertController = alertController;
    console.log(this.media);
  }

  removeFromCollection(item, location) {
    let alert = this.alertController.create({
      title: 'Remove Item',
      message: 'Are you sure you want to remove this item from your ' + location + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.collectionProvider.removeFromCollection(item, location).subscribe((res) => {
              if (res.status == 'success') {
                this.navCtrl.pop();
              } else {
                console.log(res);
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  save(media) {
    this.media = media;
    let alert = this.alertController.create({
      title: 'Save Item',
      message: 'Where would you like to save this item?',
      buttons: [
        {
          text: 'Wishlist',
          handler: () => {
            console.log("Add to Wishlist");
            console.log(this.media);
            this.collectionProvider.addToCollection(this.media, 'wishlist').subscribe((data) => {
              console.log(data);
            });
          }
        },
        {
          text: 'Collection',
          handler: (media) => {
            console.log("Add to Collection");
            console.log(this.media);
            this.collectionProvider.addToCollection(this.media, 'collection').subscribe((data) => {
              console.log(data);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
      ]
    });
    alert.present();
  }

  getRelated() {
    console.log('Getting related titles');
  }

  getStreaming() {
    console.log('Getting streaming sources');
  }
}
