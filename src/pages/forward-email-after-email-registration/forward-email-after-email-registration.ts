import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ForwardEmailAfterEmailRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forward-email-after-email-registration',
  templateUrl: 'forward-email-after-email-registration.html',
})
export class ForwardEmailAfterEmailRegistrationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForwardEmailAfterEmailRegistrationPage');
  }

  go_emailLogin(){
    this.navCtrl.setRoot('EmailLoginPage');
  }
  resendConfirmationEmail(){
    alert('Correo de confirmacion enviado!');
  }
  go_Login(){
    this.navCtrl.setRoot('LoginPage');
  }
}
