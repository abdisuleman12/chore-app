import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    console.log('login clicked')
  }

}
