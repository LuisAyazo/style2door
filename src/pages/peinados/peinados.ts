import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PeinadosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-peinados',
  templateUrl: 'peinados.html',
})
export class PeinadosPage {

  itemMP: Array<{id: any, title: string, checked: any, description: string, value: any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.itemMP = [
          { id:1, title: 'Sexy waves', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '30.000'},
          { id:2, title: 'Up-do', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '13.800' },
          { id:3, title: 'Hollywood diva', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '19.000' },
          { id:4, title: 'Blower', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '26.600' },
          // { id:5, title: 'Pedicure semi permanente', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '11.000' },
          // { id:6, title: 'Cambio de manos y pies', checked: false, description: 'Esmaltes de alta duración con brillos de última tecnología que hacen tu manicure mucho más duradero', value: '35.000' }

        ];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeinadosPage');
  }

}
