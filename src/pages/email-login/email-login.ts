import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController  } from 'ionic-angular';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-email-login',
  templateUrl: 'email-login.html',
})
export class EmailLoginPage {
  user = {} as User;
  public msgToast: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private angularFauth:AngularFireAuth
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailLoginPage');
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

  forgotPassword(){
    this.navCtrl.push("ForgotPasswordPage");
  }
  async login(user: User){

    // console.log(user.email + ' ----- ' + user.password);
    try{
      const result = await this.angularFauth.auth.signInWithEmailAndPassword(user.email, user.password);
      // console.log(result);
      if(result.uid){
        // console.log(result);
        // console.log(result.emailVerified);
        if(result.emailVerified == true){
          this.navCtrl.setRoot('TabsHomePage');
        }
        else{
          alert('Por favor verifique su correo electronico!');
        }
      }
    }
    catch(error){
      console.error(error);
      console.log(error.code)
      if (error.code == 'auth/user-not-found'){
        // alert('User not found');
        this.msgToast = "Usuario no registrado en el sistema.";
        //FormLogin.username = '';
      }
      if (error.code == 'auth/invalid-email'){
        // alert('User not found');
        this.msgToast = "El correo esta mal formateado!";
        //FormLogin.username = '';
      }

      if (error.code == 'auth/wrong-password'){
        // alert('User not found');
        this.msgToast = "Contrasena Errada!";
        //FormLogin.username = '';
      }

      let toast = this.toastCtrl.create({
        message: this.msgToast,
        duration: 3500
      })
      toast.present();
    }
  }

}
