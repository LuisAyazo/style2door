import { Component } from '@angular/core';
import { IonicPage, Platform, AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
// import { FCM } from '@ionic-native/fcm';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';

// declare var FCMPlugin: any;
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifications: number;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    //  public firebasecm: FCM,
     public viewCtrl: ViewController,
     public alert: AlertController,
     private platfrom: Platform,
     private angularFauth:AngularFireAuth,
     private readonly angularFirestore: AngularFirestore,
   ) {




    var date = new Date();
    console.log(date.toLocaleString());
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    console.log(day);
    console.log(monthIndex);
    console.log(year);
    console.log(minutes);
    console.log(hours);
    console.log(seconds);
    var date = new Date();
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

  /**** Quitar modal y volver a la lista ****/
   dismiss() {
     if(this.navCtrl.canGoBack() == false){
      this.navCtrl.setRoot('TabsHomePage');
     }else{
       this.viewCtrl.dismiss();
     }
   }

}
