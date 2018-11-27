import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import moment from 'moment';

import { LoginPage } from '../login/login';

import firebase from 'firebase';

@Component({
  selector: 'page-chores',
  templateUrl: 'chores.html',
})
export class ChoresPage {

  chore: string = "";
  chores: any[] = [];
  image: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl : AlertController,
    public toastCtrl: ToastController,
    ) {
      this.getChores();
  }

  addPhoto() {
    console.log('addPhoto Clicked')
  }

  ago(time) {
    let difference = moment(time).diff(moment())
    return moment.duration(difference).humanize();
  }

  deleteChore() {
    console.log('delete chore clicked');
    
  }

  getChores() {

   this.chores = [];

   let query = firebase.firestore().collection("chores").orderBy("created", "desc")

   query.get()
   .then((docs) => {

     docs.forEach((doc) => {
       console.log(doc.data(), 'each doc in for each')
       this.chores.push(doc)
     })
   })

  }

  postChore() {

    if(this.chore === "") {
      this.alertCtrl.create({
        title: "Error",
        cssClass: "alertBox",
        message: "Field must not be empty",
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

        this.toastCtrl.create({
          message: "Chore has been successfully added!",
          duration: 2000,
          position: 'top',
          cssClass: 'toastSuccess'
        }).present();

        this.chore = "";

        this.getChores()
        
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
