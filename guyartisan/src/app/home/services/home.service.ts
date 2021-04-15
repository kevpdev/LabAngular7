import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { Critere } from 'src/app/shared/models/critere';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  businessesResultSearch: any[] = [];
  businessesSubject = new Subject<Business[]>();
  constructor(private db: AngularFirestore) { }
  users = this.db.collection('users').ref;
  business: any;
  businessSubject = new Subject<Business>();

  getBusinessByCritere(critere: Critere){
    this.reset();
    console.log(this.businessesResultSearch);
   let cityArray = critere.city.split(" ");
   console.log(cityArray);
   return this.users.get()
   .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      let sectorQuery = doc.ref.collection('businesses').where("sector", "==", critere.sector);
      let jobQuery = sectorQuery;     
      if(critere.job){
        jobQuery = sectorQuery.where("job", "==", critere.job);
      }
      let cityQuery = jobQuery.where("adress.zipCode", "==", cityArray[0]).where("adress.city", "==", cityArray[1]);
      cityQuery.onSnapshot(querySnapshot2=>{
        querySnapshot2.forEach(doc => {
       
        this.businessesResultSearch.push( doc.data());
        console.log(this.businessesResultSearch);
        });
      });
    });
    this.emitBusinessByCritere();
   })
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

  getBusinessById(index: string){
    console.log(index);
    return this.users.get().then(querySnapshot => {
      querySnapshot.forEach(doc =>{
        doc.ref.collection('businesses').doc(index).get()
        .then(doc => {
          console.log(doc.data());
          if(doc.exists){
            console.log('ici');
            this.business = doc.data();
            console.log(this.business);
            this.emitBusinessById();
          }
        });
      });
    });
  }

  emitBusinessById(){
    console.log(this.business);
    this.businessSubject.next(this.business);
  }
}
