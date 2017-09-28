import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPayMentsPage } from './add-pay-ments';

@NgModule({
  declarations: [
    AddPayMentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPayMentsPage),
  ],
  exports: [
    AddPayMentsPage
  ]
})
export class AddPayMentsPageModule {}
