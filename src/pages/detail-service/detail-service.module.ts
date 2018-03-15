import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailServicePage } from './detail-service';

@NgModule({
  declarations: [
    DetailServicePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailServicePage),
  ],
})
export class DetailServicePageModule {}
