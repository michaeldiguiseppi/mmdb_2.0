import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchlistPage } from './watchlist';

@NgModule({
  declarations: [
    WatchlistPage,
  ],
  imports: [
    IonicPageModule.forChild(WatchlistPage),
  ],
  exports: [
    WatchlistPage
  ]
})
export class WatchlistPageModule {}
