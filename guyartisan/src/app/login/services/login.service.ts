import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore: AngularFirestore) { }

  SignUpUser(email: string, password: string): Promise<any> {

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

  SignInUser(email: string, password: string): Promise<any> {

       return firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            console.log('connecté');
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );

  }


}
