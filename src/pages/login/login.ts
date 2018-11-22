import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = ""
  password: string = ""

  constructor(public navCtrl: NavController) {

  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
  }

}
