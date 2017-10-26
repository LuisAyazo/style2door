import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ToastController, LoadingController } from 'ionic-angular';
// import { Http, Response } from '@angular/http';
// provider
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
// import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

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
    apiBaseUrl: string = "http://style2door.com/ws/api.php";
    posts: any;
    user = {} as User;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthServiceProvider,
    public  menu: MenuController,
    public fb: Facebook,
    public alertCtrl: AlertController,
    // private nativeStorage: NativeStorage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private angularFauth:AngularFireAuth
    // public http: Http
  ) {

    this.menu.swipeEnable(false);// deshabilita el sidemenu

  }


  loginEmail(){
    this.navCtrl.push('EmailLoginPage');
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
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
      firebase.auth().signInWithCredential(credentials).then((info) =>{
              // alert("DE DPMDESSSSSSSSS "+JSON.stringify(info));
              this.navCtrl.setRoot('TabsHomePage');
            }).catch((error)=>{
              console.log(error);
              alert(error);
            })
        //
    })

}


  loginFb(){
      let permissions = new Array<string>();
      permissions = ['public_profile', 'user_friends', 'email'];
      // this.fb.getLoginStatus().then((response) => {
        // if (response.status === 'connected') {
        //   console.log('Already Logged in.');
        //   this.navCtrl.setRoot('HomePage');
        // }
        // else {
          this.fb.login(permissions).then((response: FacebookLoginResponse) => {
             let userId = response.authResponse.userID;
             let params = new Array<string>();

             // console.log(JSON.stringify(response.authResponse.accessToken));
            if (response.authResponse.accessToken){
              console.log("si hay token");

            }// if response.authResponse.accessToken
            else{
              console.log("nada de nada");
            }

            this.fb.api("me?fields=id,cover,name,first_name,last_name,email,age_range,link,gender,locale,picture,timezone,updated_time,verified", params)
            .then((profile) => {

            //  this.fb.api("me?fields=id,cover,name,first_name,last_name,email,age_range,link,gender,locale,picture,timezone,updated_time,verified,birthday,about,education,devices", params).then(function(profile) {
              // this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
              profile.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
// var algo = "mensaje de prueba"

                this.userData = JSON.stringify({
                api_username : "appv1",
                api_password: "76QNBOblSP",
                api_task: "user_register",
                facebook_id: profile['id'],
                cover: profile['cover']['source'],
                name: profile['name'],
                first_name: profile['first_name'],
                last_name: profile['last_name'],
                email: profile['email'],
                age_range:  profile['age_range']['min'],
                link: profile['link'],
                gender: profile['gender'],
                locale: profile['locale'],
                picture: profile.picture,
                timezone: profile['timezone'],
                updated_time: profile['updated_time'],
                verified: profile['verified']
              });

              // console.log(userData);



              window.localStorage.setItem("facebook_profile", JSON.stringify(profile)); // Almacenar datos del facebook en el localStorage
              // Muestra mensaje con loader al momento de autenticar
              this.loader = this.loadingCtrl.create({
                  content: "Autenticando...!",
                  dismissOnPageChange: true
                  //duration: 3000    });
                });
              this.loader.present();
              this.auth.loginAuth(this.userData).subscribe(data => {
                // console.log("proandoooooo "+JSON.stringify(this.userData));
                console.log("retorno de la base de datos ->>> "+JSON.stringify(data));
                this.navCtrl.setRoot("TabsHomePage", {}, {animate: true, direction: 'forward'});
              }, err =>{
                  this.msgToast = err;
                  //FormLogin.username = '';
                  let toast = this.toastCtrl.create({
                    message: this.msgToast,
                    duration: 3500
                  })
                  toast.present();
                }, () => {
                  console.log('getData completed');
                })//FIN auth
            })



          }, (error) => {
            console.log(error);
            alert(JSON.stringify(error));
            // console.log(JSON.stringify(error));
         });
      //  }
      // });
  }

}
