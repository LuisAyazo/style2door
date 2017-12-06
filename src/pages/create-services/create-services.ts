import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides } from 'ionic-angular';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';


@IonicPage()
@Component({
  selector: 'page-create-services',
  templateUrl: 'create-services.html',
})
export class CreateServicesPage {

  constructor(
    public navCtrl: NavController,
    // public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    // private database: AngularFireDatabase,
    private angularFauth:AngularFireAuth,
    private readonly angularFirestore: AngularFirestore,
    public notiPro: NotificationsProvider
  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateServicesPage');
  }

}
