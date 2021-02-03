import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { BusinessModule } from '../../business.module';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  businesses = [
    {
      id: 1,
      name: 'SARL GERAULD ERIC',
      siret: '500-855-762',
      phone1: '0240568457',
      email: 'contact@geraud-eric.com',
      website: 'Geraud-eric.fr',
      adress: {
        nameStreet: '5 rue Fleur de Lys',
        zipCode: '44400',
        city: 'Reze',
        pays: 'France'
      }
    }
  ];
  businessesSubject = new Subject<any[]>();

  constructor() { }

  emitBusinesses(){
    this.businessesSubject.next(this.businesses);
  }

  getBusiness(){
   // return this.businesses[0];
  //  return new Observable((observer) => {
  //   if(this.businesses && this.businesses.length > 0){
  //     observer.next(this.businesses);
  //     observer.complete();
  //   }else{
  //     const error = new Error('Businesses does not exist or is empty');
  //     observer.error(error);
  //   }
  //  });
  }
}
