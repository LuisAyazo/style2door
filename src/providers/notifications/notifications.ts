import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationsProvider {
  notifications: number;
  _notifications: any = null;
  _notificationCount: any;
  a: boolean =  true;
  authState: any = null;
  todo: Observable<any>;


  constructor(
    public http: Http,
    public angularFauth:AngularFireAuth,
    public angularFirestore: AngularFirestore,
  ) {
    console.log('Hello NotificationsProvider Provider');
    this.angularFauth.authState.subscribe( data => {
          this.authState = data;
    });
  }

  get authenticated():boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }


  getNotificationsData(): any{
    return this.todo = this.angularFirestore.collection('users').doc(this.currentUserId).collection('notifications').valueChanges();
  }

  updateNotificationView(notificationId): any{
    return this.angularFirestore.collection('users').doc(this.currentUserId).collection('notifications').doc(notificationId).update({
        "view": true
    });
  }

  getCurrentNotificationNoView(){
    try{
      return this.angularFirestore.collection('users').doc(this.currentUserId).collection('notifications', ref => ref.where("view", "==", false)).valueChanges();
    }
    catch(e){
      // alert(e);
      return null
    }

  }







  //  notificationsCount(){
  //   if(this.getNotifications){
  //
  //      return this.getNotificationsData;
  //     //  return this.getNotifications(this.currentUserId);
  //
  //   }
  //
  //
  // }

}
