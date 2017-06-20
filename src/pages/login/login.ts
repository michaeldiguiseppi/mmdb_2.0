import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../pages/register/register';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submitLogin() {
    console.log('Form: ', this.user)
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
