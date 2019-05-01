import { Component } from '@angular/core';
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDDaj_lWvGnq5w_T9Rr0lnR1_pfzpapUtg",
    authDomain: "masuperagence-aa02b.firebaseapp.com",
    databaseURL: "https://masuperagence-aa02b.firebaseio.com",
    projectId: "masuperagence-aa02b",
    storageBucket: "masuperagence-aa02b.appspot.com",
    messagingSenderId: "444751624003"
  };
  firebase.initializeApp(config);
  }

}
