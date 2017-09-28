import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaquillajePage } from './maquillaje';
import { PipesModule } from '../../pipes/changespace/pipes.module';

@NgModule({
  declarations: [
    MaquillajePage,
  ],
  imports: [
    IonicPageModule.forChild(MaquillajePage),
    PipesModule,
  ],
  exports: [
    MaquillajePage
  ]
})
export class MaquillajePageModule {}
