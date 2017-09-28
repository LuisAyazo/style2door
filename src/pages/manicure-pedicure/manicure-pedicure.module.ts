import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManicurePedicurePage } from './manicure-pedicure';
import {  PipesModule } from '../../pipes/changespace/pipes.module';
@NgModule({
  declarations: [
    ManicurePedicurePage,

  ],
  imports: [
    IonicPageModule.forChild(ManicurePedicurePage),
    PipesModule,  
  ],
  exports: [
    ManicurePedicurePage
  ]
})
export class ManicurePedicurePageModule {}
