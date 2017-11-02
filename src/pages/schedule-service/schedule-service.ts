import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-schedule-service',
  templateUrl: 'schedule-service.html',
})
export class ScheduleServicePage {
  @ViewChild(Slides) slides: Slides;

  programacion: number =1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.programacion = 1;

  }

  // ionViewDidLoad(, fab: FabContainer) {
  //   // if(fab.close()){
  //   //   console.log("Probando si se cierra y emite algo");
  //   // }
  //   console.log('ionViewDidLoad ScheduleServicePage');
  // }

  share(socialNet: string, fab: FabContainer) {
    fab.close();

    console.log("Sharing in", socialNet);
    this.navCtrl.push(socialNet);

  }

}
