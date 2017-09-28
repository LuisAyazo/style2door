import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs-home',
  templateUrl: 'tabs-home.html',
})
export class TabsHomePage {
  home: any = 'HomePage';
  woman: any = 'WomanPage';
  man: any = 'ManPage';
  child: any = 'ChildPage';

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  onTab(tabName: string) {
    this.notify.emit(tabName);
  }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsHomePage');
  }

}
