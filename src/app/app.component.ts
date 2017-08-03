import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  selector: 'menu-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  isLogged: boolean = false;
  activePage: any;


    pages: Array<{title: string, component: any, description: string, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public  menu: MenuController) {
    // this.menu = menu;
    this.menu.swipeEnable(false);// deshabilita el sidemenu

    if( this.isLogged === true){

      // this.usuario = this.auth.userName();
      this.rootPage = 'HomePage';
      console.log("Entrando al home");
    }else{
      this.rootPage = 'OnboardingPage';
    }

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', description: 'Chat', icon: 'home' },
      { title: 'WeblogicPage', component: 'HomePage', description: 'Llamar', icon: 'code-download' },
      { title: 'Database', component: 'HomePage', description: 'Noticias', icon: 'md-git-branch' },
      { title: 'Jenkins', component: 'HomePage', description: 'Compartir', icon: 'flash' },
      { title: 'Gitlab', component: 'HomePage', description: 'Quejas y sugerencia', icon: 'logo-facebook' },
      { title: 'Ajustes', component: 'HomePage', description: 'Juega y gana', icon: 'person' },
      { title: 'Jenkins', component: 'HomePage', description: 'Espejo', icon: 'flash' },
      { title: 'Gitlab', component: 'HomePage', description: 'Promociones', icon: 'more' },
      { title: 'Jenkins', component: 'HomePage', description: 'Spa', icon: 'flash' }

    ];

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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

  logout(){
    console.log("Saliendo de la app");
    // this.auth.logout();
    //this.rootPage = LoginPage;
    this.menu.close();//(false);// Quitar automaticamente el sidemenu
    this.nav.setRoot('LoginPage');
    this.menu.swipeEnable(false);// deshabilita el sidemenu
  }

}
