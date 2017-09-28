import { Component, ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
  animations: [
    trigger('bounce', [
          state('*', style({ transform: 'translateX(0)'})),
          //            style({transform: 'translateY(-65px)',  offset: 0.3}) ),
          // transition('* => state', animate('700ms ease-out', keyframes([
          //   style({transform: 'translateX(-1500)', offset: 0}),
          //   style({transform: 'translateY(-65px)',  offset: 0.3}),
          //   style({transform: 'translateX(0)',     offset: 1.0})
          // ]))),
          transition('* => rightSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(-65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ]))),
          transition('* => leftSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ])))
      ])
    ]
})
export class OnboardingPage {
  @ViewChild(Slides) slides: Slides;

  onboadrBtnMsg: string = "Omitir";
  state: string = 'x';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  go_login(){
    this.navCtrl.setRoot('LoginPage');
  }

  slideChanged(){
    if(this.slides.isEnd()){
      this.onboadrBtnMsg = "¡Listo!"
    }
  }



slideMoved() {
  if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
    this.state = 'rightSwipe';
  else
    this.state = 'leftSwipe';
}

animationDone() {
  this.state = 'x';
}

}
