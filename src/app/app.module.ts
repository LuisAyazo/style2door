import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";


// providers
import { DatePicker } from '@ionic-native/date-picker'; //ionic
import { DatePickerModule } from 'ion-datepicker';
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';

// import { NativeStorage } from '@ionic-native/native-storage';
import { NotificationsProvider } from '../providers/notifications/notifications';
// import { AuthServiceProvider } from '../providers/auth-service/auth-service';

// Pipes
import { PipesModule } from '../pipes/urlrplace/pipes.module';

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
import { PayProvider } from '../providers/pay/pay';
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
    HttpClientModule,
    PipesModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ElasticHeaderModule,
    DatePickerModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    // SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    DatePicker,
    SocialSharing,
    // AuthServiceProvider,
    NotificationsProvider,
    Geolocation,
    GoogleMaps,
    OneSignal,
    PayProvider,

  ]
})
export class AppModule {}
