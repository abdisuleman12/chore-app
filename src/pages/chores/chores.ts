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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl : AlertController,
    public toastCtrl: ToastController
    ) {
  }

  postChore() {

    if(this.chore === "") {
      this.alertCtrl.create({
        title: "Must Insert Chore",
        buttons: ['Dismiss']
      }).present();
    } else {
      firebase.firestore().collection("chores").add({
        text: this.chore,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        owner: firebase.auth().currentUser.uid,
        owner_name: firebase.auth().currentUser.displayName
      }).then((doc) => {
        console.log('chore added', doc);
        
      })
    }
    
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
            role: 'cancel',
            handler: () => {
            
            }
          }
        ]
      }).present();
  }

}
