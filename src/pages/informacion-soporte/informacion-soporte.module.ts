import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformacionSoportePage } from './informacion-soporte';

@NgModule({
  declarations: [
    InformacionSoportePage,
  ],
  imports: [
    IonicPageModule.forChild(InformacionSoportePage),
  ],
  exports: [
    InformacionSoportePage
  ]
})
export class InformacionSoportePageModule {}
