import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InformacionSoportePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-informacion-soporte',
  templateUrl: 'informacion-soporte.html',
})
export class InformacionSoportePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionSoportePage');
  }
  perfilPage(){
    this.navCtrl.push('PerfilPage');
  }

}
