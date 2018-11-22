import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyA6hQw3WU3-pvtdREH0_5zjdRYyoYDCMko",
  authDomain: "oru-app.firebaseapp.com",
  databaseURL: "https://oru-app.firebaseio.com",
  projectId: "oru-app",
  storageBucket: "oru-app.appspot.com",
  messagingSenderId: "347846906532"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
