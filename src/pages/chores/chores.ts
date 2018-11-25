import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import firebase from 'firebase';

@Component({
  selector: 'page-chores',
  templateUrl: 'chores.html',
})
export class ChoresPage {

  chore: string = "";
  dateAdded: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl : AlertController,
    public toastCtrl: ToastController
    ) {
  }

  addChore() {

    this.alertCtrl.create({
      title: "Add Chore",
      message: "Add Details For Chore Below",
      cssClass: "alertBox",
      inputs: [
        {
          name: 'textForChore',
          type: 'text',
          placeholder: 'Insert Chore'
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          //cssClass: "cancelButton",
          handler: (data) => {
            console.log(data)
            this.dateAdded = ""
            this.chore = ""
          }
        },
        {
          text: "Ok",
          handler: (data) => {
            if(data) {
              this.chore = data.textForChore
            }
            
          }
        },
      ]
    }).present()

    firebase.firestore().collection("chores").add({

    })
    
  }

  logout() {


      this.alertCtrl.create({
        title: "Logout",
        cssClass: "alertBox",
        message: "Are you sure you want to logout?",
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              firebase.auth().signOut().then(() => {
                this.navCtrl.setRoot(LoginPage).then(() => {
                  this.toastCtrl.create({
                    message: "Logout Successful",
                    duration: 3000
                  }).present();
                })
              })
            }
          },
          {
            text: 'No',
            handler: () => {
            
            }
          }
        ]
      }).present();
  }

}
