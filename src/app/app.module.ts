import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";


// providers
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';

// import { NativeStorage } from '@ionic-native/native-storage';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

// Pipes
import { PipesModule } from '../pipes/changespace/pipes.module';

// Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Map y Geolocalizacion
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

// push notifications
import { OneSignal } from '@ionic-native/onesignal';

// Firebase
// import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FIREBASE_CONFIG } from './app.firebase.config';
// import { FCM } from '@ionic-native/fcm'; // notification  push

// Activar modo produccion
enableProdMode();
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ElasticHeaderModule
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
    SocialSharing,
    AuthServiceProvider,
    NotificationsProvider,
    Geolocation,
    GoogleMaps,
    OneSignal
  ]
})
export class AppModule {}
