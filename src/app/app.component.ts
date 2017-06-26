import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events, MenuController } from 'ionic-angular';
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

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MMDB_v2 {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  loggedIn: any;

  loggedInPages: PageInterface[] = [
    { title: 'Search', name: 'SearchPage', component: SearchPage, icon: 'ios-search' },
    { title: 'Collection', name: 'CollectionPage', component: CollectionPage, icon: 'briefcase' },
    { title: 'Wishlist', name: 'WishlistPage', component: WishlistPage, icon: 'ios-list' },
    { title: 'Random', name: 'RandomPage', component: RandomPage, icon: 'help' },
    { title: 'Settings', name: 'SettingsPage', component: SettingsPage, icon: 'settings' },
    { title: 'Logout', name: 'LoginPage', component: LoginPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Search', name: 'SearchPage', component: SearchPage, icon: 'ios-search' },
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Register', name: 'RegisterPage', component: RegisterPage, icon: 'person-add' }
  ];

  constructor
    (
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      private storage: Storage,
      private alertCtrl: AlertController,
      private authProvider: AuthProvider,
      public keyboard: Keyboard,
      public events: Events,
      public menu: MenuController
    ) {
    this.alertCtrl = alertCtrl;
    this.authProvider = authProvider;
    this.initializeApp();
    this.storage = storage;
    this.loggedIn = true;
    this.events = events;
    this.menu = menu;

    this.authProvider.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();


    // this.storage.get('token').then((data) => {
    //   if (data) {
    //     this.loggedIn = true;
    //   } else {
    //     this.loggedIn = false;
    //   }
    // });

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Search', component: SearchPage },
    //   { title: 'Collection', component: CollectionPage },
    //   { title: 'Wishlist', component: WishlistPage },
    //   { title: 'Random', component: RandomPage },
    //   { title: 'Settings', component: SettingsPage },
    // ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.events.subscribe('user:logged_in', (data) => {
        console.log(data);
        if (data.user._id) {
          this.loggedIn = true;
        }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboard.hideKeyboardAccessoryBar(false);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    if (page.logsOut === true) {
      this.authProvider.logout();
    }
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  // logout() { ///<-- call this function straight with static button in html
  //   this.authProvider.logout();
  //   this.nav.setRoot(LoginPage);
  // }
}
