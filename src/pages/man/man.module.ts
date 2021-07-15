import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManPage } from './man';
import {  PipesModule } from '../../pipes/changespace/pipes.module';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

@NgModule({
  declarations: [
    ManPage,
    // ElasticHeaderModule
  ],
  imports: [
    IonicPageModule.forChild(ManPage),
    PipesModule,
    ElasticHeaderModule
  ],
  exports: [
    ManPage,
    ElasticHeaderModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ManPageModule {}
