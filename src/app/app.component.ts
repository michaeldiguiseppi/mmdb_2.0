import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CollectionPage } from '../pages/collection/collection';
import { RandomPage } from '../pages/random/random';
import { ScanPage } from '../pages/scan/scan';
import { SearchPage } from '../pages/search/search';
import { WatchlistPage } from '../pages/watchlist/watchlist';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CollectionPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Collection', component: CollectionPage },
      { title: 'Watchlist', component: WatchlistPage },
      { title: 'Random', component: RandomPage },
      { title: 'Scan', component: ScanPage },
      { title: 'Search', component: SearchPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
