import { Component } from '@angular/core';
import { NavController,AlertController, ModalController, IonicPage, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { NotificationsProvider } from '../../providers/notifications/notifications';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  })
export class HomePage {



  notifications: number = 0;

  // 2 definiciones para el splash
  // splash: boolean = true;
  // tabBarElement: any;
  _notifications: number = 0;


  constructor(
    public navCtrl: NavController,
    private fb: Facebook,
    public alertCtrl: AlertController,
    // private nativeStorage: NativeStorage,
    public toastCtrl: ToastController,
    public modalCtrl:ModalController,
    private angularFauth:AngularFireAuth,
    private angularFirestore: AngularFirestore,
    public notiPro: NotificationsProvider
  ) {
    // alert(e);



    // this.notiPro.getCurrentNotificationNoView().subscribe(data => { this._notifications = data.length});
    // this.angularFauth.authState.subscribe( data => {
      // conso
        // if(data.uid){

            // this.postsCol = this.afs.collection('posts', ref => ref.where('title', '==', 'coursetro'));


            // this.notifications = this.angularFirestore.collection('users').doc('V0fww9n18nhJjdPih40GQJZ15fh2')
            // .collection('notifications', ref => ref.where("view", "==", true)).valueChanges();
            // console.log(fer.length);
            // let query = fer.where("view", "==", true).get()
            //             .then(snapshot => {
            //                 snapshot.forEach(doc => {
            //                     console.log(doc.id, '=>', doc.data());
            //                 });
            //             })
            //             .catch(err => {
            //                 console.log('Error getting documents', err);
            //             });
            // .doc('d5b9f593-f145-46d3-890d-e7bf3ec9c89c').where("capital", "==", true);
    //     }
    // });
    //
  //   this.angularFauth.auth.currentUser.providerData.forEach(function (profile) {
  //   console.log("Sign-in provider: "+profile.providerId);
  //   console.log("  Provider-specific UID: "+profile.uid);
  //   console.log("  Name: "+profile.displayName);
  //   console.log("  Email: "+profile.email);
  //   console.log("  Photo URL: "+profile.photoURL);
  // });
    // this.tabBarElement = document.querySelector('.tabbar');
    // this.sp.pay();
  }

  // perfilPage(){
  //   this.navCtrl.push('PerfilPage');
  // }
  //
  // expressService(){
  //   this.navCtrl.push('ExpressServicePage');
  // }

  // ionViewDidLoad(){
  //   this.tabBarElement.style.display = 'none';
  //   setTimeout(()=>{
  //       this.splash = false;
  //       this.tabBarElement.style.display = 'flex';
  //     }, 4000);
  // }



  ionViewDidLoad(){
    // Notificaciones no vistas
    if(this.notiPro.getCurrentNotificationNoView() !== null){
      this.notiPro.getCurrentNotificationNoView().subscribe(data => {this._notifications = data.length });
    }
  }

}
