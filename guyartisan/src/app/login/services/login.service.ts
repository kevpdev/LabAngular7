import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { exception } from 'console';
import { rejects } from 'assert';



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
        console.log('connecté');
        // resolve();
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  signinUser(email: string, password: string): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(email, password).then(
      () => {
        console.log('connecté');
      }

    );
  }

  sendPasswordReset(email: string){
    // return new Promise((resolve, reject) => {
    //  reject("Le service de réiniialisation de mot de passe n'est pas disponible");
    // })
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
