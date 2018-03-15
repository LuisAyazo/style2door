import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManscheduledPage } from './manscheduled';

@NgModule({
  declarations: [
    ManscheduledPage,
  ],
  imports: [
    IonicPageModule.forChild(ManscheduledPage),
  ],
})
export class ManscheduledPageModule {}
