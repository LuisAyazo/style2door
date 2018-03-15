import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildPage } from './child';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

@NgModule({
  declarations: [
    ChildPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildPage),
    ElasticHeaderModule
  ],
  exports: [
    ChildPage,
    ElasticHeaderModule
  ]
})
export class ChildPageModule {}
