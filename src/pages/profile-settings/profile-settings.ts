import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angularFauth:AngularFireAuth,
    private readonly angularFirestore: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
    this.angularFauth.authState.subscribe( data => {
        if(data.uid){
            this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('client_profile').valueChanges()
            .subscribe(profile =>{
              console.log(profile);
            });
        }

    });
  }






}
