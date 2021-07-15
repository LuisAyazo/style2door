import { Component } from '@angular/core';
import { IonicPage, Platform, AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
// import { FCM } from '@ionic-native/fcm';
// import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { NotificationsProvider } from '../../providers/notifications/notifications';
// import { Observable } from 'rxjs/Observable';

// declare var FCMPlugin: any;
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifications: number = 1;
  notificationData: any;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    //  public firebasecm: FCM,
     public viewCtrl: ViewController,
     public alert: AlertController,
     private platfrom: Platform,
    //  private angularFauth:AngularFireAuth,
     private readonly angularFirestore: AngularFirestore,
     public notiPro: NotificationsProvider

   ) {



    // tomar toda la data de las notificaciones
    this.notiPro.getNotificationsData().subscribe(data =>{this.notificationData = data});

    // var date = new Date();
    // console.log(date.toLocaleString());
    // var day = date.getDate();
    // var monthIndex = date.getMonth()+1;
    // var year = date.getFullYear();
    // var minutes = date.getMinutes();
    // var hours = date.getHours();
    // var seconds = date.getSeconds();
    // console.log(day);
    // console.log(monthIndex);
    // console.log(year);
    // console.log(minutes);
    // console.log(hours);
    // console.log(seconds);
    //


    // var signal = {[ 'data':
    //   {signal_received: "signal_received"},
    //   'datetime': {datetime: date.toLocaleString()}
    // }

    // this.angularFauth.authState.subscribe( data => {
    //
    //     if(data.uid){
    //
    //       this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('notifications').doc("signal_received.payload.title").set(signal)
    //       .then(function() {
    //           console.log("Document successfully seteado! ");
    //       }).catch(function(error) {
    //           console.error(error);
    //       });
    //
    //     }
    // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }
  // enviar el mensaje clickeado a la pagina del detalle con mejor vista
  notificationsDetail(msg){
    // console.log(msg);
    this.navCtrl.push('NotificationsDetailPage', {
      datetime: msg.datetime,
      title: msg.signal_received.payload.title,
      body: msg.signal_received.payload.body,
      notificationId: msg.signal_received.payload.notificationID
    });
  }

  /**** Quitar modal y volver a la lista ****/
   dismiss() {
     console.log(this.navCtrl.canGoBack());
     if(this.navCtrl.canGoBack()){
       this.viewCtrl.dismiss();
     }else{
       this.navCtrl.setRoot('TabsHomePage');
     }
    //  else{
    //  }
   }

}
