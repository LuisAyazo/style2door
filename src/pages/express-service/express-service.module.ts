import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpressServicePage } from './express-service';

@NgModule({
  declarations: [
    ExpressServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ExpressServicePage),
  ],
  exports: [
    ExpressServicePage
  ]
})
export class ExpressServicePageModule {}
