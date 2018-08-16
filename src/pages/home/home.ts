import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isUserLoggedIn: any = false;
  userData: any = {};
  email: any = '';
  password: any = '';

  constructor(public toastCtrl: ToastController) {
    firebase.auth().onAuthStateChanged( authData =>{
      if(authData != null){
        this.isUserLoggedIn = true;
        this.userData = authData;
        console.log(authData);
      } else{
        this.userData = {};
      }
    });
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( data =>{
      this.displayToast("Login Successfully");
    }).catch( err => this.displayToast(err))
  }

  register(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then( data =>{
      this.displayToast("Registered Successfully");
    }).catch( err => this.displayToast(err))
  }

  verifyEmail(){
    firebase.auth().currentUser.sendEmailVerification();
  }

  logout(){
    firebase.auth().signOut();
  }

  displayToast(message){
    this.toastCtrl.create({ message ,duration: 3000}).present();
  }
}
