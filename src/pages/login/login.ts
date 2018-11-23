import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import firebase from 'firebase';

import { SignupPage } from '../signup/signup';
import { ChoresPage } from '../chores/chores';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = ""
  password: string = ""

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController
    ) {

  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then((user) => {
      console.log(user.user)
      this.toastCtrl.create({
        message: "Welcome " + user.user.displayName + "!",
        duration: 3000
      }).present();

      this.navCtrl.setRoot(ChoresPage)

    }).catch((err) => {

      this.toastCtrl.create({
        message: err.message,
        duration: 3000
      }).present();
    })
  }

  gotoSignUp(){
    this.navCtrl.push(SignupPage)
  }

}
