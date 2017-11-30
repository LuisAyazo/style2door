import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-schedule-service',
  templateUrl: 'schedule-service.html',
})
export class ScheduleServicePage {
  // @ViewChild(Slides) slides: Slides;

  programacion: number =1;
  transp: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private elRef:ElementRef) {
    // this.programacion = 1;


  }

  removeTransp(): void{
    this.transp = this.elRef.nativeElement.querySelector('.transp');
    this.transp.setAttribute("style"," position: none !important; \
                            left:0 !important; \
                            top:0 !important; \
                            background: none \
                            width:100% !important; \
                            z-index: 0 !important; \
                            height:100% !important;");

  }

  ionViewWillEnter() {
    this.removeTransp();
  }

  createservice(){
    this.navCtrl.push('CreateServicesPage');
  }
  
  fabActive(fab: FabContainer){
      this.transp = this.elRef.nativeElement.querySelector('.transp');
      if(fab._listsActive == false){
        console.log('colocar fondo');
        this.transp.setAttribute("style"," position: absolute !important; \
                                left:0 !important; \
                                top:0 !important; \
                                background:rgba(0, 0, 0, 0.84) !important; \
                                width:100% !important; \
                                z-index: 100 !important; \
                                height:100% !important;");
      }
      else{
        this.removeTransp();
      }
  }

  share(socialNet: string, fab: FabContainer) {
    fab.close();
    console.log("Sharing in", socialNet);
    this.navCtrl.push(socialNet);
  }
}
