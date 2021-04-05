import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { Critere } from 'src/app/shared/models/critere';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  businessesResultSearch: Business[] = [];
  businessesSubject = new Subject<Business[]>();
  constructor(private db: AngularFirestore) { }

  getBusinessByCritere(critere: Critere){
   let cityArray = critere.city.split(" ");
   console.log(cityArray);
   const users = this.db.collection('users').ref;
    users.get()
   .then(function(querySnapshot) {
     console.log(this);
    querySnapshot.forEach(function(doc) {
      let sectorQuery = doc.ref.collection('businesses').where("sector", "==", critere.sector);
      let jobQuery = sectorQuery;     
      if(critere.job){
        jobQuery = sectorQuery.where("job", "==", critere.job);
      }
      let cityQuery = jobQuery.where("adress.zipCode", "==", cityArray[0]).where("adress.city", "==", cityArray[1]);
      cityQuery.onSnapshot(querySnapshot2=>{
        querySnapshot2.forEach((doc)=> {
        console.log(doc.id, " => ", doc.data());
        console.log(this);
        this.businessesResultSearch.push(doc.data());
        });
      });
    }.bind(this));
   }.bind(this))
   .catch(function(error) {
     console.log("Error getting documents: ", error);
    });
    
  }

  emitBusinessByCritere(){
    this.businessesSubject.next(this.businessesResultSearch);
  }
}
