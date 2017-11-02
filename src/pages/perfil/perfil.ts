import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



//provider
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the PerfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  fbAll: any;
  profile: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth:AuthServiceProvider
  ) {
    // this.fbAll = this.auth.facebookProfileInfo();
    // this.profile = JSON.parse(this.fbAll);
    // console.log(this.profile.picture);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  profileSetting(){
    this.navCtrl.push("ProfileSettingsPage");
  }
  addPayMents(){
    this.navCtrl.push("AddPayMentsPage");
  }
historialPage(){
    this.navCtrl.push("HistorialPage");
  }

  promocionesPage(){
      this.navCtrl.push("PromocionesPage");
    }

    preferidosPage(){
        this.navCtrl.push("PreferidosPage");
      }
  centrodeAyudaPage(){
    this.navCtrl.push("CentroAyudaPage");

  }

  // this.auth.facebookProfileInfo().subscribe(
  //   data => {
  //       this.picture  = data.picture;
  //   }, err =>{
  //       console.log("Error al obtener el username" + err);
  //
  //   }, () => {
  //       console.log('getData completed - username');
  //
  //   });







}
