import { Component } from '@angular/core';
import { NavController,AlertController, ModalController, IonicPage } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  })
export class HomePage {
  constructor(public navCtrl: NavController, private fb: Facebook, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public modalCtrl:ModalController ) {}

  perfilPage(){
    this.navCtrl.push('PerfilPage');
  }

  expressService(){
    this.navCtrl.push('ExpressServicePage');
  }

}
