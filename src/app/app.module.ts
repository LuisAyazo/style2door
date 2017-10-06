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


// Firebase
// import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,HttpModule,
    PipesModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom',tabsHideOnSubPages: true, swipeBackEnabled: true}),
    BrowserAnimationsModule,
    // firebase.initializeApp,
    AngularFireModule.initializeApp(FIREBASE_CONFIG.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
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
    GoogleMaps,
    AngularFireDatabase

  ]
})
export class AppModule {}
