import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

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
}
