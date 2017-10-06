import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingDetailPage } from './shopping-detail';

@NgModule({
  declarations: [
    ShoppingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingDetailPage),
  ],
})
export class ShoppingDetailPageModule {}
