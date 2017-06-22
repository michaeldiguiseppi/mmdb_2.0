import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { CollectionPage } from '../pages/collection/collection';
import { RandomPage } from '../pages/random/random';
import { ScanPage } from '../pages/scan/scan';
import { SearchPage } from '../pages/search/search';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MMDB_v2 {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage, private alertCtrl: AlertController, private authProvider: AuthProvider, public keyboard: Keyboard) {
    this.alertCtrl = alertCtrl;
    this.authProvider = authProvider;
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Search', component: SearchPage },
      { title: 'Collection', component: CollectionPage },
      { title: 'Wishlist', component: WishlistPage },
      { title: 'Random', component: RandomPage },
      { title: 'Settings', component: SettingsPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboard.hideKeyboardAccessoryBar(false);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  presentLogout() { ///<-- call this function straight with static button in html
    let alert = this.alertCtrl.create({
      title: 'Confirm Log Out',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Log Out',
          handler: () => {
            console.log('Logged out');
            this.authProvider.logout();
          }
        }
      ]
    });
    alert.present();
  }
}
