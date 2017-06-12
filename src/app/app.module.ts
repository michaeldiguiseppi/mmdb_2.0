import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CollectionPage } from '../pages/collection/collection';
import { RandomPage } from '../pages/random/random';
import { ScanPage } from '../pages/scan/scan';
import { SearchPage } from '../pages/search/search';
import { WatchlistPage } from '../pages/watchlist/watchlist';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DetailsPage } from '../pages/details/details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CollectionProvider } from '../providers/collection/collection';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CollectionPage,
    RandomPage,
    ScanPage,
    SearchPage,
    WatchlistPage,
    SettingsPage,
    RegisterPage,
    LoginPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CollectionPage,
    RandomPage,
    ScanPage,
    SearchPage,
    WatchlistPage,
    SettingsPage,
    RegisterPage,
    LoginPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CollectionProvider
  ]
})
export class AppModule {}
