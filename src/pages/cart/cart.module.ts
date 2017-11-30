import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';
import { PipesModule } from '../../pipes/urlrplace/pipes.module';

@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPage),
    PipesModule
  ],
  exports: [
    CartPage,
    // PipesModule
  ]

})
export class CartPageModule {}
