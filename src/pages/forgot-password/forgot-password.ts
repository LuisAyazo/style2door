import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  user = {} as User;
  email: string;
  public msgToast: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angularFauth:AngularFireAuth,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  resetPassword(user: User){
    // this.email = this.email;
    console.log(this.user.email);
    this.angularFauth.auth.sendPasswordResetEmail(this.user.email).then(success => {
          //console.log('email sent', success);
          console.log(success);
          alert("Se ha enviado un link a tu direccion de correo electronico para recuperar la contraseña");
          this.navCtrl.setRoot("EmailLoginPage");
        }, (error) => {
          //console.log('error sending email',error);
          console.error(error);
          console.log(error.code)
          if (error.code == 'auth/user-not-found'){
            this.msgToast = "Este correo no se encuentra registrado en el sistema";
          }
          if (error.code == 'auth/email-already-in-use'){
            this.msgToast = "El correo ya esta registrado en el sistema!";
          }
          if (error.code == 'auth/argument-error'){
            this.msgToast = "Por favor ingrese su correo";
          }
          if (error.code == 'auth/invalid-email'){
            this.msgToast = "Por favor ingrese su correo correctamente";
          }
          let toast = this.toastCtrl.create({
            message: this.msgToast,
            duration: 3500
          })
          toast.present();
        });
  }

  go_emailLogin(){
    this.navCtrl.setRoot("EmailLoginPage");
  }

}
