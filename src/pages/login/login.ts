import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    responseData : any;
    // userData = {"username": "","password": ""};
    public userData;
    // var fb
    public msgToast: string;
    public loader;
    isLoggedIn: boolean = false;
    authResponse: any;
    // apiBaseUrl: string = "http://style2door.com/ws/api.php";
    posts: any;
    user = {} as User;
    // private profileCollection: AngularFirestoreCollection<any>;
    private profileCollection: Observable<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public  menu: MenuController,
    public fb: Facebook,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private angularFauth:AngularFireAuth,
    private readonly angularFirestore: AngularFirestore
  ) {

    this.menu.swipeEnable(false);// deshabilita el sidemenu

  }


  loginEmail(){
    this.navCtrl.push('EmailLoginPage');
  }

  ionViewDidLoad(){
    // console.log('ionViewDidLoad LoginPage');
  }


  condiciones(){
    this.navCtrl.push('TerminosCondicionesPage');
  }


  // Login con Firebase y Facebook
  loginFB(){
    let permissions = new Array<string>();
    permissions = ['public_profile', 'user_friends', 'email'];
    this.fb.login(permissions).then((response: FacebookLoginResponse) => {
      let credentials =  firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(credentials).then((data) =>{
              // console.log(data);
              // crear perfil despues del primer login
              // this.profileCollection =
              this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('client_profile').valueChanges()
              .subscribe((profile_action)=>{
                if(profile_action.length === 0 ){
                  console.log("NO Existe y creamos el profile");
                  this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('client_profile')
                  .doc(`${data.displayName}`).set({
                    uid: data.uid,
                    displayName: data.displayName,
                    photo: data.photoURL,
                    emai: data.email,
                    // provider: data.providerIdn
                  })
                  .then(function() {
                      console.log("profile creado correctamente! ");
                  }).catch(function(error) {
                      alert(error);
                  });
                }
              });
              // console.log(this.profileCollection);
              // alert("DE DPMDESSSSSSSSS "+JSON.stringify(info));
              this.navCtrl.setRoot('TabsHomePage');
            }).catch((error)=>{
              console.log(error);
              alert(error);
            })
        //
    })

  }

}
