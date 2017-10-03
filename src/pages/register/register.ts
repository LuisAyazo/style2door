import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angularFauth:AngularFireAuth
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goBack() {
    console.log("Going back");
    this.navCtrl.push('LoginPage');
  }

  conntinue(){
    console.log("Going Home");
    this.navCtrl.setRoot('TabsHomePage');
  }

  async register(user: User){

    console.log(user.email + ' ----- ' + user.password);
    try{
      const result = await this.angularFauth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    }
    catch(e){
      console.error(e);
    }
  }
}
