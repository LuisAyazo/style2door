import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'menu-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  // isLogged: boolean = false;
  isLoggedIn: boolean = false;
  activePage: any;


    pages: Array<{title: string, component: any, description: string, icon: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public  menu: MenuController,
    public toastCtrl: ToastController,
    private fb: Facebook,
    private angularFauth:AngularFireAuth
  ) {

    // this.rootPage = 'TabsHomePage';

    if(window.localStorage.getItem('onboarding_init')){
        // this.rootPage = 'LoginPage';
        this.angularFauth.authState.subscribe( data => {
              // alert("PASAS por a  u QUII");
              if (data.uid){
                  console.log(JSON.stringify(data));
                  // alert(JSON.stringify(data.providerData[0].providerId));
                  if ( data.providerData[0].providerId == "password" ){
                      console.log(JSON.stringify("ESTOY EN EL IF"));
                      if(data && data.email && data.uid){
                        console.log("PASO APP.COMPONENT.TS" +  JSON.stringify(data));
                        this.rootPage = 'TabsHomePage';
                      }
                      else{
                        this.rootPage = 'LoginPage';
                      }
                  }

                  if ( data.providerData[0].providerId == "facebook.com" ){
                      // alert("ES DE FACE ==== "+JSON.stringify(data));
                      this.rootPage = 'TabsHomePage';
                  }
                  // else{
                  //   this.rootPage = 'TabsHomePage';
                  // }
              }

        })
    }else{
        this.rootPage = 'OnboardingPage';
    }



    // this.angularFauth.auth.currentUser.providerData.forEach( profile =>{


    //
    //   this.angularFauth.authState.subscribe(data =>{
    //   if(data && data.email && data.uid){
    //     // this.toastCtrl.create({
    //     //   message: `Bienvenidos a Style2Door, ${data.email}`,
    //     //   duration: 3000
    //     // }).present();
    //     console.log("PASO APP.COMPONENT.TS" +  JSON.stringify(data));
    //     this.rootPage = 'TabsHomePage';
    //   }
    //   else{
    //     // this.nav.setRoot('LoginPage');
    //     this.rootPage = 'LoginPage';
    //     // this.toastCtrl.create({
    //     //   message: `NO se ha logeado correctamente`,
    //     //   duration: 3000
    //     // }).present();
    //   }
    // })
  // })
    // this.menu = menu;
    this.menu.swipeEnable(false);// deshabilita el sidemenu

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'TabsHomePage', component: 'TabsHomePage', description: 'Style2Door', icon: 'ios-home' },
      { title: 'Home', component: 'HomePage', description: 'Chat', icon: 'chatboxes' },
      // { title: 'WeblogicPage', component: 'HomePage', description: 'Llamar', icon: 'code-download' },
      // { title: 'Database', component: 'HomePage', description: 'Noticias', icon: 'md-git-branch' },
      // { title: 'Gitlab', component: 'HomePage', description: 'Quejas y sugerencia', icon: 'logo-facebook' },
      // { title: 'Ajustes', component: 'HomePage', description: 'Juega y gana', icon: 'person' },
      // { title: 'Jenkins', component: 'HomePage', description: 'Espejo', icon: 'flash' },
      // { title: 'Gitlab', component: 'HomePage', description: 'Promociones', icon: 'more' },
      // { title: 'Jenkins', component: 'HomePage', description: 'Spa', icon: 'flash' },

      { title: 'Informacion y Soporte', component: 'InformacionSoportePage', description: 'Paquetes para novios', icon: 'information-circle' },
      { title: 'Paquetes para novias', component: 'QuejasReclamosPage', description: 'Paquetes para novias', icon: 'sad' },
      { title: 'Informacion y Soporte', component: 'InformacionSoportePage', description: 'Informacion y soporte', icon: 'information-circle' },
      { title: 'Quejas y reclamos', component: 'QuejasReclamosPage', description: 'Quejas y Reclamos', icon: 'sad' }
      // { title: 'Jenkins', component: 'HomePage', description: 'Compartir', icon: 'flash' }
    ];

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleBlackTranslucent();
      // this.statusBar.backgroundColorByName('black'); supported colors -> black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
      this.statusBar.backgroundColorByHexString("#9a056d");
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.activePage = page;
    this.nav.setRoot(page.component);
  }

  checkActive(page){
    return page == this.activePage;
  }

  perfilPage(){
    this.nav.setRoot("PerfilPage");
    this.menu.close();//(false);// Quitar automaticamente el sidemenu
  }

  // logout(){
  //   console.log("Saliendo de la app");
  //   // this.auth.logout();
  //   this.menu.close();//(false);// Quitar automaticamente el sidemenu
  //   this.fb.logout().then( res => this.isLoggedIn = false).catch(e => console.log('Error logout from Facebook', e));
  //   this.rootPage = "LoginPage";

  //   // this.nav.setRoot('LoginPage');
  //   // this.menu.swipeEnable(false);// deshabilita el sidemenu
  // }

  logout(){
    console.log("Saliendo de la app");
    this.angularFauth.auth.signOut().then( result => {
      this.menu.close();//(false);// Quitar automaticamente el sidemenu
      this.nav.setRoot("LoginPage");
      // Sign-out successful.
      console.log(result)
    }).catch((error) => {
      console.log(error);
      console.error(error);
      // An error happened.
    });;
  }

}
