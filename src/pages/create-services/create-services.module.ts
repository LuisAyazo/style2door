import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateServicesPage } from './create-services';
import { DatePickerModule  } from 'ion-datepicker';
// import { ElasticHeaderModule } from "ionic2-elastic-header/dist";
// import { DatePicker } from '@ionic-native/date-picker'; //ionic

@NgModule({
  declarations: [
    CreateServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateServicesPage),
    DatePickerModule,
    // ElasticHeaderModule
    // DatePicker,
  ],
  exports:[
    CreateServicesPage,
    DatePickerModule,
    // ElasticHeaderModule
    // DatePicker,
  ]
})
export class CreateServicesPageModule {}
