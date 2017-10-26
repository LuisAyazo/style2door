import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemInformationPage } from './item-information';

@NgModule({
  declarations: [
    ItemInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemInformationPage),
  ],
})
export class ItemInformationPageModule {}
