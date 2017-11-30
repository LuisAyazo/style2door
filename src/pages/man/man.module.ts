import { NgModule } from '@angular/core';
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
  ]
})
export class ManPageModule {}
