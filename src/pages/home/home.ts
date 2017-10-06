import { Component } from '@angular/core';
import { NavController,AlertController, ModalController, IonicPage, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  })
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private fb: Facebook,
    public alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    public toastCtrl: ToastController,
    public modalCtrl:ModalController,
    private angularFauth:AngularFireAuth
  ) {
  //   this.angularFauth.auth.currentUser.providerData.forEach(function (profile) {
  //   console.log("Sign-in provider: "+profile.providerId);
  //   console.log("  Provider-specific UID: "+profile.uid);
  //   console.log("  Name: "+profile.displayName);
  //   console.log("  Email: "+profile.email);
  //   console.log("  Photo URL: "+profile.photoURL);
  // });

  }

  perfilPage(){
    this.navCtrl.push('PerfilPage');
  }

  expressService(){
    this.navCtrl.push('ExpressServicePage');
  }

  ionViewDidLoad(){

    // this.angularFauth.authState.subscribe(data =>{
    //   if(data && data.email && data.uid && data.emailVerified==true){
    //     this.toastCtrl.create({
    //       message: `Bienvenidos a Style2Door, ${data.email}`,
    //       duration: 3000
    //     }).present();
    //   }
    //   else{
    //     this.navCtrl.setRoot('LoginPage');
    //     // this.toastCtrl.create({
    //     //   message: `NO se ha logeado correctamente`,
    //     //   duration: 3000
    //     // }).present();
    //   }
    // })
  }

}
