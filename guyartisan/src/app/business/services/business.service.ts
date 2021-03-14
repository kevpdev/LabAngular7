import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray, Subject } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { BusinessModule } from '../business.module';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  usersCollection =  this.db.collection('users');

  currentUid =  firebase.auth().currentUser.uid;

  constructor(private db: AngularFirestore) { }

  getBusinesses(){
    console.log(this.currentUid)
    return this.usersCollection.doc(this.currentUid).collection('businesses').snapshotChanges();
  }


  createBusiness(business: Business){

    business.id =  this.db.createId();
    return  this.usersCollection.doc(this.currentUid).collection('businesses').doc(business.id).set(Object.assign({}, business));

  }

  updateBusiness(business: Business){
    console.log(business.id);
    return  this.usersCollection.doc(this.currentUid).collection('businesses').doc(business.id).update(Object.assign({}, business));

  }

  deleteBusiness(business: Business){
    return this.usersCollection.doc(this.currentUid).collection('businesses').doc(business.id).delete();
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const uuid = Date.now().toString() + uuidv4();
        const fileName = uuid + file.name;
        const upload = firebase.storage().ref().child('images/business/logo' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement...');
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downLoadUrl) => {
                resolve(downLoadUrl);
              }
            );
          });
      }
    );
  }

  removeFile(fileLink: string){
    return new Promise(
      (resolve, reject) => {
        if (fileLink){
          const storageRef = firebase.storage().refFromURL(fileLink);
          storageRef.delete().then(
            (succes) => {
              console.log('File deleted');
              resolve(succes);
            },
            (error) => {
              console.log(error);
              reject(error);
            }
          );
        }
      }
    );

  }

}
