import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsHomePage } from './tabs-home';

@NgModule({
  declarations: [
    TabsHomePage,
  ],
  imports: [
    IonicPageModule.forChild(TabsHomePage),
  ],
  exports: [
    TabsHomePage
  ]
})
export class TabsHomePageModule {}
