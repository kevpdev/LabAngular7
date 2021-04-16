import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Console } from 'console';
import { Subject } from 'rxjs';
import { Business } from 'src/app/shared/models/business';
import { Comment } from 'src/app/shared/models/comment';
import { Critere } from 'src/app/shared/models/critere';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  businessesResultSearch: Business[] = [];
  businessesSubject = new Subject<Business[]>();
  constructor(private db: AngularFirestore) { }
  users = this.db.collection('users').ref;
  business: Business;
  businessSubject = new Subject<Business>();
  cumulRating = 0;

  getBusinessByCritere(critere: Critere){
    this.reset();

   let cityArray = critere.city.split(" ");

   console.log(cityArray);

   return this.users.get()
   .then(querySnapshot => {
    querySnapshot.forEach(docUser => {

      let sectorQuery = docUser.ref.collection('businesses').where("sector", "==", critere.sector);
      let jobQuery = sectorQuery;     

      if(critere.job){
        jobQuery = sectorQuery.where("job", "==", critere.job);
      }
      let cityQuery = jobQuery.where("adress.zipCode", "==", cityArray[0]).where("adress.city", "==", cityArray[1]);

      cityQuery.onSnapshot(querySnapshot2=>{
        querySnapshot2.forEach(docBusiness => {

        //get fields Business
        let businessData =  docBusiness.data() as Business;

        // get collections
        docBusiness.ref.collection('comments').get()
        .then(querySnapshot =>{
            if(!businessData.comments){
              businessData.comments = [];
            }

            querySnapshot.forEach(docComment =>{
              businessData.comments.push(docComment.data() as Comment);
            });
        });
        
        this.businessesResultSearch.push(businessData);
        console.log(this.businessesResultSearch);
        });
      });
    });

    this.emitBusinessByCritere();

   })
   .catch(error => {
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
      querySnapshot.forEach(docUsers =>{
        docUsers.ref.collection('businesses').doc(index).get()
        .then(docBusiness => {
          console.log(docBusiness.data());
          if(docBusiness.exists){
            
            // get fieds
            this.business = docBusiness.data() as Business;

            // get collections
            docBusiness.ref.collection('comments').get()
            .then(querySnapshot =>{

                let commentArray = this.business.comments;
                if(!this.business.comments){
                  this.business.comments = [];
                }

                querySnapshot.forEach(docComment =>{
                  let commentData = docComment.data() as Comment;
                  this.cumulRating +=  commentData.rate;
                  this.business.comments.push(commentData);
                });

                this.business.nbStar = this.cumulRating / this.business.comments.length;
                console.log(this.business.comments.length);
            });

            console.log(this.business);
            this.emitBusinessById();
          }
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
         });;
      });
    });
  }

  emitBusinessById(){
    console.log(this.business);
    this.businessSubject.next(this.business);
  }

  addCommenttoBusiness(comment: Comment, businessId: string ){
    this.users.get().then(querySnapShot => {
      querySnapShot.forEach(doc => {
        doc.ref.collection('businesses').doc(businessId).get()
        .then(doc => {
          doc.ref.collection('comments').doc(this.db.createId()).set(Object.assign({}, comment));
        })
      })
    })
  }
}
