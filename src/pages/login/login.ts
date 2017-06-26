import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { RegisterPage } from '../register/register';
import { CollectionPage } from '../collection/collection';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: object;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, private storage: Storage, public events: Events) {
    this.user = {};
    this.authProvider = authProvider;
    this.storage = storage;
    this.errorMessage = {};
    this.events = events;
  }

  ionViewDidLoad() {
    this.storage.get('token').then((data) => {
      if (data) {
        console.log("Authorized");
        this.navCtrl.setRoot(CollectionPage);
      } else {
        console.log("Unauthorized");
      }
    });
  }

  login() {
    this.authProvider.login(this.user).then((data) => {
        this.navCtrl.setRoot(CollectionPage);
        this.errorMessage = {};
    },
    (err) => {
      this.errorMessage = {
        status: 'danger',
        data: 'Invalid credentials. Please try again.'
      }
    });
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
