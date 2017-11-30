import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateServicesPage } from './create-services';

@NgModule({
  declarations: [
    CreateServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateServicesPage),
  ],
})
export class CreateServicesPageModule {}
