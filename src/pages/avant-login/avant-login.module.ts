import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvantLoginPage } from './avant-login';

@NgModule({
  declarations: [
    AvantLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(AvantLoginPage),
  ],
  exports: [
    AvantLoginPage
  ]
})
export class AvantLoginPageModule {}
