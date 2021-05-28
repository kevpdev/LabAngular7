import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore: AngularFirestore) { }

  signUpUser(email: string, password: string): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (credential) => {
        this.firestore.collection('users').doc(credential.user.uid).collection('roles').add({
          name: 'employer'
        });
      }
    );
  }

  signinUser(email: string, password: string): Promise<any> {

    // return new Promise((resolve, reject) => {
    //   let error = new Error();
    //   error.code = '500';
    //   error.message = 'Le service est indisponible'
    //  reject(error);
    // })
    return firebase.auth().signInWithEmailAndPassword(email, password);

  }

  sendPasswordReset(email: string) {
    // return new Promise((resolve, reject) => {
    //   let error = new Error();
    //   error.code = '500';
    //   error.message = 'Le service est indisponible'
    //  reject(error);
    // })
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
