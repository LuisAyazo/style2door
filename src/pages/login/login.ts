import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

// provider
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    responseData : any;
    userData = {"username": "","password": ""};
    // var fb
    isLogged: boolean = false;
    authResponse: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider, public  menu: MenuController, private fb: Facebook, public alertCtrl: AlertController, private nativeStorage: NativeStorage ) {

    this.menu.swipeEnable(false);// deshabilita el sidemenu

  }

  // login(){
  //    this.authService.postData(this.userData,'login').then((result) => {
  //     this.responseData = result;
  //     console.log(this.responseData);
  //     localStorage.setItem('userData', JSON.stringify(this.responseData));
  //     this.navCtrl.setRoot("HomePage");
  //   }, (err) => {
  //     console.log(err);
  //   });
  //
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register(){
    this.navCtrl.setRoot('RegisterPage');
  }

  login(){
      console.log("Going Home");
      this.navCtrl.setRoot('HomePage');
  }

  loginFb(){
      let permissions = new Array<string>();
      permissions = ['public_profile', 'user_friends', 'email'];
      this.fb.getLoginStatus().then((response) => {
        if (response.status === 'connected') {
          console.log('Logged in.');
          this.navCtrl.setRoot('HomePage');
        }
        else {
          this.fb.login(permissions).then((response) => {
             let userId = response.authResponse.userID;
             let params = new Array<string>();

             this.fb.api("/me?fields=name,gender", params).then(function(profile) {
              profile.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
              this.nativeStorage.setItem('profile',
              {
                name: profile.name,
                gender: profile.gender,
                picture: profile.picture
              })
              .then(function(){
              }, function (error) {
                console.log(error);
              })
            })

            alert('Logged in Successfully!');
            alert(JSON.stringify(response.authResponse.accessToken));
            this.authResponse = response.authResponse;
            this.isLogged = true;

          }, (error) => {
            alert(error);
            console.log(error);
         });
        }
      });
  }

}
