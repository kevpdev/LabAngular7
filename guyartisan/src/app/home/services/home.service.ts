import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Critere } from 'src/app/shared/models/critere';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private db: AngularFirestore) { }

  getBusinessByCritere(){
    // const shopSnapshot = this.db.collection('users').snapshotChanges();
    // shopSnapshot.subscribe(data => {
    //   console.log(data);
    // })
   // return this.db.collection('businesses').snapshotChanges();
   //return snapshot;

   const users = this.db.collection('users').ref;
   users.get()
   .then(function(querySnapshot) {
     console.log(querySnapshot.docs);
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, " => ", doc.data());
      doc.ref.collection('collectiontest').onSnapshot(querySnapshot2=>{
    querySnapshot2.forEach((doc)=> {
      console.log(doc.id, " => ", doc.data());
    })
      });
    });
   })
   .catch(function(error) {
     console.log("Error getting documents: ", error);
    });

  }
}
