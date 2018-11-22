import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { SignupPage } from '../signup/signup';

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
  
  }

  gotoSignUp(){
    this.navCtrl.push(SignupPage)
  }

}
