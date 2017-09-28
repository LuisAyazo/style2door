import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeinadosPage } from './peinados';
import {  PipesModule } from '../../pipes/changespace/pipes.module';

@NgModule({
  declarations: [
    PeinadosPage,
  ],
  imports: [
    IonicPageModule.forChild(PeinadosPage),
    PipesModule,
  ],
  exports: [
    PeinadosPage
  ]
})
export class PeinadosPageModule {}
