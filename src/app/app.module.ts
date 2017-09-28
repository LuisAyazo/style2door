import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// providers
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

// Pipes
import { PipesModule } from '../pipes/changespace/pipes.module';

// Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Map y Geolocalizacion
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,HttpModule,
    PipesModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom',tabsHideOnSubPages: true, swipeBackEnabled: true}),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    NativeStorage,
    AuthServiceProvider,
    Geolocation,
    GoogleMaps

  ]
})
export class AppModule {}
