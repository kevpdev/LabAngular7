import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray, Subject } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { BusinessModule } from '../business.module';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  usersCollection =  this.db.collection('users');

  currentUid =  firebase.auth().currentUser.uid;

  constructor(private db: AngularFirestore) { }

  getBusinesses(){
    return this.usersCollection.doc(this.currentUid).collection('businesses').snapshotChanges();
  }


  createBusiness(business: Business){

    const newUserId = this.db.createId();

    return  this.usersCollection.doc(this.currentUid).collection('businesses').doc(newUserId).set(Object.assign({}, business));

  }

  updateBusiness(business: Business){
    console.log(business.id);
    return  this.usersCollection.doc(this.currentUid).collection('businesses').doc(business.id).update(Object.assign({}, business));

  }

  deleteBusiness(business: Business){
    return this.usersCollection.doc(this.currentUid).collection('businesses').doc(business.id).delete();
  }

}
