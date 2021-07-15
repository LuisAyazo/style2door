import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WomanPage } from './woman';
import {  PipesModule } from '../../pipes/changespace/pipes.module';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

@NgModule({
  declarations: [
    WomanPage,
    // ElasticHeaderModule
  ],
  imports: [
    IonicPageModule.forChild(WomanPage),
    PipesModule,
    ElasticHeaderModule
  ],
  exports: [
    WomanPage,
    ElasticHeaderModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WomanPageModule {}
