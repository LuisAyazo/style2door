import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen';


@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidEnter() {

    // this.splashScreen.hide();

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 2000);

  }

}
