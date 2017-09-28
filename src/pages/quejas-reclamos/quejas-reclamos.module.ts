import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuejasReclamosPage } from './quejas-reclamos';

@NgModule({
  declarations: [
    QuejasReclamosPage,
  ],
  imports: [
    IonicPageModule.forChild(QuejasReclamosPage),
  ],
  exports: [
    QuejasReclamosPage
  ]
})
export class QuejasReclamosPageModule {}
