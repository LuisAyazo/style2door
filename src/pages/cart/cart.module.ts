import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPage),
    ElasticHeaderModule
  ],
  exports: [
    CartPage,
    ElasticHeaderModule
  ]

})
export class CartPageModule {}
