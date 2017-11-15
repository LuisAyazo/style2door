import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationsProvider } from '../../providers/notifications/notifications';

@IonicPage()
@Component({
  selector: 'page-notifications-detail',
  templateUrl: 'notifications-detail.html',
})
export class NotificationsDetailPage {
  id: string;
  title: any;
  body: any;
  datetime: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notiPro: NotificationsProvider
  ) {
     this.id = navParams.get('notificationId');
     this.title = navParams.get('title');
     this.body = navParams.get('body');
     this.datetime = navParams.get('datetime');
    //  console.log(this.id, title, body, datetime);

  }

  ionViewDidLoad() {
    // console.log(this.id);
    console.log('ionViewDidLoad NotificationsDetailPage');
    this.notiPro.updateNotificationView(this.id);
  }



}
