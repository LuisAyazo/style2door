import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  public msgToast: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angularFauth:AngularFireAuth,
    public toastCtrl: ToastController,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goBack() {
    console.log("Going back");
    this.navCtrl.push('LoginPage');
  }

  condiciones(){
    this.navCtrl.push('TerminosCondicionesPage');
  }

  conntinue(){
    console.log("Going Home");
    this.navCtrl.setRoot('TabsHomePage');
  }

  sendEmailVerification() {
    this.angularFauth.authState.subscribe(user => {
        user.sendEmailVerification().then(() => {
        console.log('Correo de confirmacion enviado, Por favor revisar su bandeja de entrada');
        this.navCtrl.setRoot('ForwardEmailAfterEmailRegistrationPage');
          // this.msgToast = "Correo de confirmacion enviado, Por favor revisar su bandeja de entrada";
          // let toast = this.toastCtrl.create({
          //   message: this.msgToast,
          //   duration: 3500
          // })
          // toast.present();
        })
        .catch((err) =>{
          console.error(err);
        })
      });
  }

  async register(user: User){
    console.log(user.email + ' ----- ' + user.password);
    try{
        await this.angularFauth.auth.createUserWithEmailAndPassword(user.email, user.password).then((result)=>{
        this.sendEmailVerification();
      }).catch((error)=>{
        console.error(error);
        console.log(error.code)
        if (error.code == 'auth/weak-password'){
          this.msgToast = "La contrasena debe tener minimo 6 caracteres!";
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
      })
      // console.log(result);
    }
    catch(e){
      console.error(e);
    }
  }
}
