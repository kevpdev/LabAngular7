import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'guyartisan';

  constructor(){

    const firebaseConfig = {
      apiKey: 'AIzaSyDJi7D2BtoJD0BYrO2VjEC1Q4KJvjfvtlY',
      authDomain: 'guyartisan-11b3a.firebaseapp.com',
      projectId: 'guyartisan-11b3a',
      storageBucket: 'guyartisan-11b3a.appspot.com',
      messagingSenderId: '10581518359',
      appId: '1:105816518359:web:d1b898db06ee7df5ebca92'
    };
   // firebase.initializeApp(firebaseConfig);
  }
}

