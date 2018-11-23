import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import firebase from 'firebase';
import { ChoresPage } from '../chores/chores';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name: string = "";
  email: string = "";
  password: string = ""

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
    ) {
  }

  signUp() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then((data) => {  
      
      //assigning firebase user interface to new user    
      let newUser: firebase.User = data.user

      newUser.updateProfile({
        displayName: this.name,
        photoURL: ""
      }).then(() => {
        console.log("Profile Updated")

        this.alertCtrl.create({
          title: "Account Created!",
          message: "Your account was created successfully",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                this.navCtrl.setRoot(ChoresPage)
              }
            }
          ],
          cssClass: 'alertBox'
         }).present();
      
      }).catch((err) => {
        console.log(err)
      })

    }).catch((err) => {
      console.log(err)

      this.toastCtrl.create({
        message: err.message,
        duration: 3000
      }).present()
    })
  };

  goBack() {
    this.navCtrl.pop()
  }

}
