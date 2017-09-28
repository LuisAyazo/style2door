import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WomanPage } from './woman';
import {  PipesModule } from '../../pipes/changespace/pipes.module';

@NgModule({
  declarations: [
    WomanPage,
  ],
  imports: [
    IonicPageModule.forChild(WomanPage),
    PipesModule,  
  ],
  exports: [
    WomanPage
  ]
})
export class WomanPageModule {}
