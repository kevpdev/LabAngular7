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
    this.reset();
    console.log(this.businessesResultSearch);
   let cityArray = critere.city.split(" ");
   console.log(cityArray);
   const users = this.db.collection('users').ref;
   return users.get()
   .then(function(querySnapshot) {
     console.log(this);
    querySnapshot.forEach(function(doc) {
      let sectorQuery = doc.ref.collection('businesses').where("sector", "==", critere.sector);
      let jobQuery = sectorQuery;     
      if(critere.job){
        jobQuery = sectorQuery.where("job", "==", critere.job);
      }
      let cityQuery = jobQuery.where("adress.zipCode", "==", cityArray[0]).where("adress.city", "==", cityArray[1]);
     return cityQuery.onSnapshot(querySnapshot2=>{
        querySnapshot2.forEach((doc)=> {
        console.log(doc.id, " => ", doc.data());
        this.businessesResultSearch.push(doc.data());
        console.log(this.businessesResultSearch);
        });
      });
    }.bind(this));
    this.emitBusinessByCritere();
   }.bind(this))
   .catch(function(error) {
     console.log("Error getting documents: ", error);
    });
    
  }

  emitBusinessByCritere(){
    console.log(this.businessesResultSearch);
    this.businessesSubject.next(this.businessesResultSearch);
  }


  reset(){
    this.businessesResultSearch = [];
  }
}
