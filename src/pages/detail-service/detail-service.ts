import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-detail-service',
  templateUrl: 'detail-service.html',
})
export class DetailServicePage {

  audit: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailServicePage');
    this.audit = this.navParams.get('infopopover');
    console.log(this.audit.detalle+' llll');
    // console.log(this.navParams.get('version'));
  }

}
