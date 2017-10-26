import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-home',
  templateUrl: 'tabs-home.html',
})
export class TabsHomePage {
  home = 'HomePage';
  woman = 'WomanPage';
  man = 'ManPage';
  child = 'ChildPage';

  // 2 definiciones para el splash
  // splash: boolean = true;
  // tabBarElement: any;

  // @Output() notify: EventEmitter<  string> = new EventEmitter<string>();

  // onTab(tabName: string) {
  //   this.notify.emit(tabName);
  // }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.tabBarElement = document.querySelector('.tabbar');
  }

  // ionViewDidLoad(){
  //   // this.tabBarElement.style.display = 'none';
  //   setTimeout(()=>{
  //       this.splash = false;
  //       // this.tabBarElement.style.display = 'flex';
  //     }, 3000);
  // }

}
