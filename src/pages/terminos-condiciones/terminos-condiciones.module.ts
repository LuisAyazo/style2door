import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminosCondicionesPage } from './terminos-condiciones';

@NgModule({
  declarations: [
    TerminosCondicionesPage,
  ],
  imports: [
    IonicPageModule.forChild(TerminosCondicionesPage),
  ],
  exports: [
    TerminosCondicionesPage
  ]
})
export class TerminosCondicionesPageModule {}
