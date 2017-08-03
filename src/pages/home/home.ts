import { Component } from '@angular/core';
import { NavController,AlertController, ModalController, IonicPage } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { NativeStorage } from '@ionic-native/native-storage';

import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  })
export class HomePage {

 isLogged: boolean = false;
 authResponse: any;

  constructor(public navCtrl: NavController, private fb: Facebook, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public modalCtrl:ModalController ) {}

  loginFb(){
    let permissions = new Array<string>();
    // let nav = this.navCtrl;
    permissions = ['public_profile', 'user_friends', 'email'];

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

    getCurrentUserProfile() {
      this.nativeStorage.getItem('profile')
        .then(
          data => alert(JSON.stringify(data)),
          error => alert(JSON.stringify(error))
        );
    }


    getDetails() {
       var self = this;
      this.fb.getLoginStatus().then((response) => {
        if(response.status == 'connected') {
          this.fb.api('/' + response.authResponse.userID + '?fields=id,name,gender',[]).then((response)=>{
            alert(JSON.stringify(response));

            let addModal = self.modalCtrl.create(ListPage);
            addModal.present();
          }, (error) => {
            alert(error);
          })
        }
        else {
          alert('Logged in Failed');
        }
      })
    }

}
