import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class NotificationsProvider {
  notifications: number;
  _notificationCount: any;

  constructor(
    public http: Http,
    private angularFauth:AngularFireAuth,
    private readonly angularFirestore: AngularFirestore,
  ) {
    console.log('Hello NotificationsProvider Provider');
  }


  notificationsCount(){

    this.angularFauth.authState.subscribe( data => {
          if (data.uid){
              this._notificationCount = this.angularFirestore.collection('users' ).doc(`${data.uid}`).collection('notifications').valueChanges();
          }
    });
    // console.log(this._notificationCount);
    return this._notificationCount;

  }

}
