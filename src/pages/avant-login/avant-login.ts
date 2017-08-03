import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AvantLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-avant-login',
  templateUrl: 'avant-login.html',
})
export class AvantLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvantLoginPage');
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

  login(){
      console.log("Going Home");
      this.navCtrl.push('HomePage');
    }

}
