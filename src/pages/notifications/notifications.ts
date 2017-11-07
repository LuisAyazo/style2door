import { Component } from '@angular/core';
import { IonicPage, Platform, AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';

declare var FCMPlugin: any;
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public firebasecm: FCM,
     public viewCtrl: ViewController,
     public alert: AlertController,
     private platfrom: Platform
   ) {
     this.onNotification();
  }

async onNotification(){
  try{
    await this.platfrom.ready();

    this.firebasecm.onNotification().subscribe(data=>{
      if(data.wasTapped){
        alert("Received in background");
      } else {
        alert("Received in foreground");
      };
    })

    // this.firebasecm.onNotification((data)=>{
    //   this.alert.create({
    //     message: data.message
    //   }).present();
    // },(result) => alert(result));
  }
  catch(error){
    alert(error);
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
      // this.firebasecm.subscribeToTopic('marketing').then(prueba=>{alert(prueba)});
      // this.firebasecm.getToken().then(token=>{
      //   // backend.registerToken(token);
      //   alert(token);
      // }).catch(error => {alert(error)});
      // FCMPlugin.getToken(
      //   function(token){
      //     alert(token);
      //   },
      //   function(err){
      //     console.log('error retrieving token: ' + err);
      //   }
      // )
  }

  /**** Quitar modal y volver a la lista ****/
   dismiss() {
     this.viewCtrl.dismiss();
   }


 // this.firebasecm.getToken().then(token=>{
 //   backend.registerToken(token);
 // })
 //
 // firebasecm.onNotification().subscribe(data=>{
 //   if(data.wasTapped){
 //     console.log("Received in background");
 //   } else {
 //     console.log("Received in foreground");
 //   };
 // })
 //
 // firebasecm.onTokenRefresh().subscribe(token=>{
 //   backend.registerToken(token);
 // })
 //
 // firebasecm.unsubscribeFromTopic('marketing');



}
