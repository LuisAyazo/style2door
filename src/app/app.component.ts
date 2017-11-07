import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AngularFireAuth } from 'angularfire2/auth';
import { OneSignal } from '@ionic-native/onesignal';

// import { FCM } from '@ionic-native/fcm';
//
// declare var FCMPlugin;

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
    private angularFauth:AngularFireAuth,
    private socialSharing: SocialSharing,
    private oneSignal: OneSignal

  ) {

    // this.rootPage = 'TabsHomePage';


    if(window.localStorage.getItem('onboarding_init')){
        // this.rootPage = 'LoginPage';
        this.angularFauth.authState.subscribe( data => {
              // alert("PASAS por a  u QUII");
              // console.log(JSON.stringify(data));
              if (data){
                  // console.log(JSON.stringify(data));
                  // alert(JSON.stringify(data.providerData[0].providerId));
                  if ( data.providerData[0].providerId == "password" ){
                      // console.log(JSON.stringify("ESTOY EN EL IF"));
                      if(data && data.email && data.uid){
                        // console.log("PASO APP.COMPONENT.TS" +  JSON.stringify(data));
                        this.rootPage = 'TabsHomePage';
                      }
                  }
                  if ( data.providerData[0].providerId == "facebook.com" ){
                      // alert("ES DE FACE ==== "+JSON.stringify(data));
                      this.rootPage = 'TabsHomePage';
                  }
              }
              else{
                this.rootPage = 'LoginPage';
              }
        })
    }else{
        this.rootPage = 'OnboardingPage';
    }

    // this.rootPage = 'ScheduleServicePage';
    // this.menu.swipeEnable(false);// deshabilita el sidemenu

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

      // { title: 'Informacion y Soporte', component: 'InformacionSoportePage', description: 'Paquetes para novios', icon: 'information-circle' },
      // { title: 'Paquetes para novias', component: 'QuejasReclamosPage', description: 'Paquetes para novias', icon: 'sad' },
      { title: 'Informacion y Soporte', component: 'InformacionSoportePage', description: 'Informacion y soporte', icon: 'information-circle' },
      { title: 'Quejas y reclamos', component: 'QuejasReclamosPage', description: 'Quejas y Reclamos', icon: 'sad' }
      // { title: 'Jenkins', component: 'HomePage', description: 'Compartir', icon: 'flash' }
    ];

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
            // FCMPlugin.getToken(
            //     (pushRegistrationId: any) => {
            //         console.log('Push registration ID: ');
            //         console.log(pushRegistrationId);
            //     },
            //     (err: any) => {
            //         console.log('error retrieving push registration id: ' + err);
            //     }
            // );

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      // this.statusBar.overlaysWebView(false);
      // this.statusBar.styleBlackTranslucent();
      // this.statusBar.backgroundColorByName('black'); supported colors -> black, darkGray, lightGray, white, gray, red, green, blue, cyan, yellow, magenta, orange, purple, brown
      this.statusBar.backgroundColorByHexString("#9a056d");
      // this.splashScreen.hide();
      // setTimeout(() => {
        this.splashScreen.hide();
        // 
        // var notificationOpenedCallback = function(jsonData) {
        //     console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        // };
        //
        // window["plugins"].OneSignal
        //     .startInit("c75fdaed-3229-4527-990d-d574eaba27ce", "732832336253")
        //     .handleNotificationOpened(notificationOpenedCallback)
        //     .endInit();
        // });

        this.oneSignal.startInit('c75fdaed-3229-4527-990d-d574eaba27ce', '732832336253');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
         // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });

        this.oneSignal.endInit();

      // }, 100);

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
    this.nav.push('PerfilPage');
    this.menu.close();//(false);// Quitar automaticamente el sidemenu
  }

  //share with Facebook
  facebookSharing(){
    let message = 'Style2door - Estilo a tu puerta';
    let image = 'https://scontent-mia3-1.xx.fbcdn.net/v/t31.0-8/23213489_184705552094311_776544078734079414_o.jpg?oh=5c80861cbac59d358b03e85634aa6b90&oe=5A6C5C28';
    let url = 'https://www.facebook.com/Style2door-184705328761000/?modal=admin_todo_tour';
    let pasteMessageHint ='Style2door - App para lucir bien :D';
    this.socialSharing.shareViaFacebookWithPasteMessageHint(message, image, url, pasteMessageHint).then(() => {
      // Sharing via email is possible
      // alert('creo q comparte');
    }).catch((e) => {
      // alert('error '+ e);
      // Sharing via email is not possible
    });
  }

  whatsappSharing(){
    let message = 'Style2door - Estilo a tu puerta';
    let image = 'https://scontent-mia3-1.xx.fbcdn.net/v/t31.0-8/23213489_184705552094311_776544078734079414_o.jpg?oh=5c80861cbac59d358b03e85634aa6b90&oe=5A6C5C28';
    let url = 'https://www.facebook.com/Style2door-184705328761000/?modal=admin_todo_tour';
    let pasteMessageHint ='Style2door - App para lucir bien :D';
    this.socialSharing.shareViaWhatsApp(message, image, url).then(() => {
      // Sharing via email is possible
      // alert('creo q comparte');
    }).catch((e) => {
      // alert('error '+ e);
      // Sharing via email is not possible
    });
  }


  InstagramSharing(){
    let message = 'Style2door - Estilo a tu puerta';
    let image = 'https://scontent-mia3-1.xx.fbcdn.net/v/t31.0-8/23213489_184705552094311_776544078734079414_o.jpg?oh=5c80861cbac59d358b03e85634aa6b90&oe=5A6C5C28';
    let url = 'https://www.facebook.com/Style2door-184705328761000/?modal=admin_todo_tour';
    let pasteMessageHint ='Style2door - App para lucir bien :D';
    this.socialSharing.shareViaInstagram(message, image).then(() => {
      // Sharing via email is possible
      // alert('creo q comparte');
    }).catch((e) => {
      // alert('error '+ e);
      // Sharing via email is not possible
    });
  }


  logout(){
    // console.log("Saliendo de la app");
    this.angularFauth.auth.signOut().then( result => {
      this.menu.close();//(false);// Quitar automaticamente el sidemenu
      this.nav.setRoot("LoginPage");
      // Sign-out successful.
      // console.log(result)
    }).catch((error) => {
      // console.log(error);
      // console.error(error);
      alert(error)
      // An error happened.
    });;
  }

}
