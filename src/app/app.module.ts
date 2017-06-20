import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';


import { MMDB_v2 } from './app.component';
import { CollectionPage } from '../pages/collection/collection';
import { RandomPage } from '../pages/random/random';
import { ScanPage } from '../pages/scan/scan';
import { SearchPage } from '../pages/search/search';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DetailsPage } from '../pages/details/details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CollectionProvider } from '../providers/collection/collection';
import { SearchProvider } from '../providers/search/search';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MMDB_v2,
    CollectionPage,
    RandomPage,
    ScanPage,
    SearchPage,
    WishlistPage,
    SettingsPage,
    RegisterPage,
    LoginPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MMDB_v2),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MMDB_v2,
    CollectionPage,
    RandomPage,
    ScanPage,
    SearchPage,
    WishlistPage,
    SettingsPage,
    RegisterPage,
    LoginPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CollectionProvider,
    SearchProvider,
    AuthProvider
  ]
})
export class AppModule {}
