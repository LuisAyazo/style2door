import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnboardingPage } from './onboarding';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    OnboardingPage,
  ],
  imports: [
    IonicPageModule.forChild(OnboardingPage),
    // BrowserAnimationsModule
  ],
  exports: [
    OnboardingPage
  ]
})
export class OnboardingPageModule {}
