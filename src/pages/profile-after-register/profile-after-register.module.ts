import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileAfterRegisterPage } from './profile-after-register';

@NgModule({
  declarations: [
    ProfileAfterRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileAfterRegisterPage),
  ],
})
export class ProfileAfterRegisterPageModule {}
